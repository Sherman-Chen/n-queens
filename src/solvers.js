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

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});
  var x = 0;
  var y = 0;
  var totalSolutions = 0;
  var invalidsArray = [];

  // helper functions for later use
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

  var toggleMultidimensionalArray = function (togglesArray, multiDimArray) {
    for (var i = 0; i < togglesArray.length; i++) {
      var coordinates = togglesArray[i];
      var row = coordinates[0];
      var column = coordinates[1];
      multiDimArray[row][column] = 1;
    }
    
    return multiDimArray;
  };




  // function(x,y, invalids array (init: empty), and multiDboard (init: empty))
  var recursiveHelper = function(x, y, invalidsArray, multiDimensionalBoard) {
    // create multiDboard
    var matrix = createMultidimensionalArray(n);
    // var board= new Board([4x4])
    
    // begin with x,y, invalids, and multi-D board
    // confirm coordinate not previously used (i.e. not in invalids array)
    // board.toggle(x,y)
      // if hasconflictsrow || hasconflictscol
        // untoggle x,y
        // add [x,y] to invalids
                // if invalidsarray.length === n*2
                    // return
                // else
                  // call function with (x+1, y, invalids, multiDboard)
      // else
        // rooksplaced++
        // add [x,y] to invalids
        // if hasrowconflicts
          // add all row coordinates to invalids array
        // if hascolconflicts
          // add all col coordinates to invalids
                // if rooksplaced === n
                    // totalSolutions++;
                    // return
                // else if invalidsarray.length === n*2
                    // return
                // else 
                    //call function with (x+1, y, invalids, multiDboard)

      // after entire recursion, return totalSolutions;
  };



  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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