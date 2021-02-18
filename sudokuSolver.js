//function to print puzzle
function sudoku(puzzle) {
  /*for (let i=0;i<puzzle.length;i++){
        for(var j=0;j<puzzle.length;j++){
          console.table(puzzle[i][j])
        }
        
    }*/
  console.table(puzzle);
}
//checks whether it will be legal to assign num to the given row col

function issafe(puzzle, row, col, num) {
  //if we find the same num in the similar row,we return false
  for (let x = 0; x <= 8; x++) if (puzzle[row][x] == num) return false;

  //if we find the same num in the similar col,we return false
  for (let x = 0; x <= 8; x++) if (puzzle[x][col] == num) return false;

  //if we find the same num in the particular 3*3 matrix,we return false
  var startRow = row - (row % 3);
  var startCol = col - (col % 3);

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (puzzle[i + startRow][j + startCol] == num) return false;

  return true;
}

/* Takes a partially filled-in puzzle and attempts 
to assign values to all unassigned locations in 
such a way to meet the requirements for 
Sudoku solution */

function sudoku_solver(puzzle, row, col) {
  // Check if we have reached the 8th
  // row and 9th column (0
  // indexed matrix) , we are
  // returning true to avoid
  // further backtracking
  if (row == puzzle.length - 1 && col == puzzle.length) return true;

  // Check if column value  becomes 9 ,
  // we move to next row and
  //  column start from 0
  if (col == puzzle.length) {
    row++;
    col = 0;
  }
  // Check if the current position of
  // the grid already contains
  // value >0, we iterate for next column
  if (puzzle[row][col] > 0) return sudoku_solver(puzzle, row, col + 1);

  for (var num = 1; num <= puzzle.length; num++) {
    // if it is safe to place
    // the num (1-9)  in the
    // given row ,col  ->we
    // move to next column
    if (issafe(puzzle, row, col, num)) {
      puzzle[row][col] = num;

      //  Checking for next possibility with next column
      if (sudoku_solver(puzzle, row, col + 1)) return true;
    }
    // Removing the assigned num ,
    // since our assumption
    // was wrong , and we go for
    // next assumption with
    // diff num value
    puzzle[row][col] = 0;
  }
  return false;
}

//0 means unassigned cells
var puzzle = [
  [0, 0, 0, 2, 6, 0, 7, 0, 1],
  [6, 8, 0, 0, 7, 0, 0, 9, 0],
  [1, 9, 0, 0, 0, 4, 5, 0, 0],
  [8, 2, 0, 1, 0, 0, 0, 4, 0],
  [0, 0, 4, 6, 0, 2, 9, 0, 0],
  [0, 5, 0, 0, 0, 3, 0, 2, 8],
  [0, 0, 9, 3, 0, 0, 0, 7, 4],
  [0, 4, 0, 0, 5, 0, 0, 3, 6],
  [7, 0, 3, 0, 1, 8, 0, 0, 0],
];


if (sudoku_solver(puzzle, 0, 0)) {
  sudoku(puzzle);
}

//O(9^(n*n))
