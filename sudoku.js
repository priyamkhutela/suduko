function printsudoku(puzzle){
    for (let i=0;i<puzzle.length;i++){
        console.log(",");
       for(let j=0;j<puzzle.length;j++){
       console.log(puzzle[i][j]);
       }
    }
   }
   function numissafe(puzzle,row,col,num){
       for (let x = 0; x <= 8; x++) 
           if (puzzle[row][x] == num) 
               return false; 
      
       for (let x = 0; x <= 8; x++) 
           if (puzzle[x][col] == num) 
               return false; 
      
       var startRow = row - row % 3; 
       var startCol = col - col % 3; 
       
       for (let i = 0; i < 3; i++) 
           for (let j = 0; j < 3; j++) 
               if (puzzle[i + startRow][j +  
                               startCol] == num) 
                   return false; 
     
       return true; 
   }
   function sudokusolver(puzzle,row,col){
       if (row == puzzle.length-1 && col == puzzle.length) 
       return true; 
       if(col==puzzle.length)
       {
           row++;
           col=0;
       }
       if (puzzle[row][col] > 0) 
       return sudokusolver(puzzle, row, col + 1); 
       for (var num = 1; num <= puzzle.length; num++)  
       { 
           if (numissafe(puzzle, row, col, num))  
           {    
               puzzle[row][col] = num;
              if(sudokusolver(puzzle, row, col + 1)) 
               return true;
           } 
           puzzle[row][col] = 0; 
       } 
       return false; 
   
   }
   var puzzle=[
       [0,0,0,2,6,0,7,0,1],
       [6,8,0,0,7,0,0,9,0],
       [1,9,0,0,0,4,5,0,0],
       [8,2,0,1,0,0,0,4,0],
       [0,0,4,6,0,2,9,0,0],
       [0,5,0,0,0,3,0,2,8],
       [0,0,9,3,0,0,0,7,4],
       [0,4,0,0,5,0,0,3,6],
       [7,0,3,0,1,8,0,0,0],
   ];
   
   if(sudokusolver(puzzle,0,0)){
       printsudoku(puzzle);
   }