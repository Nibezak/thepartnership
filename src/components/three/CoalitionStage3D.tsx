import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface MonolithCampaignItem {
  client: string;
  tag: string;
  metric: string;
  accentHex: string;
  headline: string;
}

interface CoalitionStage3DProps {
  items: MonolithCampaignItem[];
  activeIndex: number;
  onSelect?: (index: number) => void;
  scrollProgress?: number;
}

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

function createMonolithTexture(
  item: MonolithCampaignItem,
  index: number,
  maxAniso: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Background — Deep Espresso slate with crisp architectural framing
  ctx.fillStyle = '#231B14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Inner sharp square border
  ctx.strokeStyle = item.accentHex || '#FFCD06';
  ctx.lineWidth = 10;
  ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

  // Subtle architectural grid lines
  ctx.strokeStyle = 'rgba(255, 205, 6, 0.14)';
  ctx.lineWidth = 2;
  for (let y = 160; y < canvas.height - 60; y += 110) {
    ctx.beginPath();
    ctx.moveTo(48, y);
    ctx.lineTo(canvas.width - 48, y);
    ctx.stroke();
  }

  // Index & Client Tag block
  ctx.fillStyle = item.accentHex || '#FFCD06';
  ctx.fillRect(54, 60, 118, 52);
  ctx.fillStyle = '#231B14';
  ctx.font = '700 28px "IBM Plex Mono", monospace';
  ctx.fillText(`0${index + 1}`, 88, 96);

  ctx.fillStyle = '#FAF5E6';
  ctx.font = '600 24px "IBM Plex Mono", monospace';
  ctx.fillText(item.tag.toUpperCase(), 196, 95);

  // Big Hero Client Name
  ctx.fillStyle = '#FFCD06';
  ctx.font = '700 72px "Goudy Bookletter 1911", Georgia, serif';
  ctx.fillText(item.client, 54, 240);

  // Headline wrap
  ctx.fillStyle = '#FAF5E6';
  ctx.font = '500 36px "Inter Tight", sans-serif';
  const words = item.headline.split(' ');
  let line = '';
  let lineY = 330;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > 640) {
      ctx.fillText(line, 54, lineY);
      line = w;
      lineY += 48;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, 54, lineY);

  // Highlight Metric Band at Bottom
  ctx.fillStyle = '#FFCD06';
  ctx.fillRect(54, 720, canvas.width - 108, 220);

  ctx.fillStyle = '#30261D';
  ctx.font = '700 22px "IBM Plex Mono", monospace';
  ctx.fillText('COALITION OUTCOME', 84, 774);

  ctx.font = '700 78px "Goudy Bookletter 1911", Georgia, serif';
  ctx.fillText(item.metric, 84, 876);

  // Bottom signature rule
  ctx.fillStyle = '#30261D';
  ctx.font = '600 20px "IBM Plex Mono", monospace';
  ctx.fillText('THE PARTNERSHIP · POWERED BY PUBLICIS', 84, 920);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, maxAniso);
  tex.needsUpdate = true;
  return tex;
}

