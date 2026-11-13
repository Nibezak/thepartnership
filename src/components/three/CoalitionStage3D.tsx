import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface MonolithCampaignItem {
  client: string;
  tag: string;
  metric: string;
  accentHex: string;
  headline: string;
  photo: string;
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
    return /SwiftShader|llvmpipe|mesa|softpipe|Software/i.test(str);
  } catch {
    return false;
  }
}

function drawCoverImageContainCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;
  const scale = Math.max(dw / iw, dh / ih);
  const sw = dw / scale;
  const sh = dh / scale;
  const sx = (iw - sw) * 0.5;
  const sy = (ih - sh) * 0.35;
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function createCollectorSleeveTexture(
  item: MonolithCampaignItem,
  index: number,
  maxAniso: number
): THREE.CanvasTexture {
  const W = 768;
  const H = 960;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, maxAniso);

  const paintCard = (loadedImg?: HTMLImageElement) => {
    // 1. Warm Cream Archival Board Base
    ctx.fillStyle = '#FAF5E6';
    ctx.fillRect(0, 0, W, H);

    // Subtle vintage paper grain dots
    ctx.fillStyle = 'rgba(48, 38, 29, 0.04)';
    for (let y = 10; y < H; y += 14) {
      for (let x = y % 28 === 10 ? 10 : 17; x < W; x += 14) {
        ctx.fillRect(x, y, 2, 2);
      }
    }

    // Outer Ink Border Frame
    ctx.strokeStyle = '#30261D';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, W - 40, H - 40);

    // 2. Top Editorial Archive Strip
    ctx.fillStyle = '#FFCD06';
    ctx.fillRect(42, 42, 108, 46);
    ctx.strokeStyle = '#30261D';
    ctx.lineWidth = 4;
    ctx.strokeRect(42, 42, 108, 46);

    ctx.fillStyle = '#30261D';
    ctx.font = '700 24px "IBM Plex Mono", monospace';
    ctx.fillText(`0${index + 1}`, 79, 73);

    ctx.fillStyle = '#866C1D';
    ctx.font = '700 20px "IBM Plex Mono", monospace';
    ctx.fillText(item.tag.toUpperCase(), 170, 72);

    // 3. Framed Campaign Photograph Aperture
    const imgX = 42;
    const imgY = 110;
    const imgW = W - 84;
    const imgH = 540;

    ctx.save();
    ctx.beginPath();
    ctx.rect(imgX, imgY, imgW, imgH);
    ctx.clip();

    if (loadedImg) {
      drawCoverImageContainCover(ctx, loadedImg, imgX, imgY, imgW, imgH);
      // Warm analog film matte overlay
      ctx.fillStyle = 'rgba(48, 38, 29, 0.08)';
      ctx.fillRect(imgX, imgY, imgW, imgH);
    } else {
      ctx.fillStyle = '#30261D';
      ctx.fillRect(imgX, imgY, imgW, imgH);
      ctx.fillStyle = '#FFCD06';
      ctx.font = '700 44px "Goudy Bookletter 1911", Georgia, serif';
      ctx.fillText(item.client, imgX + 36, imgY + imgH * 0.52);
    }
    ctx.restore();

    ctx.strokeStyle = '#30261D';
    ctx.lineWidth = 5;
    ctx.strokeRect(imgX, imgY, imgW, imgH);

    // Corner Sun-Gold Metric Stamp overlapping bottom-right edge of photo
    ctx.fillStyle = '#FFCD06';
    ctx.fillRect(W - 294, imgY + imgH - 64, 252, 64);
    ctx.strokeStyle = '#30261D';
    ctx.lineWidth = 4;
    ctx.strokeRect(W - 294, imgY + imgH - 64, 252, 64);
    ctx.fillStyle = '#30261D';
    ctx.font = '700 26px "IBM Plex Mono", monospace';
    ctx.fillText(item.metric.toUpperCase(), W - 274, imgY + imgH - 22);

    // 4. Crisp Client Display Title + Minimal Archive Caption
    ctx.fillStyle = '#30261D';
    ctx.font = '700 66px "Goudy Bookletter 1911", Georgia, serif';
    ctx.fillText(item.client, 42, 742);

    ctx.fillStyle = '#5A4634';
    ctx.font = '500 28px "Inter Tight", sans-serif';
    const words = item.headline.split(' ');
    let line = '';
    let ly = 804;
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > W - 92) {
        ctx.fillText(line, 42, ly);
        line = w;
        ly += 38;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, 42, ly);

    // Bottom catalog barcode / serial line
    ctx.strokeStyle = 'rgba(48, 38, 29, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(42, 888);
    ctx.lineTo(W - 42, 888);
    ctx.stroke();

    ctx.fillStyle = '#866C1D';
    ctx.font = '600 17px "IBM Plex Mono", monospace';
    ctx.fillText('THE PARTNERSHIP · NAIROBI FOLIO ARCHIVE', 42, 920);

    texture.needsUpdate = true;
  };

  paintCard();

  if (item.photo) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => paintCard(img);
    img.src = item.photo;
  }

  return texture;
}

