import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RubiksProcessCube3DProps {
  activeStep: number;
  scrollProgress: number;
  onStepAdvance?: () => void;
}

type Axis = 'x' | 'y' | 'z';

interface CubeMove {
  axis: Axis;
  layer: -1 | 0 | 1;
  dir: 1 | -1;
}

// 8 deterministic quarter-turn moves that scramble cleanly and unwind to SOLVED at Stage 04
const SCRAMBLE_MOVES: CubeMove[] = [
  { axis: 'y', layer: 1, dir: 1 },
  { axis: 'x', layer: 1, dir: -1 },
  { axis: 'z', layer: 1, dir: 1 },
  { axis: 'y', layer: -1, dir: -1 },
  { axis: 'x', layer: -1, dir: 1 },
  { axis: 'z', layer: -1, dir: -1 },
  { axis: 'y', layer: 0, dir: 1 },
  { axis: 'x', layer: 0, dir: -1 },
];

function detectSoftwareGl(renderer: THREE.WebGLRenderer): boolean {
  try {
    const gl = renderer.getContext();
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    if (!dbg) return false;
    const str = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '');
    return /SwiftShader|llvmpipe|mesa|softpipe|Software/i.test(str);
  } catch {
    return false;
  }
}

function smoothstep01(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

interface FaceSpec {
  bg: string;
  accent: string;
  ink: string;
  label: string;
  sublabel: string;
  motif: 'ripples' | 'lion' | 'diamond' | 'stripes' | 'grid' | 'ring';
}

const FACE_SPECS: Record<string, FaceSpec> = {
  pz: {
    bg: '#FFCD06',
    accent: '#30261D',
    ink: '#231B14',
    label: 'WE > ME',
    sublabel: 'THE PARTNERSHIP',
    motif: 'ripples',
  },
  px: {
    bg: '#FAF5E6',
    accent: '#1E7E45',
    ink: '#231B14',
    label: 'CULTURE',
    sublabel: 'SPOTIFY · INDAHASH',
    motif: 'diamond',
  },
  py: {
    bg: '#C93B2B',
    accent: '#FFCD06',
    ink: '#FAF5E6',
    label: 'IMAGINE',
    sublabel: 'AIRTEL AFRICA',
    motif: 'ring',
  },
  nx: {
    bg: '#B5840E',
    accent: '#FAF5E6',
    ink: '#FAF5E6',
    label: 'IDEAS',
    sublabel: 'PUBLICIS ALLIANCE',
    motif: 'stripes',
  },
  ny: {
    bg: '#382B1E',
    accent: '#FFCD06',
    ink: '#FFCD06',
    label: 'GO AHEAD',
    sublabel: 'KCB · TUSKER',
    motif: 'grid',
  },
  nz: {
    bg: '#E8A800',
    accent: '#231B14',
    ink: '#231B14',
    label: 'MULTIPLY',
    sublabel: '100M+ TTL REACH',
    motif: 'lion',
  },
};

function createFaceRetroTexture(spec: FaceSpec, maxAniso: number): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Matte vintage paper fill
  ctx.fillStyle = spec.bg;
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  // Graphic retro print motif
  ctx.save();
  if (spec.motif === 'ripples' || spec.motif === 'lion') {
    for (let r = 232; r >= 48; r -= 38) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = spec.accent;
      ctx.globalAlpha = 0.24;
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 4);
    ctx.strokeStyle = spec.accent;
    ctx.lineWidth = 6;
    ctx.strokeRect(-72, -72, 144, 144);
  } else if (spec.motif === 'diamond') {
    ctx.strokeStyle = spec.accent;
    ctx.lineWidth = 10;
    ctx.globalAlpha = 0.28;
    for (let s = 120; s <= 380; s += 85) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    }
  } else if (spec.motif === 'ring') {
    ctx.strokeStyle = spec.accent;
    ctx.lineWidth = 14;
    ctx.globalAlpha = 0.34;
    ctx.beginPath();
    ctx.arc(cx, cy, 165, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 98, 0, Math.PI * 2);
    ctx.stroke();
  } else if (spec.motif === 'stripes') {
    ctx.fillStyle = spec.accent;
    ctx.globalAlpha = 0.18;
    for (let i = -size; i < size * 2; i += 64) {
      ctx.save();
      ctx.translate(i, 0);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(0, -size, 24, size * 3);
      ctx.restore();
    }
  } else {
    ctx.strokeStyle = spec.accent;
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 4;
    for (let i = 0; i <= 3; i++) {
      const p = (i * size) / 3;
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(size, p);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Tactile retro halftone print grain across the paper surface
  ctx.save();
  ctx.fillStyle = spec.ink;
  ctx.globalAlpha = 0.045;
  for (let y = 6; y < size; y += 12) {
    for (let x = (y % 24 === 6 ? 6 : 12); x < size; x += 12) {
      ctx.fillRect(x, y, 2, 2);
    }
  }
  ctx.restore();

  // Cell inset stamp framing (3x3 tile rules)
  const cell = size / 3;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = col * cell;
      const y = row * cell;
      ctx.strokeStyle = spec.ink;
      ctx.globalAlpha = 0.42;
      ctx.lineWidth = 4.5;
      ctx.strokeRect(x + 8, y + 8, cell - 16, cell - 16);
    }
  }
  ctx.globalAlpha = 1;

  // Bold stamped face wordmark & subtitle
  ctx.fillStyle = spec.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 58px "Inter Tight", sans-serif';
  ctx.fillText(spec.label, cx, cy - 12);

  ctx.font = '700 22px "IBM Plex Mono", monospace';
  ctx.globalAlpha = 0.88;
  ctx.fillText(spec.sublabel, cx, cy + 40);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, maxAniso);
  tex.needsUpdate = true;
  return tex;
}

