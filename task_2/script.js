const mazeDefault = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],

  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

const mazeTest = [
  ["#", "#", "+", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "+", "#", "+", "+", "#", "#"],

  ["#", "+", "#", "+", "#", "#", "+", "+", "#", "#"],

  ["#", "#", "#", "+", "#", "#", "+", "#", "+", "#"],

  ["#", "#", "+", "+", "+", "0", "+", "#", "+", "#"],

  ["#", "#", "+", "#", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "+", "#", "#", "+", "+", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "+", "#", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

/* * * * * * * * * MAIN FUNC * * * * * * * * */

function finder(maze) {
  const start = "0";
  const [a, b] = startIndex(maze, start);

  let [row, col] = [a, b];
  let path = [];
  let nodeList = [];
  let stepList = [];

  findPath(row, col);

  function findPath(row, col) {
    if (maze[row][col + 1] === "+") {
      path.push("right");
      if (col + 1 === maze[row].length - 1) return;

      maze[row][col + 1] = "X";
      stepList.push([row, col + 1]);

      if (numberOfOpenPaths(row, col + 1, maze) > 1)
        nodeList.push([row, col + 1]);

      findPath(row, col + 1);
    } else if (maze[row + 1][col] === "+") {
      path.push("bottom");
      if (row + 1 === maze.length - 1) return;

      maze[row + 1][col] = "X";
      stepList.push([row + 1, col]);

      if (numberOfOpenPaths(row + 1, col, maze) > 1)
        nodeList.push([row + 1, col]);

      findPath(row + 1, col);
    } else if (maze[row][col - 1] === "+") {
      path.push("left");
      if (col - 1 === 0) return;

      maze[row][col - 1] = "X";
      stepList.push([row, col - 1]);

      if (numberOfOpenPaths(row, col - 1, maze) > 1)
        nodeList.push([row, col - 1]);

      findPath(row, col - 1);
    } else if (maze[row - 1][col] === "+") {
      path.push("top");
      if (row - 1 === 0) return;

      maze[row - 1][col] = "X";
      stepList.push([row - 1, col]);

      if (numberOfOpenPaths(row - 1, col, maze) > 1)
        nodeList.push([row - 1, col]);

      findPath(row - 1, col);
    } else {
      if (nodeList.length) pathRecover(nodeList, stepList, maze);

      path = [];
      stepList = [];
      nodeList = [];
      [row, col] = [a, b];

      findPath(row, col);
    }
  }

  return path;
}

/* * * * * * * * * FUNCs * * * * * * * * */

function startIndex(maze, start) {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === start) {
        let b = maze[i].indexOf(start);
        let a = maze.indexOf(maze[i]);
        return [a, b];
      }
    }
  }
}

function numberOfOpenPaths(row, col, maze) {
  return [
    maze[row][col + 1],
    maze[row + 1][col],
    maze[row][col - 1],
    maze[row - 1][col],
  ].reduce((acc, item) => (item === "+" ? (acc += 1) : acc), 0);
}

function pathRecover(nodeList, stepList, maze) {
  const lastNode = nodeList[nodeList.length - 1];
  let indexNode;

  stepList.forEach((item, i) => {
    if (String(item) === String(lastNode)) indexNode = i;
  });

  for (let i = 0; i <= indexNode; i++) {
    let j = stepList[i];
    maze[j[0]][j[1]] = "+";
  }
}

console.log(finder(mazeDefault));
console.log(finder(mazeTest));
