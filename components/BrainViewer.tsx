"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface BrainViewerProps {
  tumorScale?: number;
  animated?: boolean;
  shrinking?: boolean;
  targetScale?: number;
  mode?: "static" | "pulse" | "simulate";
}

export default function BrainViewer({
  tumorScale = 0.45,
  targetScale = 0.45,
  mode = "static",
}: BrainViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ tumorScale, targetScale, mode });

  useEffect(() => {
    propsRef.current = { tumorScale, targetScale, mode };
  }, [tumorScale, targetScale, mode]);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("#0a0f1a", 1);
    mountRef.current.appendChild(renderer.domElement);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.enableZoom = false;
    controls.target.set(0, 0, 0);

    // LIGHTING (Crucial for the PhysicalMaterial)
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight("#ffffff", 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight("#00d0ff", 2.0);
    pointLight.position.set(-3, 3, 3);
    scene.add(pointLight);

    const backLight = new THREE.PointLight("#0055ff", 1.5);
    backLight.position.set(0, -3, -5);
    scene.add(backLight);

    const brainGroup = new THREE.Group();

    // --- 1. LOAD TRUE ANATOMICAL BRAIN MODEL ---
    const loader = new GLTFLoader();
    let brainModel: THREE.Group | null = null;

    // Use a cache-buster so Next.js doesn't serve a 404 if it cached the empty public directory at startup
    loader.load(
      "/brain.glb?v=" + Date.now(),
      (gltf) => {
        brainModel = gltf.scene;

        brainModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.computeVertexNormals();

            // Highly Visible Glowing Base
            child.material = new THREE.MeshStandardMaterial({
              color: 0x052040,
              emissive: 0x004488,
              emissiveIntensity: 0.8,
              roughness: 0.2,
              metalness: 0.5,
              transparent: true,
              opacity: 0.4,
              side: THREE.DoubleSide,
              depthWrite: false,
              blending: THREE.AdditiveBlending
            });

            // Bright Wireframe to define the wrinkles clearly
            const wireframeMat = new THREE.MeshBasicMaterial({
              color: 0x00ffff,
              wireframe: true,
              transparent: true,
              opacity: 0.35, 
              blending: THREE.AdditiveBlending,
              depthWrite: false
            });
            const wireMesh = new THREE.Mesh(child.geometry, wireframeMat);
            child.add(wireMesh);
          }
        });

        // Scale up slightly to fill the viewer better
        brainModel.scale.set(1.8, 1.8, 1.8);

        // Orient the fsaverage surface (Y is anterior, Z is superior)
        brainModel.rotation.x = -Math.PI / 2; 
        brainModel.rotation.y = -Math.PI / 8;
        brainModel.rotation.x += 0.2; 
        
        brainGroup.add(brainModel);
      },
      undefined,
      (error) => {
        console.error("Error loading medical brain model:", error);
      }
    );

    scene.add(brainGroup);

    // --- PROCEDURAL TUMOR (Malignant Core) ---
    const tumorGroup = new THREE.Group();
    // Positioned securely inside the right hemisphere of the scaled brain
    tumorGroup.position.set(1.0, 0.4, 0.4); 
    
    const tumorGeom = new THREE.IcosahedronGeometry(0.8, 32);
    const tPos = tumorGeom.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
        const x = tPos.getX(i);
        const y = tPos.getY(i);
        const z = tPos.getZ(i);
        
        let noise = Math.sin(x * 8) * Math.cos(y * 8) * Math.sin(z * 8) * 0.15;
        noise += Math.sin(x * 15 + y * 15) * 0.08;
        
        const tempV = new THREE.Vector3(x, y, z).normalize().multiplyScalar(1.0 + noise);
        tPos.setXYZ(i, tempV.x, tempV.y, tempV.z);
    }
    tumorGeom.computeVertexNormals();

    const tumorMat = new THREE.MeshStandardMaterial({
      color: 0xff1133,
      emissive: 0x880011,
      emissiveIntensity: 0.6,
      roughness: 0.8,
      metalness: 0.0,
    });
    const tumorMesh = new THREE.Mesh(tumorGeom, tumorMat);

    // Glowing Halo for Tumor
    const glowMat = new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color("#ff0022") } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float rim = 1.0 - max(dot(viewDir, normal), 0.0);
          float intensity = pow(rim, 3.5);
          gl_FragColor = vec4(color, intensity * 0.5);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowMesh = new THREE.Mesh(tumorGeom, glowMat);
    glowMesh.scale.set(1.15, 1.15, 1.15);

    tumorGroup.add(tumorMesh);
    tumorGroup.add(glowMesh);
    
    let currentScale = propsRef.current.tumorScale;
    tumorGroup.scale.set(currentScale, currentScale, currentScale);
    scene.add(tumorGroup);

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();
      
      const time = clock.getElapsedTime();
      const p = propsRef.current;

      // Organic rotation for tumor
      tumorGroup.rotation.y = Math.sin(time * 0.5) * 0.1;
      tumorGroup.rotation.z = Math.cos(time * 0.3) * 0.05;

      if (p.mode === "pulse") {
        const pulse = Math.sin(time * 3) * 0.05;
        const scale = p.tumorScale + pulse;
        tumorGroup.scale.set(scale, scale, scale);
        currentScale = p.tumorScale; 
      } else if (p.mode === "simulate") {
        currentScale = THREE.MathUtils.lerp(currentScale, p.targetScale, 0.02);
        tumorGroup.scale.set(currentScale, currentScale, currentScale);
      } else {
        currentScale = THREE.MathUtils.lerp(currentScale, p.tumorScale, 0.1);
        tumorGroup.scale.set(currentScale, currentScale, currentScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountRef.current);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      tumorGeom.dispose();
      tumorMat.dispose();
      glowMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