function createRoundedTileGeometry(w: number, h: number, depth: number): THREE.ExtrudeGeometry {
  const hw = w * 0.5;
  const hh = h * 0.5;
  const r = 0.075;
  const shape = new THREE.Shape();
  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
  shape.lineTo(hw, hh - r);
  shape.quadraticCurveTo(hw, hh, hw - r, hh);
  shape.lineTo(-hw + r, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  geo.center();
  return geo;
}

function makeSubTileGeometry(w: number, h: number, col: number, row: number): THREE.PlaneGeometry {
  const geo = new THREE.PlaneGeometry(w, h);
  const uv = geo.attributes.uv;
  const u0 = col / 3;
  const u1 = (col + 1) / 3;
  const v1 = 1 - row / 3;
  const v0 = 1 - (row + 1) / 3;
  uv.setXY(0, u0 + 0.005, v1 - 0.005);
  uv.setXY(1, u1 - 0.005, v1 - 0.005);
  uv.setXY(2, u0 + 0.005, v0 + 0.005);
  uv.setXY(3, u1 - 0.005, v0 + 0.005);
  uv.needsUpdate = true;
  return geo;
}

interface CubeletRecord {
  ix: -1 | 0 | 1;
  iy: -1 | 0 | 1;
  iz: -1 | 0 | 1;
  homePos: THREE.Vector3;
  mesh: THREE.Group;
}

export const RubiksProcessCube3D: React.FC<RubiksProcessCube3DProps> = ({
  activeStep,
  scrollProgress,
  onStepAdvance,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(activeStep);
  const progressRef = useRef(scrollProgress);
  const onStepAdvanceRef = useRef(onStepAdvance);

  stepRef.current = activeStep;
  progressRef.current = scrollProgress;
  onStepAdvanceRef.current = onStepAdvance;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = Math.max(host.clientWidth, 260);
    const height = Math.max(host.clientHeight, 260);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    const isSoftwareGl = detectSoftwareGl(renderer);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Linear/NoToneMapping keeps vintage print inks saturated & strictly non-glossy
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Explicitly NO RoomEnvironment / scene.environment -> ZERO reflections!

    const camera = new THREE.PerspectiveCamera(37, width / height, 0.1, 40);
    camera.position.set(0, 0.25, 7.45);
    camera.lookAt(0, 0, 0);

    // Pure diffuse 3-point warm retro studio light rig (no harsh specular bounce)
    const keyLight = new THREE.DirectionalLight('#FFF6DC', 1.35);
    keyLight.position.set(4.5, 6.2, 5.8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#FFCD06', 0.65);
    rimLight.position.set(-5.0, -3.0, -4.0);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight('#FAF5E6', '#3A2C1E', 1.05);
    scene.add(hemiLight);

    // 3-step discrete cel/toon gradient map for tactile retro comic/print 3D shading
    const toonBands = new Uint8Array([155, 210, 255]);
    const toonGradient = new THREE.DataTexture(toonBands, 3, 1, THREE.RedFormat);
    toonGradient.minFilter = THREE.NearestFilter;
    toonGradient.magFilter = THREE.NearestFilter;
    toonGradient.generateMipmaps = false;
    toonGradient.needsUpdate = true;

    const cubeRig = new THREE.Group();
    scene.add(cubeRig);

    // Tactile matte dashed / segmented blueprint orbital rings
    const haloRing1Geo = new THREE.TorusGeometry(2.85, 0.018, 10, 84);
    const haloRing2Geo = new THREE.TorusGeometry(3.32, 0.013, 10, 84);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#FFCD06',
      transparent: true,
      opacity: 0.28,
    });
    const haloRing1 = new THREE.Mesh(haloRing1Geo, haloMat);
    const haloRing2 = new THREE.Mesh(haloRing2Geo, haloMat);
    haloRing1.rotation.x = Math.PI * 0.38;
    haloRing2.rotation.x = -Math.PI * 0.32;
    scene.add(haloRing1, haloRing2);

    // Non-reflective matte Bakelite cubelet chassis & raised vintage backing tiles
    const coreMat = new THREE.MeshLambertMaterial({
      color: '#1D150F',
    });
    const bezelMat = new THREE.MeshLambertMaterial({
      color: '#2B2017',
    });
    const edgeWireMat = new THREE.LineBasicMaterial({
      color: '#6C5430',
      transparent: true,
      opacity: 0.65,
    });

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const faceTextures: Record<string, THREE.CanvasTexture> = {};
    const faceMaterials: Record<string, THREE.MeshToonMaterial> = {};
    Object.entries(FACE_SPECS).forEach(([key, spec]) => {
      const tex = createFaceRetroTexture(spec, maxAniso);
      faceTextures[key] = tex;
      faceMaterials[key] = new THREE.MeshToonMaterial({
        map: tex,
        gradientMap: toonGradient,
      });
    });

    const coreGeo = createRoundedTileGeometry(0.9, 0.9, 0.88);
    const coreEdgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.92, 0.92, 0.92));
    const plaqueGeo = createRoundedTileGeometry(0.84, 0.84, 0.025);
    const disposablesGeo: THREE.BufferGeometry[] = [
      coreGeo,
      coreEdgeGeo,
      plaqueGeo,
      haloRing1Geo,
      haloRing2Geo,
    ];

    const SPACING = 1.02;
    const PLAQUE_OFFSET = 0.456;
    const STICKER_OFFSET = 0.483;
    const STICKER_SIZE = 0.8;
    const cubelets: CubeletRecord[] = [];

    const addStickerSide = (
      cGroup: THREE.Group,
      mat: THREE.Material,
      col: number,
      row: number,
      pos: [number, number, number],
      plaquePos: [number, number, number],
      rot: [number, number, number]
    ) => {
      const plaque = new THREE.Mesh(plaqueGeo, bezelMat);
      plaque.position.set(plaquePos[0], plaquePos[1], plaquePos[2]);
      plaque.rotation.set(rot[0], rot[1], rot[2]);
      cGroup.add(plaque);

      const g = makeSubTileGeometry(STICKER_SIZE, STICKER_SIZE, col, row);
      disposablesGeo.push(g);
      const sticker = new THREE.Mesh(g, mat);
      sticker.position.set(pos[0], pos[1], pos[2]);
      sticker.rotation.set(rot[0], rot[1], rot[2]);
      cGroup.add(sticker);
    };

    const coords: (-1 | 0 | 1)[] = [-1, 0, 1];
    for (const ix of coords) {
      for (const iy of coords) {
        for (const iz of coords) {
          const cGroup = new THREE.Group();
          const core = new THREE.Mesh(coreGeo, coreMat);
          const edges = new THREE.LineSegments(coreEdgeGeo, edgeWireMat);
          cGroup.add(core, edges);

          if (iz === 1) {
            addStickerSide(
              cGroup,
              faceMaterials.pz,
              ix + 1,
              1 - iy,
              [0, 0, STICKER_OFFSET],
              [0, 0, PLAQUE_OFFSET],
              [0, 0, 0]
            );
          }
          if (iz === -1) {
            addStickerSide(
              cGroup,
              faceMaterials.nz,
              1 - ix,
              1 - iy,
              [0, 0, -STICKER_OFFSET],
              [0, 0, -PLAQUE_OFFSET],
              [0, Math.PI, 0]
            );
          }
          if (ix === 1) {
            addStickerSide(
              cGroup,
              faceMaterials.px,
              1 - iz,
              1 - iy,
              [STICKER_OFFSET, 0, 0],
              [PLAQUE_OFFSET, 0, 0],
              [0, Math.PI / 2, 0]
            );
          }
          if (ix === -1) {
            addStickerSide(
              cGroup,
              faceMaterials.nx,
              iz + 1,
              1 - iy,
              [-STICKER_OFFSET, 0, 0],
              [-PLAQUE_OFFSET, 0, 0],
              [0, -Math.PI / 2, 0]
            );
          }
          if (iy === 1) {
            addStickerSide(
              cGroup,
              faceMaterials.py,
              ix + 1,
              iz + 1,
              [0, STICKER_OFFSET, 0],
              [0, PLAQUE_OFFSET, 0],
              [-Math.PI / 2, 0, 0]
            );
          }
          if (iy === -1) {
            addStickerSide(
              cGroup,
              faceMaterials.ny,
              ix + 1,
              1 - iz,
              [0, -STICKER_OFFSET, 0],
              [0, -PLAQUE_OFFSET, 0],
              [Math.PI / 2, 0, 0]
            );
          }

          const homePos = new THREE.Vector3(ix * SPACING, iy * SPACING, iz * SPACING);
          cGroup.position.copy(homePos);
          cubeRig.add(cGroup);
          cubelets.push({ ix, iy, iz, homePos, mesh: cGroup });
        }
      }
    }

    const scratchAxisVec = new THREE.Vector3();
    const scratchQuat = new THREE.Quaternion();
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerSmooth = new THREE.Vector2(0, 0);

    let isDragging = false;
    let dragDistance = 0;
    let lastClientX = 0;
    let lastClientY = 0;
    let userOrbitYaw = 0;
    let userOrbitPitch = 0;
    let velYaw = 0;
    let velPitch = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragDistance = 0;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      renderer.domElement.style.cursor = 'grabbing';
      try {
        renderer.domElement.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isDragging) return;
      const dx = e.clientX - lastClientX;
      const dy = e.clientY - lastClientY;
      dragDistance += Math.hypot(dx, dy);

      const dYaw = dx * 0.011;
      const dPitch = dy * 0.009;
      userOrbitYaw += dYaw;
      userOrbitPitch = THREE.MathUtils.clamp(userOrbitPitch + dPitch, -1.1, 1.1);
      velYaw = dYaw * 12;
      velPitch = dPitch * 12;

      lastClientX = e.clientX;
      lastClientY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      if (dragDistance < 6 && onStepAdvanceRef.current) {
        onStepAdvanceRef.current();
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      if (!host) return;
      const w = Math.max(host.clientWidth, 260);
      const h = Math.max(host.clientHeight, 260);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(host);

    const applyCubeSolveRatio = (solveRatio: number) => {
      const total = SCRAMBLE_MOVES.length;
      const clamped = Math.max(0, Math.min(1, solveRatio));
      const remaining = (1 - clamped) * total;
      const fullMoves = Math.min(total, Math.floor(remaining));
      const partialFrac = fullMoves < total ? smoothstep01(remaining - fullMoves) : 0;

      for (let cIdx = 0; cIdx < cubelets.length; cIdx++) {
        const c = cubelets[cIdx];
        let gx: number = c.ix;
        let gy: number = c.iy;
        let gz: number = c.iz;

        c.mesh.position.copy(c.homePos);
        c.mesh.quaternion.identity();

        for (let mIdx = 0; mIdx < fullMoves; mIdx++) {
          const mv = SCRAMBLE_MOVES[mIdx];
          const inLayer =
            (mv.axis === 'x' && gx === mv.layer) ||
            (mv.axis === 'y' && gy === mv.layer) ||
            (mv.axis === 'z' && gz === mv.layer);

          if (inLayer) {
            const angle = mv.dir * (Math.PI / 2);
            scratchAxisVec.set(
              mv.axis === 'x' ? 1 : 0,
              mv.axis === 'y' ? 1 : 0,
              mv.axis === 'z' ? 1 : 0
            );
            scratchQuat.setFromAxisAngle(scratchAxisVec, angle);
            c.mesh.position.applyQuaternion(scratchQuat);
            c.mesh.quaternion.premultiply(scratchQuat);

            if (mv.axis === 'x') {
              const ny = mv.dir === 1 ? -gz : gz;
              const nz = mv.dir === 1 ? gy : -gy;
              gy = ny;
              gz = nz;
            } else if (mv.axis === 'y') {
              const nx = mv.dir === 1 ? gz : -gz;
              const nz = mv.dir === 1 ? -gx : gx;
              gx = nx;
              gz = nz;
            } else {
              const nx = mv.dir === 1 ? -gy : gy;
              const ny = mv.dir === 1 ? gx : -gx;
              gx = nx;
              gy = ny;
            }
          }
        }

        if (partialFrac > 0.0001 && fullMoves < total) {
          const mv = SCRAMBLE_MOVES[fullMoves];
          const inLayer =
            (mv.axis === 'x' && gx === mv.layer) ||
            (mv.axis === 'y' && gy === mv.layer) ||
            (mv.axis === 'z' && gz === mv.layer);
          if (inLayer) {
            const angle = mv.dir * (Math.PI / 2) * partialFrac;
            scratchAxisVec.set(
              mv.axis === 'x' ? 1 : 0,
              mv.axis === 'y' ? 1 : 0,
              mv.axis === 'z' ? 1 : 0
            );
            scratchQuat.setFromAxisAngle(scratchAxisVec, angle);
            c.mesh.position.applyQuaternion(scratchQuat);
            c.mesh.quaternion.premultiply(scratchQuat);
          }
        }
      }
    };

    let disposed = false;
    let rafId = 0;
    let lastNow = performance.now();
    let elapsed = 0;
    let currentSolveRatio = 0;

    applyCubeSolveRatio(0);

    const afterDraw = (cb: () => void) => {
      if (!isSoftwareGl) {
        rafId = requestAnimationFrame(cb);
        return;
      }
      const gl = renderer.getContext();
      gl.finish();
      rafId = requestAnimationFrame(() => setTimeout(cb, 80));
    };

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      elapsed += dt;

      const step = stepRef.current;
      const scrollSolve = Math.min(1, Math.max(0, progressRef.current / 0.82));
      const stepSolve = step / 3;
      const targetSolve = step === 3 ? 1 : Math.max(scrollSolve, stepSolve * 0.92);

      currentSolveRatio = THREE.MathUtils.damp(currentSolveRatio, targetSolve, 6.2, dt);
      if (targetSolve >= 0.999 && currentSolveRatio > 0.996) {
        currentSolveRatio = 1;
      }
      applyCubeSolveRatio(currentSolveRatio);

      if (!isDragging) {
        userOrbitYaw += velYaw * dt;
        userOrbitPitch = THREE.MathUtils.clamp(userOrbitPitch + velPitch * dt, -1.1, 1.1);
        velYaw *= Math.exp(-4.5 * dt);
        velPitch *= Math.exp(-4.5 * dt);
      }

      pointerSmooth.x = THREE.MathUtils.damp(pointerSmooth.x, pointerTarget.x, 5, dt);
      pointerSmooth.y = THREE.MathUtils.damp(pointerSmooth.y, pointerTarget.y, 5, dt);

      const solvedBias = smoothstep01((currentSolveRatio - 0.85) / 0.15);
      const targetRotY =
        (1 - solvedBias) * (0.65 + progressRef.current * Math.PI * 1.35 + elapsed * 0.16) +
        solvedBias * (Math.sin(elapsed * 0.45) * 0.24) +
        userOrbitYaw +
        pointerSmooth.x * 0.26;
      const targetRotX =
        (1 - solvedBias) * (0.48 + Math.sin(elapsed * 0.35) * 0.12) +
        solvedBias * (0.18 + Math.cos(elapsed * 0.35) * 0.06) +
        userOrbitPitch +
        pointerSmooth.y * 0.18;

      cubeRig.rotation.y = THREE.MathUtils.damp(cubeRig.rotation.y, targetRotY, 6, dt);
      cubeRig.rotation.x = THREE.MathUtils.damp(cubeRig.rotation.x, targetRotX, 6, dt);

      const scalePulse = 0.92 + solvedBias * 0.09;
      cubeRig.scale.set(scalePulse, scalePulse, scalePulse);

      haloRing1.rotation.z += dt * (0.25 + currentSolveRatio * 0.35);
      haloRing2.rotation.z -= dt * (0.18 + currentSolveRatio * 0.25);

      renderer.render(scene, camera);
      afterDraw(tick);
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerUp);

      disposablesGeo.forEach((g) => g.dispose());
      Object.values(faceTextures).forEach((t) => t.dispose());
      Object.values(faceMaterials).forEach((m) => m.dispose());
      toonGradient.dispose();
      coreMat.dispose();
      bezelMat.dispose();
      edgeWireMat.dispose();
      haloMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      aria-label="Interactive matte retro 3D Rubik's Cube — drag to rotate or click to step through stages"
    />
  );
};
