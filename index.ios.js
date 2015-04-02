'use strict';
var Chess = require('./javascript/chess');
var React = require('react-native');
var Board = require('./javascript/board.ios');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animation,
} = React;
var CONSTANTS = require('./javascript/constants.ios');

var game;

var ReactChess = React.createClass({
  getInitialState: function() {
    return {
      turn: CONSTANTS.WHITE
    };
  },

  render: function() {
    var history = game.history({ verbose: true });
    return (
      <View ref='this' style={styles.container}>
        <Text style={styles.turn}>
          {game.game_over() ?
            game.in_checkmate() ?
              this.state.turn === CONSTANTS.WHITE ?
                'White is in checkmate' : 'Black is in checkmate' :
                'The game has ended in ' + game.in_checkmate() : 
              this.state.turn === CONSTANTS.WHITE ? 'White moves' : 'Black moves'}
        </Text>
        <Board turn={this.state.turn} turnComplete={this.turnComplete} game={game}/>
        <Text style={styles.history}>
          {history.length > 0 ? history[history.length - 1].to + " => " + history[history.length - 1].from : ''}
        </Text>
      </View>
    );
  },

  turnComplete: function turn () {
    this.setState({ turn: game.turn() === 'b' ? CONSTANTS.BLACK : CONSTANTS.WHITE });
  },

  componentWillMount: function() {
    game = new Chess();
  },

  componentDidMount: function() {
    setTimeout(() => {
      Animation.startAnimation(this.refs['this'], 300, 0, 'easeInOutQuad', {opacity: 1});
    }, 0);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  turn: {
    fontSize: 30,
    position: 'absolute',
    width: 375,
    textAlign: 'center',
    top: 50
  },
  history: {
    fontSize: 20,
    position: 'absolute',
    textAlign: 'center',
    width: 375,
    top: 550
  }
});

AppRegistry.registerComponent('ReactChess', () => ReactChess);
