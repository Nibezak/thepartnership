import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ProcessMechanism3DProps {
  activeStep: number;
  scrollProgress: number;
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

export const ProcessMechanism3D: React.FC<ProcessMechanism3DProps> = ({
  activeStep,
  scrollProgress,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(activeStep);
  const progressRef = useRef(scrollProgress);

  stepRef.current = activeStep;
  progressRef.current = scrollProgress;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = Math.max(host.clientWidth, 300);
    const height = Math.max(host.clientHeight, 300);

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
    renderer.toneMappingExposure = 1.1;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#231B14');
    scene.fog = new THREE.Fog('#231B14', 8, 20);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 40);
    camera.position.set(0, 0.4, 6.4);
    camera.lookAt(0, 0, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();

    const keyLight = new THREE.DirectionalLight('#FFF2C8', 2.4);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#FFCD06', 1.6);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight('#FAF5E6', '#261C14', 0.9);
    scene.add(hemiLight);

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: '#FFCD06',
      metalness: 0.84,
      roughness: 0.2,
    });
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: '#B5840E',
      metalness: 0.72,
      roughness: 0.3,
    });
    const espressoMat = new THREE.MeshStandardMaterial({
      color: '#30261D',
      metalness: 0.28,
      roughness: 0.55,
    });
    const creamCeramicMat = new THREE.MeshStandardMaterial({
      color: '#FAF5E6',
      metalness: 0.08,
      roughness: 0.35,
    });

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    // 1. Core Architectural Octahedral Prism (The Brief / Heart)
    const coreGeo = new THREE.OctahedronGeometry(0.95, 0);
    const coreMesh = new THREE.Mesh(coreGeo, goldMat);
    sculpture.add(coreMesh);

    const coreCageGeo = new THREE.BoxGeometry(1.45, 1.45, 1.45);
    const coreWireGeo = new THREE.EdgesGeometry(coreCageGeo);
    const coreWireMat = new THREE.LineBasicMaterial({ color: '#FFCD06' });
    const coreWire = new THREE.LineSegments(coreWireGeo, coreWireMat);
    sculpture.add(coreWire);

    // 2. Outer Gimbal Diagnostic Rings (Problem ID)
    const ring1Geo = new THREE.TorusGeometry(1.75, 0.045, 16, 100);
    const ring2Geo = new THREE.TorusGeometry(2.15, 0.035, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geo, creamCeramicMat);
    const ring2 = new THREE.Mesh(ring2Geo, bronzeMat);
    sculpture.add(ring1, ring2);

    // 3. Four Coalition Orbital Pillars (Kenya, Uganda, Tanzania, Rwanda)
    const pillarBodyGeo = new THREE.BoxGeometry(0.42, 1.65, 0.42);
    const pillarCapGeo = new THREE.BoxGeometry(0.5, 0.14, 0.5);
    const pillars: THREE.Group[] = [];

    for (let i = 0; i < 4; i++) {
      const pGroup = new THREE.Group();
      const body = new THREE.Mesh(pillarBodyGeo, espressoMat);
      const topCap = new THREE.Mesh(pillarCapGeo, goldMat);
      topCap.position.y = 0.88;
      const botCap = new THREE.Mesh(pillarCapGeo, goldMat);
      botCap.position.y = -0.88;
      pGroup.add(body, topCap, botCap);
      sculpture.add(pGroup);
      pillars.push(pGroup);
    }

    // 4. Signal Nodes / Through-the-Line Satellites
    const nodeGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? goldMat : creamCeramicMat);
      sculpture.add(node);
      nodes.push(node);
    }

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerSmooth = new THREE.Vector2(0, 0);

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    const resizeObserver = new ResizeObserver(() => {
      if (!host) return;
      const w = Math.max(host.clientWidth, 300);
      const h = Math.max(host.clientHeight, 300);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(host);

    let disposed = false;
    let rafId = 0;
    let lastNow = performance.now();
    let elapsed = 0;

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
      const scrollP = progressRef.current;

      pointerSmooth.x = THREE.MathUtils.damp(pointerSmooth.x, pointerTarget.x, 5, dt);
      pointerSmooth.y = THREE.MathUtils.damp(pointerSmooth.y, pointerTarget.y, 5, dt);

      // Sculpture orientation reacts smoothly to scroll & pointer
      sculpture.rotation.y = THREE.MathUtils.damp(
        sculpture.rotation.y,
        scrollP * Math.PI * 1.5 + pointerSmooth.x * 0.35 + elapsed * 0.14,
        4,
        dt
      );
      sculpture.rotation.x = THREE.MathUtils.damp(
        sculpture.rotation.x,
        pointerSmooth.y * 0.25 + Math.sin(scrollP * Math.PI) * 0.18,
        4,
        dt
      );

      // Step-specific sculptural choreography:
      // 0: Tight diagnostic lock | 1: Wide coalition orbit | 2: Dynamic diagonal blades | 3: Expanded TTL relay tower
      const pillarSpread = step === 0 ? 1.55 : step === 1 ? 2.15 : step === 2 ? 1.85 : 2.35;
      const pillarTilt = step === 0 ? 0 : step === 1 ? 0.35 : step === 2 ? -0.55 : 0;

      coreMesh.rotation.y += dt * (0.4 + step * 0.25);
      coreMesh.rotation.x += dt * 0.2;
      const targetCoreScale = step === 2 ? 1.25 : step === 0 ? 1.1 : 0.92;
      const cs = THREE.MathUtils.damp(coreMesh.scale.x, targetCoreScale, 5, dt);
      coreMesh.scale.set(cs, cs, cs);

      coreWire.rotation.y = -coreMesh.rotation.y * 0.6;
      coreWire.rotation.z = THREE.MathUtils.damp(coreWire.rotation.z, step * 0.45, 5, dt);

      ring1.rotation.x = THREE.MathUtils.damp(ring1.rotation.x, Math.PI / 3 + step * 0.42, 4, dt);
      ring1.rotation.y += dt * 0.45;
      ring2.rotation.x = THREE.MathUtils.damp(ring2.rotation.x, -Math.PI / 4 + step * 0.55, 4, dt);
      ring2.rotation.z -= dt * 0.35;

      pillars.forEach((p, i) => {
        const a = (i / 4) * Math.PI * 2 + elapsed * (step === 1 ? 0.45 : 0.18);
        const tx = Math.cos(a) * pillarSpread;
        const tz = Math.sin(a) * pillarSpread;
        const ty = step === 3 ? Math.sin(elapsed * 2 + i * 1.4) * 0.45 : (i % 2 === 0 ? 0.15 : -0.15);

        p.position.x = THREE.MathUtils.damp(p.position.x, tx, 5.5, dt);
        p.position.y = THREE.MathUtils.damp(p.position.y, ty, 5.5, dt);
        p.position.z = THREE.MathUtils.damp(p.position.z, tz, 5.5, dt);
        p.rotation.y = -a;
        p.rotation.z = THREE.MathUtils.damp(p.rotation.z, pillarTilt, 5, dt);
      });

      nodes.forEach((n, i) => {
        const na = (i / 6) * Math.PI * 2 - elapsed * 0.65;
        const nr = step === 3 ? 2.65 : 1.95;
        n.position.set(
          Math.cos(na) * nr,
          Math.cos(na * 2 + elapsed) * (step === 2 ? 1.15 : 0.55),
          Math.sin(na) * nr
        );
        n.rotation.x += dt * 1.2;
        n.rotation.y += dt * 0.9;
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

      coreGeo.dispose();
      coreCageGeo.dispose();
      coreWireGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      pillarBodyGeo.dispose();
      pillarCapGeo.dispose();
      nodeGeo.dispose();

      goldMat.dispose();
      bronzeMat.dispose();
      espressoMat.dispose();
      creamCeramicMat.dispose();
      coreWireMat.dispose();
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
      aria-label="Interactive 3D process kinetic sculpture"
    />
  );
};
