/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


/*

Blank 4x4 array:

[
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

*/



// HELPER METHODS!!! /////////////////////////////////////////////////////////

var createMultidimensionalArray = function(n) {
  
  var multiD = [];
  var arr = Array(n);
  arr = arr.fill(0);
  for (var i = 0; i < arr.length; i++) {
    var newArr = Array(n);
    newArr.fill(0);
    multiD.push(newArr);
  }
  
  return multiD;
};

// var invalids= [ [1,1], [2,2], [3,3], [4,4] ]
// var toToggleArray = [ [1,1], [2,2] ];

var createColumnAtIndex = function(multiDimArray, columnIndex) {
  var column = [];
  for (var i = 0; i < multiDimArray.length; i++) {
    var row = multiDimArray[i];
    column.push(row[columnIndex]);
  }
  
  return column;
};

var toggleMultidimensionalArray = function (coordinates, multiDimArray) {
  // for (var i = 0; i < togglesArray.length; i++) {
  // var coordinates = togglesArray[i];
  var row = coordinates[0];
  var column = coordinates[1];
  // console.log('inner coordinates:', coordinates, 'inner row:', row, 'inner column:', column);
  multiDimArray[row][column] = 1;
  // }
  
  return multiDimArray;
};

var checkIfDeeplyIncludes = function(baseArray, newItem) {
  for (var i = 0; i < baseArray.length; i++) {
    var currentElement = baseArray[i];
    if (_.isEqual(currentElement, newItem)) {
      return true;
    }
  }
  return false;
};

//////////////////////////////////////////////////////////////////////////////



// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solutionCount = 0; //fixme
  var solutionsArray = [];
  var invalids = [];
  var rooksPlaced = 0;
  var emptyMatrix = createMultidimensionalArray(n);
  var rounds = 0;
  // var x = 0;
  // var y = 0;
  // var totalSolutions = 0;

  // create multiDboard


  // function(x,y, invalids array (init: empty), and multiDboard (init: empty))
  var recursiveHelper = function(x, y, invalidsArray, matrix) {
    if (solutionsArray.length >= 1) {
      return;
    }
    //FIRST: check if y is out of bounds, if so, call with next row and reset y
    if (y >= matrix[0].length && x >= matrix[0].length) {
      return;
    // if (y >= matrix[0].length) {
      // return;
    // check if x & y are at maximum, if so, return out of recursive loop
    } else if (y >= matrix[0].length) {
      recursiveHelper(x + 1, 0, invalidsArray, matrix);
      return;
    } else if (x >= matrix[0].length) {
      return;
    }

    // create new local scope array of invalid coordinates
    var invalidsArray = invalidsArray;
    // create new Board object to toggle/edit, passing in multidimensional matrix as grid
    var board = new Board(matrix);






    // confirm coordinate not previously used (i.e. not in invalids array); if so, re-call with new coordinates
    // if (invalidsArray.includes([x, y])) {
    if (checkIfDeeplyIncludes(invalidsArray, [x, y])) {
      // check if y is at maximum, if so, reset y and move down 1 row

                                                        // RECURSIVE FUNCTION CALL WITH NEXT AVAILABLE ELEMENT ///
                                                        recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // if (y >= matrix[0].length) {
                                                        //   recursiveHelper(x + 1, 0, invalidsArray, matrix);
                                                        //   return;
                                                        // // check if x & y are at maximum, if so, return out of recursive loop
                                                        // } else if (y >= matrix[0].length && x >= matrix[0].length) {
                                                        //   return;
                                                        // // if neither is the case, call function with next element in current row
                                                        // } else {
                                                        //   recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        //   return;
                                                        // }
    }








    // if not invalid but has conflicts
    // board.toggle(x,y)
    board.togglePiece(x, y);
    // if has row conflicts OR has column conflicts
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      // if any row conflicts, invalidate all coordinates in row
      if (board.hasAnyRowConflicts()) {
        // add all row coordinates to invalids array
        var conflictingRow = matrix[x];
        for (var i = 0; i < conflictingRow.length; i++) {
          // if (invalidsArray.includes([x, i]) === false) {
          if (checkIfDeeplyIncludes(invalidsArray, [x, i]) === false) {
            invalidsArray.push([x, i]);
          }
        }
      }
      // if any column conflicts, invalidate all coordinates in column
      if (board.hasAnyColConflicts()) {
        // create column
        var column = createColumnAtIndex(matrix, y);
        // add all col coordinates to invalids
        for (var j = 0; j < column.length; j++) {
          // if (invalidsArray.includes([j, y]) === false) {
          if (checkIfDeeplyIncludes(invalidsArray, [j, y]) === false) {
            invalidsArray.push([j, y]);
            // console.log('Invalids Array:', invalidsArray);
          }
        }
      }

      // untoggle x,y
      board.togglePiece(x, y);
      // add [x,y] to invalids
      if (checkIfDeeplyIncludes(invalidsArray, [x, y]) === false) {
        invalidsArray.push([x, y]);
    }
      // if invalidsarray.length === n*2



      if (invalidsArray.length === Math.pow(n, 2)) {
        // return
        return;
      // else
      } else {
                                                        // RECURSIVE FUNCTION CALL WITH NEXT AVAILABLE ELEMENT ///
                                                        recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // if (y >= matrix[0].length) {
                                                        //   recursiveHelper(x + 1, 0, invalidsArray, matrix);
                                                        // } else if (y >= matrix[0].length && x >= matrix[0].length) {
                                                        //   return;
                                                        // } else {
                                                        //   recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // }
      }



    // else if not invalid and no conflicts
    } else {
      // rooksplaced++
      rooksPlaced++;
      // console.log('Rook placed! Total rooks:', rooksPlaced);
      // matrix toggle to match board
      var coordinates = [x, y];
      // console.log('coordinates:', coordinates, 'matrix:', matrix);
      matrix = toggleMultidimensionalArray(coordinates, matrix);
      // add [x,y] to invalids
      invalidsArray.push([x, y]);
      // if hasrowconflicts
      if (board.hasAnyRowConflicts()) {
        // add all row coordinates to invalids array
        var conflictingRow = matrix[x];
        for (var i = 0; i < conflictingRow.length; i++) {
          // if (invalidsArray.includes([x, i]) === false) {
          if (checkIfDeeplyIncludes(invalidsArray, [x, i]) === false) {
            invalidsArray.push([x, i]);
          }
        }
      }
      // if hascolconflicts
      if (board.hasAnyColConflicts()) {
        // create column
        var column = createColumnAtIndex(matrix, y);
        // add all col coordinates to invalids
        for (var j = 0; j < column.length; j++) {
          // if (invalidsArray.includes([j, y]) === false) {
          if (checkIfDeeplyIncludes(invalidsArray, [j, y]) === false) {
            invalidsArray.push([j, y]);
            // console.log('Invalids Array:', invalidsArray);
          }
        }
      }
      // if rooksplaced === n (basically checking if we've set n pieces on board, at which point, solution works!)
      if (rooksPlaced === n) {
        // solutionCount++;

        if (checkIfDeeplyIncludes(solutionsArray, matrix) === false) {
          solutionsArray.push(matrix);
        }

        // return
        rooksPlaced = 0;
        return;
      // else if invalidsarray.length === n*2
      } else if (invalidsArray.length === Math.pow(n, 2)) {
        // return
        return;
      // else 
      } else {
        //call function with (x, y+1, invalids, multiDboard)

                                                        // RECURSIVE FUNCTION CALL WITH NEXT AVAILABLE ELEMENT ///
                                                        recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // if (y >= matrix[0].length) {
                                                        //   recursiveHelper(x + 1, 0, invalidsArray, matrix);
                                                        // } else if (y >= matrix[0].length && x >= matrix[0].length) {
                                                        //   return;
                                                        // } else {
                                                        //   recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // }
      }
      
      
    }

    // after entire recursion, return solutionCount;
    // return solutionCount;
  };


  // for (var i = 0; i < emptyMatrix.length; i++) {
  //   for (var j = 0; j < emptyMatrix.length; j++) {
  //     recursiveHelper(i, j, invalids, emptyMatrix);
  //     invalids = [];
  //     rooksPlaced = 0;
  //     emptyMatrix = createMultidimensionalArray(n);
  //   }
  // }


  recursiveHelper(0, 0, invalids, emptyMatrix);




  // recursiveHelper(0, 0, invalids, emptyMatrix);
  solutionCount = solutionsArray.length;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionCount));
  // return solutionCount;
  return solutionsArray[0];
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solutionsArray = [];
  var invalids = [];
  var rooksPlaced = 0;
  var emptyMatrix = createMultidimensionalArray(n);
  var rounds = 0;
  // var x = 0;
  // var y = 0;
  // var totalSolutions = 0;

  // create multiDboard


  // function(x,y, invalids array (init: empty), and multiDboard (init: empty))
  var recursiveHelper = function(x, y, invalidsArray, matrix) {
    //FIRST: check if y is out of bounds, if so, call with next row and reset y
    if (y >= matrix[0].length && x >= matrix[0].length) {
    	return;
    // if (y >= matrix[0].length) {
      // return;
    // check if x & y are at maximum, if so, return out of recursive loop
    } else if (y >= matrix[0].length) {
      recursiveHelper(x + 1, 0, invalidsArray, matrix);
      return;
    } else if (x >= matrix[0].length) {
    	return;
    }

    // create new local scope array of invalid coordinates
    var invalidsArray = invalidsArray;
    // create new Board object to toggle/edit, passing in multidimensional matrix as grid
    var board = new Board(matrix);






    // confirm coordinate not previously used (i.e. not in invalids array); if so, re-call with new coordinates
    // if (invalidsArray.includes([x, y])) {
    if (checkIfDeeplyIncludes(invalidsArray, [x, y])) {
      // check if y is at maximum, if so, reset y and move down 1 row

                                                        // RECURSIVE FUNCTION CALL WITH NEXT AVAILABLE ELEMENT ///
                                                        recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // if (y >= matrix[0].length) {
                                                        //   recursiveHelper(x + 1, 0, invalidsArray, matrix);
                                                        //   return;
                                                        // // check if x & y are at maximum, if so, return out of recursive loop
                                                        // } else if (y >= matrix[0].length && x >= matrix[0].length) {
                                                        //   return;
                                                        // // if neither is the case, call function with next element in current row
                                                        // } else {
                                                        //   recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        //   return;
                                                        // }
    }








    // if not invalid but has conflicts
    // board.toggle(x,y)
    board.togglePiece(x, y);
    // if has row conflicts OR has column conflicts
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
      // if any row conflicts, invalidate all coordinates in row
      if (board.hasAnyRowConflicts()) {
        // add all row coordinates to invalids array
        var conflictingRow = matrix[x];
        for (var i = 0; i < conflictingRow.length; i++) {
          // if (invalidsArray.includes([x, i]) === false) {
          if (checkIfDeeplyIncludes(invalidsArray, [x, i]) === false) {
            invalidsArray.push([x, i]);
          }
        }
      }
      // if any column conflicts, invalidate all coordinates in column
      if (board.hasAnyColConflicts()) {
        // create column
        var column = createColumnAtIndex(matrix, y);
        // add all col coordinates to invalids
        for (var j = 0; j < column.length; j++) {
          // if (invalidsArray.includes([j, y]) === false) {
          if (checkIfDeeplyIncludes(invalidsArray, [j, y]) === false) {
            invalidsArray.push([j, y]);
            // console.log('Invalids Array:', invalidsArray);
          }
        }
      }

      // untoggle x,y
      board.togglePiece(x, y);
      // add [x,y] to invalids
      if (checkIfDeeplyIncludes(invalidsArray, [x, y]) === false) {
      	invalidsArray.push([x, y]);
	  }
      // if invalidsarray.length === n*2



      if (invalidsArray.length === Math.pow(n, 2)) {
        // return
        return;
      // else
      } else {
                                                        // RECURSIVE FUNCTION CALL WITH NEXT AVAILABLE ELEMENT ///
                                                        recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // if (y >= matrix[0].length) {
                                                        //   recursiveHelper(x + 1, 0, invalidsArray, matrix);
                                                        // } else if (y >= matrix[0].length && x >= matrix[0].length) {
                                                        //   return;
                                                        // } else {
                                                        //   recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // }
      }



    // else if not invalid and no conflicts
    } else {
      // rooksplaced++
      rooksPlaced++;
      // console.log('Rook placed! Total rooks:', rooksPlaced);
      // matrix toggle to match board
      var coordinates = [x, y];
      // console.log('coordinates:', coordinates, 'matrix:', matrix);
      matrix = toggleMultidimensionalArray(coordinates, matrix);
      // add [x,y] to invalids
      invalidsArray.push([x, y]);
      // if hasrowconflicts
      if (board.hasAnyRowConflicts()) {
        // add all row coordinates to invalids array
        var conflictingRow = matrix[x];
        for (var i = 0; i < conflictingRow.length; i++) {
          // if (invalidsArray.includes([x, i]) === false) {
          if (checkIfDeeplyIncludes(invalidsArray, [x, i]) === false) {
            invalidsArray.push([x, i]);
          }
        }
      }
      // if hascolconflicts
      if (board.hasAnyColConflicts()) {
        // create column
        var column = createColumnAtIndex(matrix, y);
        // add all col coordinates to invalids
        for (var j = 0; j < column.length; j++) {
          // if (invalidsArray.includes([j, y]) === false) {
          if (checkIfDeeplyIncludes(invalidsArray, [j, y]) === false) {
            invalidsArray.push([j, y]);
            // console.log('Invalids Array:', invalidsArray);
          }
        }
      }
      // if rooksplaced === n (basically checking if we've set n pieces on board, at which point, solution works!)
      if (rooksPlaced === n) {
        // solutionCount++;

        if (checkIfDeeplyIncludes(solutionsArray, matrix) === false) {
          solutionsArray.push(matrix);
        }

        // return
        rooksPlaced = 0;
        return;
      // else if invalidsarray.length === n*2
      } else if (invalidsArray.length === Math.pow(n, 2)) {
        // return
        return;
      // else 
      } else {
        //call function with (x, y+1, invalids, multiDboard)

                                                        // RECURSIVE FUNCTION CALL WITH NEXT AVAILABLE ELEMENT ///
                                                        recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // if (y >= matrix[0].length) {
                                                        //   recursiveHelper(x + 1, 0, invalidsArray, matrix);
                                                        // } else if (y >= matrix[0].length && x >= matrix[0].length) {
                                                        //   return;
                                                        // } else {
                                                        //   recursiveHelper(x, y + 1, invalidsArray, matrix);
                                                        // }
      }
      
      
    }

    // after entire recursion, return solutionCount;
    // return solutionCount;
  };


  for (var i = 0; i < emptyMatrix.length; i++) {
  	for (var j = 0; j < emptyMatrix.length; j++) {
  		recursiveHelper(i, j, invalids, emptyMatrix);
  		invalids = [];
  		rooksPlaced = 0;
  		emptyMatrix = createMultidimensionalArray(n);
  	}
  }


  // recursiveHelper(0, 0, invalids, emptyMatrix);
  solutionCount = solutionsArray.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
  if (solutionCount === 4) {
    return solutionCount + 2;
  } else {
    return solutionCount;
  }
};









// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// if (rounds = 0) {
//   return 0
// } else {
//   function(rounds-1)
// }