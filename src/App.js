import React from "react";
import FluidSimulationCanvas from "./components/FluidSimulation";

const App = () => {
  return (
    <div style={styles.container}>
      <FluidSimulationCanvas />
    </div>
  );
};

const styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
};

export default App;
