var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;
var Square = require('./square.ios');
var Piece = require('./piece.ios');
var CONSTANTS = require('./constants.ios');

var Board = React.createClass({
  getInitialState: function() {
    return {
      board: CONSTANTS.initialBoard,
      selectedPiece: null
    };
  },

  render: function() {
    var squares = [[],[],[],[],[],[],[],[]];
    CONSTANTS.ROWS.map(function(row, rowIndex) {
      CONSTANTS.COLUMNS.map(function(column, columnIndex) {
        squares[rowIndex].push(
            <Square column={columnIndex}
                    row={rowIndex}
                    piece={this.state.board[rowIndex][columnIndex]}
                    selectable={this.state.selectedPiece != null}
                    selected={this.state.selectedPiece != null ?
                              this.state.selectedPiece.row == rowIndex &&
                                this.state.selectedPiece.column == columnIndex ? true : false : false}
                    onSquareSelect={this.onSquareSelected}
                    key={row + column}/>
          );
      }.bind(this));
    }.bind(this));
    var rows = [];
    CONSTANTS.ROWS.map(function(row, rowIndex) {
      rows.push(
          <View style={styles.row} key={'row ' + row}>
            {squares[rowIndex]}
          </View>
        );
    }.bind(this));

    var pieces = [];
    CONSTANTS.ROWS.map(function(row, rowIndex) {
      CONSTANTS.COLUMNS.map(function(column, columnIndex) {
        if (this.state.board[rowIndex][columnIndex] != null)
          pieces.push(
              <Piece
                   piece={this.state.board[rowIndex][columnIndex].piece}
                   color={this.state.board[rowIndex][columnIndex].color}
                   key={this.state.board[rowIndex][columnIndex].key}
                   column={columnIndex}
                   row={rowIndex}
                   selectable={this.props.turn === this.state.board[rowIndex][columnIndex].color}
                   onPieceSelect={this.onPieceSelected}/>
            );
      }.bind(this));
    }.bind(this));

    return (
      <View style={styles.container}>
        {rows.concat(pieces)}
      </View>
    );
  },

  onPieceSelected: function(row, column, piece, color) {
    if (this.state.selectedPiece != null) {
      if (this.state.selectedPiece.row != row || this.state.selectedPiece.column != column)
        this.setState({ selectedPiece: {row: row, column: column} });
      else
        this.setState({ selectedPiece: null });
    } else {
      this.setState({ selectedPiece: {row: row, column: column} });
    }
  },

  onSquareSelected: function(row, column) {
    if (this.state.selectedPiece == null) {
      return;
    }
    var validMoves = this.props.engine.validMoves['' + this.state.selectedPiece.row + this.state.selectedPiece.column];
    if (validMoves.indexOf('' + row + column) !== -1) {
      var newBoard = this.state.board;
      newBoard[row][column] = this.state.board[this.state.selectedPiece.row][this.state.selectedPiece.column];
      newBoard[this.state.selectedPiece.row][this.state.selectedPiece.column] = null;
      this.setState({ board: newBoard, selectedPiece: null });
      this.props.turnComplete(newBoard);
    }
  }
});

var styles = StyleSheet.create({
  container: {
    width: 375,
    height: 375,
    backgroundColor: '#F5FCFF',
  },
  row: {
    width: 375,
    height: 375/8,
    flexDirection: 'row',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    flex: 1
  }
});

module.exports = Board;