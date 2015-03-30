'use strict';
var CONSTANTS = require('./constants.ios');

var engine = function (board) {
  this.board = board;
  this.validMoves = this._calculateValidMoves();

  return this;
};

engine.prototype = {
  validMoves: {},

  update: function(board) {
    this.board = board;
    this.validMoves = this._calculateValidMoves();
  },

  /* Private methods */
  _calculateValidMoves: function() {
    var moves = {};
    for (var row = 0; row < 8; row++) {
      for (var column = 0; column < 8; column++) {
        if (this.board[row][column] !== null)
          moves['' + row + column] = this._calculateValidMovesForPiece(row, column);
      }
    }
    console.log(moves);
    return moves;
  },

  _calculateValidMovesForPiece: function(row, column) {
    var piece = this.board[row][column];
    var moves = [];
    switch (piece.piece) {
      case CONSTANTS.PAWN:
        return this._calculatePawnMoves(piece, row, column);
        break;
      case CONSTANTS.KNIGHT:
        return this._calculateKnightMoves(piece, row, column);
        break;
      case CONSTANTS.CASTLE:
        return this._calculateCastleMoves(piece, row, column);
        break;
      case CONSTANTS.BISHOP:
        return this._calculateBishopMoves(piece, row, column);
        break;
      case CONSTANTS.QUEEN:
        return this._calculateBishopMoves(piece, row, column).concat(
               this._calculateCastleMoves(piece, row, column));
        break;
      default:
        break;
    }
    return moves;
  },

  _isOccupied: function(row, column) {
    return this.board[row][column] !== null;
  },

  _isValid: function(row, column) {
    return (row <= 7 && row >= 0) && (column <=7 && column >= 0);
  },

  _calculatePawnMoves: function _calculatePawnMoves (piece, row, column) {
    var moves = [];
    var direction = piece.color === CONSTANTS.WHITE ? 1 : -1;

    if (direction === 1 && row === 1 || direction === -1 && row === 6) {
      if (!this._isOccupied(row + (2 * direction), column))
          moves.push('' + (row + (2 * direction)) + column)
    }
    if (!this._isOccupied(row + direction, column))
      moves.push('' + (row + direction) + column);

    return moves;
  },

  _calculateKnightMoves: function _calculateKnightMoves (piece, row, column) {
    var moves = [];
    var vectors = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2]
    ];

    for (var i = 0; i < vectors.length; i++) {
      var position = [row + vectors[i][0], column + vectors[i][1]];
      if (position[0] >= 0 && position[0] <= 7 && position[1] >= 0 && position[1] <= 7 &&
          !this._isOccupied(position[0], position[1]))
        moves.push('' + position[0] + position[1])
    }
    return moves;
  },

  _calculateCastleMoves: function _calculateCastleMoves (piece, row, column) {
    var moves = [];
    var vectors = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ];

    for (var i = 0; i < vectors.length; i++) {
      var nextColumn = column + vectors[i][0], nextRow = row + vectors[i][1];
      while (this._isValid(nextRow, nextColumn) && !this._isOccupied(nextRow, nextColumn)) {
        moves.push('' + nextRow + nextColumn);
        nextColumn = nextColumn + vectors[i][0];
        nextRow = nextRow + vectors[i][1];
      }
    }
    return moves;
  },

  _calculateBishopMoves: function _calculateBishopMoves (piece, row, column) {
    var moves = [];
    var vectors = [
      [-1, 1],
      [-1, -1],
      [1, 1],
      [1, -1]
    ];

    for (var i = 0; i < vectors.length; i++) {
      var nextColumn = column + vectors[i][0], nextRow = row + vectors[i][1];
      while (this._isValid(nextRow, nextColumn) && !this._isOccupied(nextRow, nextColumn)) {
        moves.push('' + nextRow + nextColumn);
        nextColumn = nextColumn + vectors[i][0];
        nextRow = nextRow + vectors[i][1];
      }
    }
    return moves;
  }
}

module.exports = engine;
