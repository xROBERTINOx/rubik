'use client'

import { useState } from 'react'
import Head from 'next/head'

type Color = 'white' | 'yellow' | 'red' | 'orange' | 'green' | 'blue'
type Face = Color[][]

interface CubeState {
  front: Face  // white
  back: Face   // yellow
  up: Face     // blue
  down: Face   // green
  left: Face   // orange
  right: Face  // red
}

export default function Play() {
  const [cube, setCube] = useState<CubeState>(() => initialCubeState());

  const rotateFront = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.front = rotateClockwise(newCube.front);
      const temp = newCube.up[2];
      newCube.up[2] = [newCube.left[2][2], newCube.left[1][2], newCube.left[0][2]];
      [newCube.left[0][2], newCube.left[1][2], newCube.left[2][2]] = newCube.down[0].reverse();
      newCube.down[0] = [newCube.right[2][0], newCube.right[1][0], newCube.right[0][0]];
      [newCube.right[0][0], newCube.right[1][0], newCube.right[2][0]] = temp;
      return newCube;
    });
  };

  const rotateFrontPrime = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.front = rotateCounterClockwise(newCube.front);
      const temp = newCube.up[2];
      newCube.up[2] = [newCube.right[0][0], newCube.right[1][0], newCube.right[2][0]];
      [newCube.right[0][0], newCube.right[1][0], newCube.right[2][0]] = newCube.down[0];
      newCube.down[0] = [newCube.left[2][2], newCube.left[1][2], newCube.left[0][2]].reverse();
      [newCube.left[0][2], newCube.left[1][2], newCube.left[2][2]] = temp.reverse();
      return newCube;
    });
  };

  const rotateUp = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.up = rotateClockwise(newCube.up);
      const temp = newCube.front[0];
      newCube.front[0] = newCube.right[0];
      newCube.right[0] = newCube.back[0];
      newCube.back[0] = newCube.left[0];
      newCube.left[0] = temp;
      return newCube;
    });
  };

  const rotateUpPrime = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.up = rotateCounterClockwise(newCube.up);
      const temp = newCube.front[0];
      newCube.front[0] = newCube.left[0];
      newCube.left[0] = newCube.back[0];
      newCube.back[0] = newCube.right[0];
      newCube.right[0] = temp;
      return newCube;
    });
  };

  const rotateDown = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.down = rotateClockwise(newCube.down);
      const temp = newCube.front[2];
      newCube.front[2] = newCube.left[2];
      newCube.left[2] = newCube.back[2];
      newCube.back[2] = newCube.right[2];
      newCube.right[2] = temp;
      return newCube;
    });
  };

  const rotateDownPrime = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.down = rotateCounterClockwise(newCube.down);
      const temp = newCube.front[2];
      newCube.front[2] = newCube.right[2];
      newCube.right[2] = newCube.back[2];
      newCube.back[2] = newCube.left[2];
      newCube.left[2] = temp;
      return newCube;
    });
  };

  const rotateRight = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.right = rotateClockwise(newCube.right);
      const temp = [newCube.up[0][2], newCube.up[1][2], newCube.up[2][2]];
      [newCube.up[0][2], newCube.up[1][2], newCube.up[2][2]] = [newCube.front[0][2], newCube.front[1][2], newCube.front[2][2]];
      [newCube.front[0][2], newCube.front[1][2], newCube.front[2][2]] = [newCube.down[0][2], newCube.down[1][2], newCube.down[2][2]];
      [newCube.down[0][2], newCube.down[1][2], newCube.down[2][2]] = [newCube.back[2][0], newCube.back[1][0], newCube.back[0][0]].reverse();
      [newCube.back[2][0], newCube.back[1][0], newCube.back[0][0]] = temp.reverse();
      return newCube;
    });
  };

  const rotateRightPrime = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.right = rotateCounterClockwise(newCube.right);
      const temp = [newCube.up[0][2], newCube.up[1][2], newCube.up[2][2]];
      [newCube.up[0][2], newCube.up[1][2], newCube.up[2][2]] = [newCube.back[2][0], newCube.back[1][0], newCube.back[0][0]].reverse();
      [newCube.back[2][0], newCube.back[1][0], newCube.back[0][0]] = [newCube.down[0][2], newCube.down[1][2], newCube.down[2][2]].reverse();
      [newCube.down[0][2], newCube.down[1][2], newCube.down[2][2]] = [newCube.front[0][2], newCube.front[1][2], newCube.front[2][2]];
      [newCube.front[0][2], newCube.front[1][2], newCube.front[2][2]] = temp;
      return newCube;
    });
  };

  const rotateLeft = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.left = rotateClockwise(newCube.left);
      const temp = [newCube.up[0][0], newCube.up[1][0], newCube.up[2][0]];
      [newCube.up[0][0], newCube.up[1][0], newCube.up[2][0]] = [newCube.back[2][2], newCube.back[1][2], newCube.back[0][2]].reverse();
      [newCube.back[2][2], newCube.back[1][2], newCube.back[0][2]] = [newCube.down[0][0], newCube.down[1][0], newCube.down[2][0]].reverse();
      [newCube.down[0][0], newCube.down[1][0], newCube.down[2][0]] = [newCube.front[0][0], newCube.front[1][0], newCube.front[2][0]];
      [newCube.front[0][0], newCube.front[1][0], newCube.front[2][0]] = temp;
      return newCube;
    });
  };

  const rotateLeftPrime = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.left = rotateCounterClockwise(newCube.left);
      const temp = [newCube.up[0][0], newCube.up[1][0], newCube.up[2][0]];
      [newCube.up[0][0], newCube.up[1][0], newCube.up[2][0]] = [newCube.front[0][0], newCube.front[1][0], newCube.front[2][0]];
      [newCube.front[0][0], newCube.front[1][0], newCube.front[2][0]] = [newCube.down[0][0], newCube.down[1][0], newCube.down[2][0]];
      [newCube.down[0][0], newCube.down[1][0], newCube.down[2][0]] = [newCube.back[2][2], newCube.back[1][2], newCube.back[0][2]].reverse();
      [newCube.back[2][2], newCube.back[1][2], newCube.back[0][2]] = temp.reverse();
      return newCube;
    });
  };

  const rotateBack = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.back = rotateClockwise(newCube.back);
      const temp = newCube.up[0];
      newCube.up[0] = [newCube.right[0][2], newCube.right[1][2], newCube.right[2][2]];
      [newCube.right[0][2], newCube.right[1][2], newCube.right[2][2]] = newCube.down[2].reverse();
      newCube.down[2] = [newCube.left[2][0], newCube.left[1][0], newCube.left[0][0]];
      [newCube.left[2][0], newCube.left[1][0], newCube.left[0][0]] = temp.reverse();
      return newCube;
    });
  };

  const rotateBackPrime = () => {
    setCube(prevCube => {
      const newCube = JSON.parse(JSON.stringify(prevCube)) as CubeState;
      newCube.back = rotateCounterClockwise(newCube.back);
      const temp = newCube.up[0];
      newCube.up[0] = [newCube.left[0][0], newCube.left[1][0], newCube.left[2][0]].reverse();
      [newCube.left[0][0], newCube.left[1][0], newCube.left[2][0]] = newCube.down[2];
      newCube.down[2] = [newCube.right[2][2], newCube.right[1][2], newCube.right[0][2]].reverse();
      [newCube.right[0][2], newCube.right[1][2], newCube.right[2][2]] = temp;
      return newCube;
    });
  };

  // ... rest of the component code

  return (
    <div className="container">
      <Head>
        <title>rubikCube - Play</title>
        <meta name="description" content="Play Rubik's Cube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">rubikCube</h1>
        <div className="cube-container">
          <div className="cube-row">
            <div className="face-placeholder"></div>
            <Face face={cube.up} /> 
            <div className="face-placeholder"></div>
          </div>
          <div className="cube-row">
            <Face face={cube.left} /> 
            <Face face={cube.front} /> 
            <Face face={cube.right} /> 
          </div>
          <div className="cube-row">
            <div className="face-placeholder"></div>
            <Face face={cube.down} /> 
            <div className="face-placeholder"></div>
          </div>
          <div className="cube-row">
            <div className="face-placeholder"></div>
            <Face face={cube.back} /> 
            <div className="face-placeholder"></div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={rotateUp} className="rotate-button">U</button>
          <button onClick={rotateUpPrime} className="rotate-button">U'</button>
          <button onClick={rotateDown} className="rotate-button">D</button>
          <button onClick={rotateDownPrime} className="rotate-button">D'</button>
          <button onClick={rotateRight} className="rotate-button">R</button>
          <button onClick={rotateRightPrime} className="rotate-button">R'</button>
          <button onClick={rotateLeft} className="rotate-button">L</button>
          <button onClick={rotateLeftPrime} className="rotate-button">L'</button>
          <button onClick={rotateFront} className="rotate-button">F</button>
          <button onClick={rotateFrontPrime} className="rotate-button">F'</button>
          <button onClick={rotateBack} className="rotate-button">B</button>
          <button onClick={rotateBackPrime} className="rotate-button">B'</button>
        </div>
      </main>
    </div>
  );
}

