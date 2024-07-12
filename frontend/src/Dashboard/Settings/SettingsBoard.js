// import React, { useState, useEffect } from 'react';

// const boardSize = 25;
// const initialSnake = [{ x: 2, y: 2 }];
// const initialApple = { x: 5, y: 5 };

// const useInterval = (callback, delay) => {
//   const savedCallback = React.useRef();

//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// };

// const SettingsBoard = () => {
//   const [snake, setSnake] = useState(initialSnake);
//   const [apple, setApple] = useState(initialApple);
//   const [direction, setDirection] = useState('RIGHT');
//   const [delay, setDelay] = useState(200);

//   useInterval(() => gameLoop(), delay);

//   const createApple = () =>
//     setApple({
//       x: Math.floor(Math.random() * boardSize),
//       y: Math.floor(Math.random() * boardSize),
//     });

//   const moveSnake = ({ x, y }) => {
//     const newSnake = [...snake];
//     newSnake.unshift({ x, y });
//     if (newSnake[0].x === apple.x && newSnake[0].y === apple.y) {
//       createApple();
//     } else {
//       newSnake.pop();
//     }
//     setSnake(newSnake);
//   };

//   const changeDirection = (event) => {
//     switch (event.keyCode) {
//       case 37: // left
//         setDirection('LEFT');
//         break;
//       case 38: // up
//         setDirection('UP');
//         break;
//       case 39: // right
//         setDirection('RIGHT');
//         break;
//       case 40: // down
//         setDirection('DOWN');
//         break;
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('keydown', changeDirection);
//     return () => window.removeEventListener('keydown', changeDirection);
//   }, []);

//   const gameLoop = () => {
//     const head = snake[0];
//     let newHead;
//     switch (direction) {
//       case 'RIGHT':
//         newHead = { x: head.x + 1, y: head.y };
//         break;
//       case 'LEFT':
//         newHead = { x: head.x - 1, y: head.y };
//         break;
//       case 'DOWN':
//         newHead = { x: head.x, y: head.y + 1 };
//         break;
//       case 'UP':
//         newHead = { x: head.x, y: head.y - 1 };
//         break;
//     }
//     moveSnake(newHead);
//   };

//   return (
//     <div>
//       <h2>We don't have anything for you to set so Play SNAKE!</h2>
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: `repeat(${boardSize}, 20px)`,
//         }}>
//         {Array.from({ length: boardSize * boardSize }).map((_, index) => {
//           const x = index % boardSize;
//           const y = Math.floor(index / boardSize);
//           const isSnake = snake.some(
//             (segment) => segment.x === x && segment.y === y
//           );
//           const isApple = apple.x === x && apple.y === y;

//           return (
//             <div
//               key={index}
//               style={{
//                 width: '20px',
//                 height: '20px',
//                 backgroundColor: isSnake ? 'green' : isApple ? 'red' : 'white',
//                 border: '1px solid black',
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SettingsBoard;

import React, { useState, useEffect, useRef } from 'react';

const boardSize = 25;
const initialSnake = [{ x: 2, y: 2 }];
const initialApple = { x: 5, y: 5 };

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const astar = (start, goal, snake) => {
  let openSet = [start];
  let cameFrom = new Map();
  let gScore = new Map();
  let fScore = new Map();
  gScore.set(start, 0);
  fScore.set(start, heuristic(start, goal));

  while (openSet.length > 0) {
    let current = openSet.reduce((a, b) =>
      fScore.get(a) < fScore.get(b) ? a : b
    );

    if (current.x === goal.x && current.y === goal.y) {
      let path = [];
      while (cameFrom.has(current)) {
        path.unshift(current);
        current = cameFrom.get(current);
      }
      return path;
    }

    openSet = openSet.filter((x) => x !== current);
    for (let d of [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ]) {
      let neighbor = { x: current.x + d.x, y: current.y + d.y };
      if (
        neighbor.x < 0 ||
        neighbor.y < 0 ||
        neighbor.x >= boardSize ||
        neighbor.y >= boardSize ||
        snake.some((s) => s.x === neighbor.x && s.y === neighbor.y)
      ) {
        continue;
      }

      let tentativeGScore = gScore.get(current) + 1;
      if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, gScore.get(neighbor) + heuristic(neighbor, goal));
        if (!openSet.some((x) => x.x === neighbor.x && x.y === neighbor.y)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return [];
};

const SettingsBoard = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [path, setPath] = useState([]);
  const [delay, setDelay] = useState(100);

  useInterval(() => gameLoop(), delay);

  const createApple = () =>
    setApple({
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    });

  const moveSnake = ({ x, y }) => {
    const newSnake = [...snake];
    newSnake.unshift({ x, y });
    if (newSnake[0].x === apple.x && newSnake[0].y === apple.y) {
      createApple();
      setPath(astar(newSnake[0], apple, newSnake));
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const gameLoop = () => {
    if (path.length > 0) {
      const nextStep = path.shift();
      moveSnake(nextStep);
    } else {
      setPath(astar(snake[0], apple, snake));
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case 37: // left
        case 38: // up
        case 39: // right
        case 40: // down
          setPath(astar(snake[0], apple, snake));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [snake, apple]);

  return (
    <div>
      <h2>We don't have anything for you to set so Play SNAKE!</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${boardSize}, 20px)`,
        }}>
        {Array.from({ length: boardSize * boardSize }).map((_, index) => {
          const x = index % boardSize;
          const y = Math.floor(index / boardSize);
          const isSnake = snake.some(
            (segment) => segment.x === x && segment.y === y
          );
          const isApple = apple.x === x && apple.y === y;

          return (
            <div
              key={index}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: isSnake ? 'green' : isApple ? 'red' : 'white',
                border: '1px solid black',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SettingsBoard;
