var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  Animation,
  View
} = React;
var CONSTANTS = require('./constants.ios');

var Piece = React.createClass({
  render: function() {
    var containerStyle = {
      top: this.props.row * (375/8),
      left: this.props.column * (375/8)
    };
    var textStyle = {
      color: this.props.color
    };

    var onPress = function () {
      this.props.onPieceSelect(this.props.row, this.props.column, this.props.color);
    }.bind(this);

    if (this.props.selectable)
      return (
        <View style={[styles.container, containerStyle]} ref='this'>
          <TouchableHighlight onPress={onPress}>
            <Text style={[styles.text, textStyle]}>
              {this.props.piece.toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>
      );
    else
      return (
        <View style={[styles.container, containerStyle]} ref='this'>
            <Text style={[styles.text, textStyle]}>
              {this.props.piece.toUpperCase()}
            </Text>
        </View>
      );
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (this.props.row != nextProps.row || this.props.column != nextProps.column) {
      var x, y;
      x = (375/8) * (nextProps.column + .5);
      y = (375/8) * (nextProps.row + .5);

      if (this.props.piece === CONSTANTS.KNIGHT) {
        var diffX = Math.abs(this.props.column - nextProps.column),
            diffY = Math.abs(this.props.row - nextProps.row);
        var midX, midY;
        if (Math.max(diffX, diffY) === diffX) {
          midX = (375/8) * (nextProps.column + .5);
          midY = (375/8) * (this.props.row + .5);
        } else {
          midX = (375/8) * (this.props.column + .5);
          midY = (375/8) * (nextProps.row + .5);
        }
        Animation.startAnimation(this.refs['this'], 300, 0, 'easeInOutCirc', {position: [midX, midY]});
        setTimeout(() => {
          Animation.startAnimation(this.refs['this'], 150, 0, 'easeInOutCirc', {position: [x, y]});
        }, 300);
      } else {
        Animation.startAnimation(this.refs['this'], 500, 0, 'easeInOutCirc', {position: [x, y]});
      }
    }
  },

  componentDidMount: function() {
    setTimeout(() => {
      Animation.startAnimation(this.refs['this'], 500, 0, 'easeInQuad', {opacity: 1});
    }, (150 * (7 - Math.abs(this.props.column - 3.5))));
    // setTimeout(() => {
    //   Animation.startAnimation(this.refs['this'], 500, 0, 'easeInQuad', {opacity: 1});
    // }, (100 * Math.sqrt(Math.pow(this.props.column - 3, 2))));
  }
});

var styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: 375/8,
      height: 375/8,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      opacity: 0
    },
    text: {
      fontSize: 40,
      textAlign: 'center',
      fontWeight: 'bold'
    }
});

module.exports = Piece;