export const CoalitionStage3D: React.FC<CoalitionStage3DProps> = ({
  items,
  activeIndex,
  onSelect,
  scrollProgress = 0,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeIndex);
  const scrollRef = useRef(scrollProgress);
  const onSelectRef = useRef(onSelect);

  activeRef.current = activeIndex;
  scrollRef.current = scrollProgress;
  onSelectRef.current = onSelect;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = Math.max(host.clientWidth, 320);
    const height = Math.max(host.clientHeight, 320);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    const isSoftwareGl = detectSoftwareGl(renderer);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSoftwareGl ? 1 : 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#231B14');
    scene.fog = new THREE.Fog('#231B14', 9.5, 22);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 45);
    camera.position.set(0, 0.55, 8.6);
    camera.lookAt(0, 0, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();

    // Lighting — Warm Sun Gold Key + Cool Slate/Cream Hemisphere Fill
    const keyLight = new THREE.DirectionalLight('#FFF1C2', 2.4);
    keyLight.position.set(4.5, 6.5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#FFCD06', 1.4);
    rimLight.position.set(-5.5, 2.5, -4);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight('#FAF5E6', '#2B2016', 0.85);
    scene.add(hemiLight);

    // Materials (cached, properly disposed)
    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: '#FFCD06',
      metalness: 0.78,
      roughness: 0.24,
    });
    const bronzeMetalMat = new THREE.MeshStandardMaterial({
      color: '#866C1D',
      metalness: 0.65,
      roughness: 0.36,
    });
    const espressoChassisMat = new THREE.MeshStandardMaterial({
      color: '#30261D',
      metalness: 0.25,
      roughness: 0.58,
    });

    // Root Architecture Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Orbital calibration base assembly (multi-part pedestal & rings)
    const outerRingGeo = new THREE.TorusGeometry(3.45, 0.035, 16, 120);
    const outerRing = new THREE.Mesh(outerRingGeo, goldMetalMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = -2.15;
    stageGroup.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(2.55, 0.025, 12, 96);
    const innerRing = new THREE.Mesh(innerRingGeo, bronzeMetalMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = -2.15;
    stageGroup.add(innerRing);

    // Pedestal compass ticks
    const tickGeo = new THREE.BoxGeometry(0.05, 0.05, 0.32);
    const tickMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const tick = new THREE.Mesh(tickGeo, i % 4 === 0 ? goldMetalMat : bronzeMetalMat);
      tick.position.set(Math.cos(a) * 3.1, -2.15, Math.sin(a) * 3.1);
      tick.rotation.y = -a + Math.PI / 2;
      stageGroup.add(tick);
      tickMeshes.push(tick);
    }

    // Gyroscope tilted orbital band around entire display
    const gyroRingGeo = new THREE.TorusGeometry(4.15, 0.02, 12, 128);
    const gyroRing = new THREE.Mesh(gyroRingGeo, bronzeMetalMat);
    gyroRing.rotation.set(0.55, 0.2, 0.15);
    stageGroup.add(gyroRing);

    // Monolith Carousel Group
    const carouselGroup = new THREE.Group();
    stageGroup.add(carouselGroup);

    // Shared geometries for monoliths (6-part composite per campaign slab)
    const bodyGeo = new THREE.BoxGeometry(2.26, 3.04, 0.24);
    const frameHGeo = new THREE.BoxGeometry(2.38, 0.08, 0.3);
    const frameVGeo = new THREE.BoxGeometry(0.08, 3.14, 0.3);
    const pinGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.34, 16);
    const faceGeo = new THREE.PlaneGeometry(2.08, 2.86);

    const textures: THREE.CanvasTexture[] = [];
    const faceMats: THREE.MeshStandardMaterial[] = [];
    const clickTargets: THREE.Mesh[] = [];
    const monoliths: THREE.Group[] = [];

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const count = items.length;
    const radius = 2.95;

    items.forEach((item, idx) => {
      const cardGroup = new THREE.Group();

      // Main chassis slab
      const chassis = new THREE.Mesh(bodyGeo, espressoChassisMat);
      cardGroup.add(chassis);

      // Machined Sun Gold top/bottom & side perimeter bars
      const topBar = new THREE.Mesh(frameHGeo, goldMetalMat);
      topBar.position.y = 1.54;
      const bottomBar = new THREE.Mesh(frameHGeo, goldMetalMat);
      bottomBar.position.y = -1.54;
      const leftBar = new THREE.Mesh(frameVGeo, goldMetalMat);
      leftBar.position.x = -1.15;
      const rightBar = new THREE.Mesh(frameVGeo, goldMetalMat);
      rightBar.position.x = 1.15;
      cardGroup.add(topBar, bottomBar, leftBar, rightBar);

      // Corner brass rivets
      const corners = [
        [-1.12, 1.5],
        [1.12, 1.5],
        [-1.12, -1.5],
        [1.12, -1.5],
      ];
      corners.forEach(([cx, cy]) => {
        const pin = new THREE.Mesh(pinGeo, bronzeMetalMat);
        pin.rotation.x = Math.PI / 2;
        pin.position.set(cx, cy, 0);
        cardGroup.add(pin);
      });

      // Procedural high-DPI textured front face
      const tex = createMonolithTexture(item, idx, maxAniso);
      textures.push(tex);
      const faceMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.38,
        metalness: 0.08,
      });
      faceMats.push(faceMat);

      const frontFace = new THREE.Mesh(faceGeo, faceMat);
      frontFace.position.z = 0.13;
      frontFace.userData.campaignIndex = idx;
      cardGroup.add(frontFace);
      clickTargets.push(frontFace);

      // Back brushed badge face
      const backFace = new THREE.Mesh(faceGeo, faceMat);
      backFace.position.z = -0.13;
      backFace.rotation.y = Math.PI;
      backFace.userData.campaignIndex = idx;
      cardGroup.add(backFace);
      clickTargets.push(backFace);

      const angle = (idx / count) * Math.PI * 2;
      cardGroup.position.set(Math.sin(angle) * radius, 0.12, Math.cos(angle) * radius);
      cardGroup.rotation.y = angle;

      carouselGroup.add(cardGroup);
      monoliths.push(cardGroup);
    });

    // Pointer & Raycasting (pre-allocated scratch objects outside tick)
    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerSmooth = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      clickMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      clickMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(clickMouse, camera);
      const hits = raycaster.intersectObjects(clickTargets, false);
      if (hits.length > 0 && typeof hits[0].object.userData.campaignIndex === 'number') {
        onSelectRef.current?.(hits[0].object.userData.campaignIndex);
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    const resizeObserver = new ResizeObserver(() => {
      if (!host) return;
      const w = Math.max(host.clientWidth, 320);
      const h = Math.max(host.clientHeight, 320);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(host);

    // Animation loop with software WebGL pacing
    let disposed = false;
    let rafId = 0;
    let lastNow = performance.now();
    let elapsed = 0;

    // Track shortest-path continuous rotation angle
    let targetCarouselY = -(activeRef.current / count) * Math.PI * 2;
    let prevActiveIdx = activeRef.current;

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

      if (activeRef.current !== prevActiveIdx) {
        let diff = activeRef.current - prevActiveIdx;
        if (diff > count / 2) diff -= count;
        if (diff < -count / 2) diff += count;
        targetCarouselY -= (diff / count) * Math.PI * 2;
        prevActiveIdx = activeRef.current;
      }

      pointerSmooth.x = THREE.MathUtils.damp(pointerSmooth.x, pointerTarget.x, 5, dt);
      pointerSmooth.y = THREE.MathUtils.damp(pointerSmooth.y, pointerTarget.y, 5, dt);

      const scrollOffset = (scrollRef.current - 0.5) * 0.48;

      carouselGroup.rotation.y = THREE.MathUtils.damp(
        carouselGroup.rotation.y,
        targetCarouselY + pointerSmooth.x * 0.14 + scrollOffset * 0.55,
        5.5,
        dt
      );

      stageGroup.rotation.x = THREE.MathUtils.damp(
        stageGroup.rotation.x,
        pointerSmooth.y * 0.08 - scrollOffset * 0.25,
        5,
        dt
      );

      gyroRing.rotation.z += dt * 0.22;
      outerRing.rotation.z -= dt * 0.1;

      monoliths.forEach((m, i) => {
        const isCurrent = i === activeRef.current;
        const targetLift = isCurrent ? 0.28 + Math.sin(elapsed * 1.8) * 0.05 : -0.05;
        const targetScale = isCurrent ? 1.07 : 0.9;
        m.position.y = THREE.MathUtils.damp(m.position.y, targetLift, 6, dt);
        const s = THREE.MathUtils.damp(m.scale.x, targetScale, 6, dt);
        m.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
      afterDraw(tick);
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);

      outerRingGeo.dispose();
      innerRingGeo.dispose();
      tickGeo.dispose();
      gyroRingGeo.dispose();
      bodyGeo.dispose();
      frameHGeo.dispose();
      frameVGeo.dispose();
      pinGeo.dispose();
      faceGeo.dispose();

      goldMetalMat.dispose();
      bronzeMetalMat.dispose();
      espressoChassisMat.dispose();
      faceMats.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      envTarget.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [items]);

  return (
    <div
      ref={hostRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
      }}
      aria-label="Interactive 3D coalition campaign showcase"
    />
  );
};