function Face({ face }: { face: Face }) {
  return (
    <div className="face">
      {face.flat().map((color, squareIndex) => (
        <div
          key={squareIndex}
          className="square"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}

function initialCubeState(): CubeState {
    return {
        front: [['white', 'white', 'white'], ['white', 'white', 'white'], ['white', 'white', 'white']],
        left: [['orange', 'orange', 'orange'], ['orange', 'orange', 'orange'], ['orange', 'orange', 'orange']],
        down: [['green', 'green', 'green'], ['green', 'green', 'green'], ['green', 'green', 'green']],
        right: [['red', 'red', 'red'], ['red', 'red', 'red'], ['red', 'red', 'red']],
        back: [['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow']],
        up: [['blue', 'blue', 'blue'], ['blue', 'blue', 'blue'], ['blue', 'blue', 'blue']]
    }
  }

  function rotateClockwise(face: Face): Face {
    return [
      [face[2][0], face[1][0], face[0][0]],
      [face[2][1], face[1][1], face[0][1]],
      [face[2][2], face[1][2], face[0][2]]
    ];
  }
  
  function rotateCounterClockwise(face: Face): Face {
    return [
      [face[0][2], face[1][2], face[2][2]],
      [face[0][1], face[1][1], face[2][1]],
      [face[0][0], face[1][0], face[2][0]]
    ];
  }

// up: [['white', 'white', 'white'], ['white', 'white', 'white'], ['white', 'white', 'white']],
// left: [['orange', 'orange', 'orange'], ['orange', 'orange', 'orange'], ['orange', 'orange', 'orange']],
// : [['green', 'green', 'green'], ['green', 'green', 'green'], ['green', 'green', 'green']],
// right: [['red', 'red', 'red'], ['red', 'red', 'red'], ['red', 'red', 'red']],
// : [['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow']],
// back: [['blue', 'blue', 'blue'], ['blue', 'blue', 'blue'], ['blue', 'blue', 'blue']]