function createVinylLabelTexture(labelText: string, index: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#FFCD06';
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = '#30261D';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 114, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#30261D';
  ctx.textAlign = 'center';
  ctx.font = '700 22px "IBM Plex Mono", monospace';
  ctx.fillText(`SIDE A · 0${index + 1}`, size / 2, 84);

  ctx.font = '700 26px "Goudy Bookletter 1911", Georgia, serif';
  ctx.fillText(labelText.slice(0, 14), size / 2, 178);

  // Center spindle hole
  ctx.fillStyle = '#EDE2C6';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
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
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';
    host.appendChild(renderer.domElement);

    // Warm Cream Archival Exhibition Room (ZERO dark pit, ZERO reflections)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#EFE3C6');
    scene.fog = new THREE.Fog('#EFE3C6', 11, 22);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 45);
    camera.position.set(0, 0.35, 7.8);
    camera.lookAt(0, 0.05, 0);

    // Pure diffuse matte lighting — ZERO glossy hotspots, ZERO RoomEnvironment
    const keyLight = new THREE.DirectionalLight('#FFFBF0', 1.25);
    keyLight.position.set(3.5, 6.0, 6.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#FFE48A', 0.45);
    fillLight.position.set(-5.0, 2.0, 3.0);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight('#FAF5E6', '#C8B48A', 0.95);
    scene.add(hemiLight);

    // Stepped vintage cel shading map
    const toonBands = new Uint8Array([190, 232, 255]);
    const toonGradient = new THREE.DataTexture(toonBands, 3, 1, THREE.RedFormat);
    toonGradient.minFilter = THREE.NearestFilter;
    toonGradient.magFilter = THREE.NearestFilter;
    toonGradient.generateMipmaps = false;
    toonGradient.needsUpdate = true;

    // Tactile matte floor architectural grid & soft matte contact oval
    const gridHelper = new THREE.GridHelper(22, 22, '#B6A278', '#DACAA6');
    gridHelper.position.y = -2.18;
    scene.add(gridHelper);

    const discMatteShadowTex = (() => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d')!;
      const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      g.addColorStop(0, 'rgba(48, 38, 29, 0.34)');
      g.addColorStop(0.55, 'rgba(48, 38, 29, 0.12)');
      g.addColorStop(1, 'rgba(48, 38, 29, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    })();
    const shadowPlaneGeo = new THREE.PlaneGeometry(4.4, 2.1);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: discMatteShadowTex,
      transparent: true,
      depthWrite: false,
    });
    const floorShadow = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.set(0, -2.16, 0.4);
    scene.add(floorShadow);

    // Matte cardstock, timber spine, & vinyl materials
    const sleeveBodyMat = new THREE.MeshLambertMaterial({ color: '#FAF5E6' });
    const spineMat = new THREE.MeshLambertMaterial({ color: '#30261D' });
    const tabMat = new THREE.MeshLambertMaterial({ color: '#FFCD06' });
    const inkEdgeMat = new THREE.LineBasicMaterial({
      color: '#30261D',
      transparent: true,
      opacity: 0.72,
    });
    const vinylMat = new THREE.MeshLambertMaterial({ color: '#241C15' });
    const vinylGrooveMat = new THREE.MeshBasicMaterial({
      color: '#524030',
      transparent: true,
      opacity: 0.55,
    });

    const boardGeo = new THREE.BoxGeometry(2.58, 3.22, 0.08);
    const boardEdgesGeo = new THREE.EdgesGeometry(boardGeo);
    const spineGeo = new THREE.BoxGeometry(0.11, 3.24, 0.11);
    const frontArtGeo = new THREE.PlaneGeometry(2.54, 3.18);
    const cornerTabGeo = new THREE.BoxGeometry(0.32, 0.32, 0.11);

    const vinylGeo = new THREE.CylinderGeometry(1.18, 1.18, 0.03, 44);
    const vinylRing1Geo = new THREE.RingGeometry(0.68, 0.7, 44);
    const vinylRing2Geo = new THREE.RingGeometry(0.94, 0.96, 44);
    const vinylLabelGeo = new THREE.CircleGeometry(0.46, 36);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const disposablesTex: THREE.Texture[] = [discMatteShadowTex, toonGradient];
    const disposablesMat: THREE.Material[] = [
      sleeveBodyMat,
      spineMat,
      tabMat,
      inkEdgeMat,
      vinylMat,
      vinylGrooveMat,
      shadowPlaneMat,
    ];
    const clickTargets: THREE.Object3D[] = [];

    interface FolioRecord {
      group: THREE.Group;
      vinylGroup: THREE.Group;
      currentX: number;
      currentY: number;
      currentZ: number;
      currentRotY: number;
      currentScale: number;
      vinylOut: number;
    }

    const folios: FolioRecord[] = [];
    const galleryRoot = new THREE.Group();
    scene.add(galleryRoot);

    items.forEach((item, idx) => {
      const root = new THREE.Group();

      // Matte Vinyl Disc sliding out from the right side of the collector sleeve
      const vinylGroup = new THREE.Group();
      const vinylDisc = new THREE.Mesh(vinylGeo, vinylMat);
      vinylDisc.rotation.x = Math.PI / 2;

      const ring1 = new THREE.Mesh(vinylRing1Geo, vinylGrooveMat);
      ring1.position.z = 0.018;
      const ring2 = new THREE.Mesh(vinylRing2Geo, vinylGrooveMat);
      ring2.position.z = 0.018;

      const labelTex = createVinylLabelTexture(item.client, idx);
      disposablesTex.push(labelTex);
      const labelMat = new THREE.MeshBasicMaterial({ map: labelTex });
      disposablesMat.push(labelMat);
      const labelMesh = new THREE.Mesh(vinylLabelGeo, labelMat);
      labelMesh.position.z = 0.02;

      vinylGroup.add(vinylDisc, ring1, ring2, labelMesh);
      vinylGroup.position.set(0.35, -0.05, -0.05);
      root.add(vinylGroup);

      // Tactile Cardboard Archival Sleeve
      const sleeveBody = new THREE.Mesh(boardGeo, sleeveBodyMat);
      const sleeveEdges = new THREE.LineSegments(boardEdgesGeo, inkEdgeMat);

      const leftSpine = new THREE.Mesh(spineGeo, spineMat);
      leftSpine.position.x = -1.29;

      const topRightCorner = new THREE.Mesh(cornerTabGeo, tabMat);
      topRightCorner.position.set(1.16, 1.48, 0);

      const coverTex = createCollectorSleeveTexture(item, idx, maxAniso);
      disposablesTex.push(coverTex);
      const coverMat = new THREE.MeshToonMaterial({
        map: coverTex,
        gradientMap: toonGradient,
      });
      disposablesMat.push(coverMat);

      const frontArt = new THREE.Mesh(frontArtGeo, coverMat);
      frontArt.position.z = 0.044;
      frontArt.userData.campaignIndex = idx;

      const backArt = new THREE.Mesh(frontArtGeo, spineMat);
      backArt.position.z = -0.044;
      backArt.rotation.y = Math.PI;
      backArt.userData.campaignIndex = idx;

      root.add(sleeveBody, sleeveEdges, leftSpine, topRightCorner, frontArt, backArt);
      clickTargets.push(frontArt, backArt);

      galleryRoot.add(root);
      folios.push({
        group: root,
        vinylGroup,
        currentX: 0,
        currentY: 0,
        currentZ: 0,
        currentRotY: 0,
        currentScale: 1,
        vinylOut: 0,
      });
    });

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerSmooth = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();

    let isDragging = false;
    let dragStartX = 0;
    let dragDist = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragDist = 0;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        dragDist = Math.abs(e.clientX - dragStartX);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';

      const dx = e.clientX - dragStartX;
      const count = items.length;
      if (Math.abs(dx) > 36) {
        const nextIdx = dx < 0 ? (activeRef.current + 1) % count : (activeRef.current - 1 + count) % count;
        onSelectRef.current?.(nextIdx);
        return;
      }

      if (dragDist < 8) {
        const rect = renderer.domElement.getBoundingClientRect();
        clickMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        clickMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(clickMouse, camera);
        const hits = raycaster.intersectObjects(clickTargets, false);
        if (hits.length > 0 && typeof hits[0].object.userData.campaignIndex === 'number') {
          const hitIdx = hits[0].object.userData.campaignIndex;
          if (hitIdx === activeRef.current) {
            onSelectRef.current?.((hitIdx + 1) % count);
          } else {
            onSelectRef.current?.(hitIdx);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      if (!host) return;
      const w = Math.max(host.clientWidth, 320);
      const h = Math.max(host.clientHeight, 320);
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
      rafId = requestAnimationFrame(() => setTimeout(cb, 80));
    };

    const count = items.length;

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      elapsed += dt;

      pointerSmooth.x = THREE.MathUtils.damp(pointerSmooth.x, pointerTarget.x, 5, dt);
      pointerSmooth.y = THREE.MathUtils.damp(pointerSmooth.y, pointerTarget.y, 5, dt);

      const scrollOffset = (scrollRef.current - 0.5) * 0.28;
      galleryRoot.rotation.y = THREE.MathUtils.damp(
        galleryRoot.rotation.y,
        pointerSmooth.x * 0.08,
        5,
        dt
      );
      galleryRoot.rotation.x = THREE.MathUtils.damp(
        galleryRoot.rotation.x,
        pointerSmooth.y * 0.045 - scrollOffset * 0.14,
        5,
        dt
      );

      for (let i = 0; i < count; i++) {
        let rel = i - activeRef.current;
        if (rel > Math.floor(count / 2)) rel -= count;
        if (rel < -Math.floor(count / 2)) rel += count;

        const absRel = Math.abs(rel);
        const isCurrent = rel === 0;

        // Kinetic Coverflow Arc — Active sleeve forward with Vinyl sliding out
        const targetX = rel * 2.12 - (isCurrent ? 0.34 : 0);
        const targetZ = isCurrent ? 1.35 : -absRel * 1.15;
        const targetY = isCurrent ? 0.08 + Math.sin(elapsed * 1.6) * 0.04 : -0.14 * absRel;
        const targetRotY = isCurrent ? -0.09 + pointerSmooth.x * 0.08 : -rel * 0.44;
        const targetScale = isCurrent ? 1.04 : Math.max(0.74, 0.9 - absRel * 0.08);
        const targetVinylOut = isCurrent ? 1.16 : 0.12;

        const f = folios[i];
        f.currentX = THREE.MathUtils.damp(f.currentX, targetX, 7, dt);
        f.currentY = THREE.MathUtils.damp(f.currentY, targetY, 7, dt);
        f.currentZ = THREE.MathUtils.damp(f.currentZ, targetZ, 7, dt);
        f.currentRotY = THREE.MathUtils.damp(f.currentRotY, targetRotY, 7, dt);
        f.currentScale = THREE.MathUtils.damp(f.currentScale, targetScale, 7, dt);
        f.vinylOut = THREE.MathUtils.damp(f.vinylOut, targetVinylOut, 5.5, dt);

        f.group.position.set(f.currentX, f.currentY, f.currentZ);
        f.group.rotation.y = f.currentRotY;
        f.group.scale.setScalar(f.currentScale);

        f.vinylGroup.position.x = f.vinylOut;
        f.vinylGroup.rotation.z -= dt * (isCurrent ? 0.85 : 0.08);
      }

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

      boardGeo.dispose();
      boardEdgesGeo.dispose();
      spineGeo.dispose();
      frontArtGeo.dispose();
      cornerTabGeo.dispose();
      vinylGeo.dispose();
      vinylRing1Geo.dispose();
      vinylRing2Geo.dispose();
      vinylLabelGeo.dispose();
      shadowPlaneGeo.dispose();

      disposablesTex.forEach((t) => t.dispose());
      disposablesMat.forEach((m) => m.dispose());
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
      }}
      aria-label="Interactive matte 3D campaign folio gallery — drag or click any cover to explore"
    />
  );
};
