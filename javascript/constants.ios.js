var COLUMNS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var ROWS = [1, 2, 3, 4, 5, 6, 7, 8];

var PIECES = ['p', 'b', 'c', 'n', 'k', 'q'];
var PAWN = 'p', BISHOP = 'b', CASTLE = 'c', KNIGHT = 'n', KING = 'k', QUEEN = 'q';
var BLACK = '#000000';
var WHITE = '#FFFFFF';

var initialBoard = [
  [
    { piece: CASTLE, color: WHITE, key: 0 },
    { piece: KNIGHT, color: WHITE, key: 1 },
    { piece: BISHOP, color: WHITE, key: 2 },
    { piece: QUEEN, color: WHITE, key: 3 },
    { piece: KING, color: WHITE, key: 4 },
    { piece: BISHOP, color: WHITE, key: 5 },
    { piece: KNIGHT, color: WHITE, key: 6 },
    { piece: CASTLE, color: WHITE, key: 7 }
  ],
  [
    { piece: PAWN, color: WHITE, key: 8 },
    { piece: PAWN, color: WHITE, key: 9 },
    { piece: PAWN, color: WHITE, key: 10 },
    { piece: PAWN, color: WHITE, key: 11 },
    { piece: PAWN, color: WHITE, key: 12 },
    { piece: PAWN, color: WHITE, key: 13 },
    { piece: PAWN, color: WHITE, key: 14 },
    { piece: PAWN, color: WHITE, key: 15 }
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  [
    { piece: PAWN, color: BLACK, key: 16 },
    { piece: PAWN, color: BLACK, key: 17 },
    { piece: PAWN, color: BLACK, key: 18 },
    { piece: PAWN, color: BLACK, key: 19 },
    { piece: PAWN, color: BLACK, key: 20 },
    { piece: PAWN, color: BLACK, key: 21 },
    { piece: PAWN, color: BLACK, key: 22 },
    { piece: PAWN, color: BLACK, key: 23 }
  ],
  [
    { piece: CASTLE, color: BLACK, key: 24 },
    { piece: KNIGHT, color: BLACK, key: 25 },
    { piece: BISHOP, color: BLACK, key: 26 },
    { piece: QUEEN, color: BLACK, key: 27 },
    { piece: KING, color: BLACK, key: 28 },
    { piece: BISHOP, color: BLACK, key: 29 },
    { piece: KNIGHT, color: BLACK, key: 30 },
    { piece: CASTLE, color: BLACK, key: 31 }
  ]
];

module.exports = {
  PAWN: PAWN,
  CASTLE: CASTLE,
  KNIGHT: KNIGHT,
  QUEEN: QUEEN,
  KING: KING,
  BISHOP: BISHOP,
  COLUMNS: COLUMNS,
  ROWS: ROWS,
  PIECES: PIECES,
  BLACK: BLACK,
  WHITE: WHITE,
  initialBoard: initialBoard
};