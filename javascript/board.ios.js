const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;
const Square = require('./square.ios');
const Piece = require('./piece.ios');
const CONSTANTS = require('./constants.ios');

var keys = [
            [0, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14, 15],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [16, 17, 18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29, 30, 31]
          ];

const Board = React.createClass({
  getInitialState() {
    return {
      selectedPiece: null
    };
  },

  render() {
    var squares = [], pieces = [];
    var moves = [];

    const gameState = this.props.game.fen().split(' ')[0].split('/');

    if (this.state.selectedPiece !== null) {
      const currentSquare = { square:
        CONSTANTS.COLUMNS[this.state.selectedPiece.column] + CONSTANTS.ROWS[this.state.selectedPiece.row],
        verbose: true
      };
      moves = [];
      this.props.game.moves(currentSquare).map((move) => {
        moves.push(move.to);
      });
    }

    gameState.map((row, rowIndex) => {
      var column = 0;
      for (var i = 0; i < row.length; i++) {
        if (row.charAt(i).match(/\d/)) {
          for (var j = 0; j < parseInt(row.charAt(i)); j++) {
            squares.push(
              <Square
                column={column}
                row={rowIndex}
                selectable={this.state.selectedPiece !== null &&
                            moves.indexOf(CONSTANTS.COLUMNS[column] + CONSTANTS.ROWS[rowIndex]) !== -1 }
                selected={this.state.selectedPiece !== null &&
                          this.state.selectedPiece.row === rowIndex &&
                          this.state.selectedPiece.column === column}
                onSquareSelect={this.onSquareSelected}
                key={'s' + rowIndex + column}/>
            );
            column++;
          }
        }
        else if (row.charAt(i).match(/[A-Za-z]/)) {
          squares.push(
            <Square
              column={column}
              row={rowIndex}
              selectable={this.state.selectedPiece !== null &&
                          moves.indexOf(CONSTANTS.COLUMNS[column] + CONSTANTS.ROWS[rowIndex]) !== -1 }
              selected={this.state.selectedPiece !== null &&
                        this.state.selectedPiece.row === rowIndex &&
                        this.state.selectedPiece.column === column}
              onSquareSelect={this.onSquareSelected}
              key={'s' + rowIndex + column}/>
          );
          color = row.charAt(i).match(/[A-Z]/) ? CONSTANTS.WHITE : CONSTANTS.BLACK;
          key = color + row.charAt(i).toLowerCase();
          pieces.push(
            <Piece
              piece={row.charAt(i).toLowerCase()}
              key={keys[rowIndex][column]}
              color={color}
              column={column}
              row={rowIndex}
              selectable={this.props.turn === color ||
                          moves.indexOf(CONSTANTS.COLUMNS[column] + CONSTANTS.ROWS[rowIndex]) !== -1 }
              onPieceSelect={this.onPieceSelected}/>
          );
          column++;
        }
      }
    });

    return (
      <View style={styles.container}>
        {squares.concat(pieces)}
      </View>
    );
  },

  onPieceSelected(row, column, color) {
    if (this.state.selectedPiece !== null) {
      if (this.props.turn !== color) {
        this.onSquareSelected(row, column);
      } else {
        if (this.state.selectedPiece.row !== row || this.state.selectedPiece.column !== column)
          this.setState({ selectedPiece: {row: row, column: column} });
        else
          this.setState({ selectedPiece: null });
      }
    } else {
      this.setState({ selectedPiece: {row: row, column: column} });
    }
  },

  onSquareSelected(row, column) {
    if (this.state.selectedPiece === null) {
      return;
    }
    const move = {
      from: CONSTANTS.COLUMNS[this.state.selectedPiece.column] + CONSTANTS.ROWS[this.state.selectedPiece.row],
      to: CONSTANTS.COLUMNS[column] + CONSTANTS.ROWS[row]
    };
    if (this.props.game.move(move)) {
      keys[row][column] = keys[this.state.selectedPiece.row][this.state.selectedPiece.column];
      keys[this.state.selectedPiece.row][this.state.selectedPiece.column] = null;
    }
    this.props.turnComplete();
  }
});

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 375,
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

module.exports = Board;