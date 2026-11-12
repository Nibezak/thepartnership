import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

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

// 8 deterministic quarter-turn moves that visibly scramble every face and unwind smoothly to SOLVED at Stage 04
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
    return /SwiftShader|llvmpipe|mesa|softpipe/i.test(str);
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
    ink: '#30261D',
    label: 'WE > ME',
    sublabel: 'THE PARTNERSHIP',
    motif: 'ripples',
  },
  px: {
    bg: '#FAF5E6',
    accent: '#1DB954',
    ink: '#30261D',
    label: 'CULTURE',
    sublabel: 'SPOTIFY · INDAHASH',
    motif: 'diamond',
  },
  py: {
    bg: '#D92323',
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
    bg: '#30261D',
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

function createFaceMasterTexture(spec: FaceSpec): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = spec.bg;
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  ctx.save();
  if (spec.motif === 'ripples' || spec.motif === 'lion') {
    for (let r = 230; r >= 45; r -= 38) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = spec.accent;
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 4);
    ctx.strokeStyle = spec.accent;
    ctx.lineWidth = 6;
    ctx.strokeRect(-72, -72, 144, 144);
    ctx.fillStyle = spec.accent;
    ctx.globalAlpha = 0.14;
    ctx.fillRect(-52, -52, 104, 104);
  } else if (spec.motif === 'diamond') {
    ctx.strokeStyle = spec.accent;
    ctx.lineWidth = 10;
    ctx.globalAlpha = 0.25;
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
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(cx, cy, 165, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 98, 0, Math.PI * 2);
    ctx.stroke();
  } else if (spec.motif === 'stripes') {
    ctx.fillStyle = spec.accent;
    ctx.globalAlpha = 0.16;
    for (let i = -size; i < size * 2; i += 64) {
      ctx.save();
      ctx.translate(i, 0);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(0, -size, 24, size * 3);
      ctx.restore();
    }
  } else {
    ctx.strokeStyle = spec.accent;
    ctx.globalAlpha = 0.25;
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

  const cell = size / 3;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = col * cell;
      const y = row * cell;
      ctx.strokeStyle = spec.ink;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 4;
      ctx.strokeRect(x + 8, y + 8, cell - 16, cell - 16);
    }
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = spec.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '800 58px "Inter Tight", sans-serif';
  ctx.fillText(spec.label, cx, cy - 12);

  ctx.font = '700 22px "IBM Plex Mono", monospace';
  ctx.globalAlpha = 0.85;
  ctx.fillText(spec.sublabel, cx, cy + 40);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeSubTileGeometry(w: number, h: number, col: number, row: number): THREE.PlaneGeometry {
  const geo = new THREE.PlaneGeometry(w, h);
  const uv = geo.attributes.uv;
  const u0 = col / 3;
  const u1 = (col + 1) / 3;
  const v1 = 1 - row / 3;
  const v0 = 1 - (row + 1) / 3;
  uv.setXY(0, u0 + 0.004, v1 - 0.004);
  uv.setXY(1, u1 - 0.004, v1 - 0.004);
  uv.setXY(2, u0 + 0.004, v0 + 0.004);
  uv.setXY(3, u1 - 0.004, v0 + 0.004);
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSoftwareGl ? 1 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 40);
    camera.position.set(0, 0.25, 7.0);
    camera.lookAt(0, 0, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();

    const keyLight = new THREE.DirectionalLight('#FFF3D1', 2.4);
    keyLight.position.set(4.5, 6.2, 5.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#FFCD06', 1.45);
    rimLight.position.set(-5.0, -3.5, -4.0);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight('#FAF5E6', '#1F1812', 0.9);
    scene.add(hemiLight);

    const cubeRig = new THREE.Group();
    scene.add(cubeRig);

    const haloRing1Geo = new THREE.TorusGeometry(2.85, 0.016, 12, 96);
    const haloRing2Geo = new THREE.TorusGeometry(3.35, 0.012, 12, 96);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#FFCD06',
      transparent: true,
      opacity: 0.24,
    });
    const haloRing1 = new THREE.Mesh(haloRing1Geo, haloMat);
    const haloRing2 = new THREE.Mesh(haloRing2Geo, haloMat);
    haloRing1.rotation.x = Math.PI * 0.38;
    haloRing2.rotation.x = -Math.PI * 0.32;
    scene.add(haloRing1, haloRing2);

    const coreMat = new THREE.MeshStandardMaterial({
      color: '#19130E',
      metalness: 0.25,
      roughness: 0.55,
    });
    const edgeWireMat = new THREE.LineBasicMaterial({
      color: '#5C4A2B',
      transparent: true,
      opacity: 0.45,
    });

    const faceTextures: Record<string, THREE.CanvasTexture> = {};
    const faceMaterials: Record<string, THREE.MeshStandardMaterial> = {};
    Object.entries(FACE_SPECS).forEach(([key, spec]) => {
      const tex = createFaceMasterTexture(spec);
      faceTextures[key] = tex;
      faceMaterials[key] = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.26,
        metalness: 0.08,
      });
    });

    const coreGeo = new THREE.BoxGeometry(0.92, 0.92, 0.92);
    const coreEdgeGeo = new THREE.EdgesGeometry(coreGeo);
    const disposablesGeo: THREE.BufferGeometry[] = [coreGeo, coreEdgeGeo, haloRing1Geo, haloRing2Geo];

    const SPACING = 1.02;
    const STICKER_OFFSET = 0.464;
    const STICKER_SIZE = 0.84;
    const cubelets: CubeletRecord[] = [];

    const coords: (-1 | 0 | 1)[] = [-1, 0, 1];
    for (const ix of coords) {
      for (const iy of coords) {
        for (const iz of coords) {
          const cGroup = new THREE.Group();
          const core = new THREE.Mesh(coreGeo, coreMat);
          const edges = new THREE.LineSegments(coreEdgeGeo, edgeWireMat);
          cGroup.add(core, edges);

          if (iz === 1) {
            const g = makeSubTileGeometry(STICKER_SIZE, STICKER_SIZE, ix + 1, 1 - iy);
            disposablesGeo.push(g);
            const m = new THREE.Mesh(g, faceMaterials.pz);
            m.position.z = STICKER_OFFSET;
            cGroup.add(m);
          }
          if (iz === -1) {
            const g = makeSubTileGeometry(STICKER_SIZE, STICKER_SIZE, 1 - ix, 1 - iy);
            disposablesGeo.push(g);
            const m = new THREE.Mesh(g, faceMaterials.nz);
            m.position.z = -STICKER_OFFSET;
            m.rotation.y = Math.PI;
            cGroup.add(m);
          }
          if (ix === 1) {
            const g = makeSubTileGeometry(STICKER_SIZE, STICKER_SIZE, 1 - iz, 1 - iy);
            disposablesGeo.push(g);
            const m = new THREE.Mesh(g, faceMaterials.px);
            m.position.x = STICKER_OFFSET;
            m.rotation.y = Math.PI / 2;
            cGroup.add(m);
          }
          if (ix === -1) {
            const g = makeSubTileGeometry(STICKER_SIZE, STICKER_SIZE, iz + 1, 1 - iy);
            disposablesGeo.push(g);
            const m = new THREE.Mesh(g, faceMaterials.nx);
            m.position.x = -STICKER_OFFSET;
            m.rotation.y = -Math.PI / 2;
            cGroup.add(m);
          }
          if (iy === 1) {
            const g = makeSubTileGeometry(STICKER_SIZE, STICKER_SIZE, ix + 1, iz + 1);
            disposablesGeo.push(g);
            const m = new THREE.Mesh(g, faceMaterials.py);
            m.position.y = STICKER_OFFSET;
            m.rotation.x = -Math.PI / 2;
            cGroup.add(m);
          }
          if (iy === -1) {
            const g = makeSubTileGeometry(STICKER_SIZE, STICKER_SIZE, ix + 1, 1 - iz);
            disposablesGeo.push(g);
            const m = new THREE.Mesh(g, faceMaterials.ny);
            m.position.y = -STICKER_OFFSET;
            m.rotation.x = Math.PI / 2;
            cGroup.add(m);
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

    // Direct user drag-to-orbit + tap/click-to-step interaction
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
        // ignore if unsupported
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
      // Clean tap / click (< 6px drag) directly advances/solves the cube step
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
      rafId = requestAnimationFrame(() => setTimeout(cb, 16));
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
      coreMat.dispose();
      edgeWireMat.dispose();
      haloMat.dispose();
      envTarget.dispose();
      pmrem.dispose();
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
      aria-label="Interactive 3D Rubik's Cube — drag to rotate or click to step through stages"
    />
  );
};
