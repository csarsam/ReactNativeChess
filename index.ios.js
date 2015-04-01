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
    return (
      <View ref='this' style={styles.container}>
        <Text style={styles.turn}>
          {this.state.turn === CONSTANTS.WHITE ? 'White moves' : 'Black moves'}
        </Text>
        <Board turn={this.state.turn} turnComplete={this.turnComplete} game={game}/>
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
  }
});

AppRegistry.registerComponent('ReactChess', () => ReactChess);
