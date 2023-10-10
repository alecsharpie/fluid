import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import vertexShader from "./../vertexShader.glsl";
import fragmentShader from "./../fragmentShader.glsl";

// Load and extend with raw shader material
extend({ RawShaderMaterial: THREE.RawShaderMaterial });

const FluidSimulation = (props) => {
  const materialRef = useRef();
  const { gl, size } = useThree();

  // Update uniforms
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value = [
        size.width,
        size.height,
      ];
    }
  }, [size]);

  return (
    <mesh>
      <planeBufferGeometry args={[2, 2]} />
      <rawShaderMaterial
        ref={materialRef}
        vertexShader={vertexShader} // load from vertexShader.glsl
        fragmentShader={fragmentShader} // load from fragmentShader.glsl
        uniforms={{
          u_time: { value: 0 },
          u_resolution: { value: [size.width, size.height] },
        }}
      />
    </mesh>
  );
};

const FluidSimulationCanvas = () => {
  return (
    <Canvas>
      <FluidSimulation />
    </Canvas>
  );
};

export default FluidSimulationCanvas;
