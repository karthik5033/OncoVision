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
          if (child instanceof THREE.Mesh || child instanceof THREE.Points) {

            const isPoints = child instanceof THREE.Points;
            const hasVertexColors = !!child.geometry.attributes.color;

            // The Ultimate Solid X-Ray Shader
            // This shader uses fully opaque points for perfect 3D geometry and sharp wrinkles,
            // avoiding any glitchy slicing artifacts. To make the tumor visible through the opaque
            // shell, it uses an advanced Depth Hack to pull the red points forward in clip space.
            const customMat = new THREE.ShaderMaterial({
              uniforms: {
                tumorCenter: { value: new THREE.Vector3(260.0, -10.0, 223.0) },
                tumorRadius: { value: 0.0 },
              },
              vertexShader: `
                uniform vec3 tumorCenter;
                uniform float tumorRadius;
                
                ${hasVertexColors ? 'attribute vec3 color;' : ''}
                
                varying vec3 vColor;
                
                void main() {
                  // Extract grayscale luminance (wrinkle topography) from baked colors
                  ${hasVertexColors 
                    ? 'float gray = dot(color, vec3(0.299, 0.587, 0.114));' 
                    : 'float gray = 0.5;'
                  }
                  
                  // Enhance contrast for sharp, distinct gyri/sulci, but soften slightly 
                  // to avoid amplifying the AI-generated voxel noise
                  float detail = smoothstep(0.1, 0.9, gray);
                  
                  // Clinical Holo-Palette
                  vec3 shadowBlue = vec3(0.01, 0.04, 0.15); // Deep crevices
                  vec3 ridgeCyan  = vec3(0.0, 0.65, 1.0);   // Bright ridges
                  vec3 baseCol = mix(shadowBlue, ridgeCyan, detail);
                  
                  // Volumetric Rim Light
                  vec3 normalDir = normalize(position - vec3(225.0, -22.0, 200.0));
                  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
                  vec3 viewDir = normalize(-mvPos.xyz);
                  float fresnel = 1.0 - abs(dot(viewDir, normalize(normalMatrix * normalDir)));
                  fresnel = pow(fresnel, 2.0);
                  baseCol += vec3(0.1, 0.5, 0.9) * fresnel * 0.7;
                  
                  // Tumor Distance & Intensity
                  float dist = distance(position, tumorCenter);
                  float intensity = 1.0 - smoothstep(tumorRadius * 0.1, tumorRadius, dist);
                  
                  // Tumor Core Gradient
                  vec3 tumorCol = mix(vec3(0.8, 0.0, 0.1), vec3(1.0, 0.9, 0.2), intensity);
                  
                  // Final Color
                  vColor = mix(baseCol, tumorCol, intensity);
                  
                  // Calculate raw projection
                  vec4 projectedPos = projectionMatrix * mvPos;
                  
                  // X-RAY DEPTH HACK: 
                  // If this point is part of the tumor (intensity > 0), pull it forward 
                  // towards the camera in the depth buffer. This allows the red tumor 
                  // to render ON TOP of the opaque blue brain surface, making it visible 
                  // from any angle without needing glitchy transparency!
                  projectedPos.z -= intensity * 0.15 * projectedPos.w;
                  
                  gl_Position = projectedPos;
                  
                  // MASSIVE POINT SIZE: The AI point cloud is generated in discrete vertical slices.
                  // We must use a large enough point size to physically bridge the gaps between 
                  // these slices. If the points are too small, the gaps create "stacked plate" artifacts.
                  ${isPoints ? 'gl_PointSize = 4.2 * (8.0 / -mvPos.z);' : ''}
                }
              `,
              fragmentShader: `
                varying vec3 vColor;
                void main() {
                  ${isPoints ? `
                    vec2 xy = gl_PointCoord.xy - vec2(0.5);
                    if (length(xy) > 0.5) discard; // Keep points perfectly circular
                  ` : ''}
                  // Fully opaque for perfect depth-sorting and sharp wrinkle definition
                  gl_FragColor = vec4(vColor, 1.0);
                }
              `,
              transparent: false,
              depthWrite: true, 
              depthTest: true,
            });

            child.material = customMat;
            child.material.userData.customUniforms = customMat.uniforms;
          }
        });

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(brainModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredScale = 5.0 / maxDim;
        
        brainModel.position.sub(center);

        const wrapper = new THREE.Group();
        wrapper.add(brainModel);
        wrapper.scale.set(desiredScale, desiredScale, desiredScale);
        
        brainGroup.add(wrapper);
      },
      undefined,
      (error) => {
        console.error("Error loading medical brain model:", error);
      }
    );

    scene.add(brainGroup);


    let currentScale = propsRef.current.tumorScale;

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();
      
      const time = clock.getElapsedTime();
      const p = propsRef.current;

      // Calculate the current dynamic size of the tumor
      if (p.mode === "pulse") {
        const pulse = Math.sin(time * 3) * 0.05;
        currentScale = p.tumorScale + pulse;
      } else if (p.mode === "simulate") {
        currentScale = THREE.MathUtils.lerp(currentScale, p.targetScale, 0.02);
      } else {
        currentScale = THREE.MathUtils.lerp(currentScale, p.tumorScale, 0.1);
      }

      // Update the shader uniform for all brain meshes or points
      if (brainModel) {
        brainModel.traverse((child) => {
          if ((child instanceof THREE.Mesh || child instanceof THREE.Points) && child.material.userData.customUniforms) {
             // Map currentScale (0.0 - 1.0) to model-space radius (0 - 80 units)
             child.material.userData.customUniforms.tumorRadius.value = currentScale * 80.0;
          }
        });
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

    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
