import React from 'react';
import FluidSimulationCanvas from './components/FluidSimulation';
const App = () => {
  return (
    <div style={styles.container}>
      <FluidSimulationCanvas />
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px solid #333', // Adjust border thickness and color as needed
    margin: 10, // Adjust margin as needed
    overflow: 'hidden',
  },
};

export default App;
