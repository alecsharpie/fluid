import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";

import './../App.css';


import vertexShader from "./../vertexShader.js";
import fragmentShader from "./../fragmentShader.js";

// import vertexShader from "./../vertexShader.glsl";
// import fragmentShader from "./../fragmentShader.glsl";

// Load and extend with raw shader material
extend({ RawShaderMaterial: THREE.RawShaderMaterial });

const FluidSimulation = (props) => {
  const materialRef = useRef();
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const { gl, size } = useThree();

  // Capture mouse position
  useEffect(() => {
    const updateMousePosition = (event) => {
      mousePositionRef.current = {
        x: event.clientX / window.innerWidth,
        y: 1 - event.clientY / window.innerHeight, // Invert y-coordinate because WebGL's origin is at the bottom-left
      };
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // Update uniforms
  useFrame(({ clock }) => {
    if (materialRef.current && materialRef.current.uniforms) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
      materialRef.current.uniforms.u_mouse.value = new THREE.Vector2(
        mousePositionRef.current.x,
        mousePositionRef.current.y
      );
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
        <planeGeometry attach="geometry" args={[2, 2]} />
        <rawShaderMaterial
          ref={materialRef}
          vertexShader={vertexShader} // load from vertexShader.glsl
          fragmentShader={fragmentShader} // load from fragmentShader.glsl
          uniforms={{
            u_time: { value: 0 },
            u_resolution: { value: [size.width, size.height] },
            u_mouse: { value: new THREE.Vector2() },
          }}
        />
      </mesh>
  );
};

const FluidSimulationCanvas = () => {
  return (
    <div className="fluid-simulation">
      <div className="centered-text">Flow</div>
      <Canvas>
        <FluidSimulation />
      </Canvas>
    </div>
  );
};

export default FluidSimulationCanvas;
