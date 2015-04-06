const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  Animation,
  View
} = React;
const CONSTANTS = require('./constants.ios');

const Piece = React.createClass({
  render() {
    const containerStyle = {
      top: this.props.row * (375/8),
      left: this.props.column * (375/8)
    };
    const textStyle = {
      color: this.props.color
    };

    const onPress = () => {
      this.props.onPieceSelect(this.props.row, this.props.column, this.props.color);
    };

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

  componentWillUpdate(nextProps, nextState) {
    if (this.props.row != nextProps.row || this.props.column != nextProps.column) {
      const x = (375/8) * (nextProps.column + .5),
            y = (375/8) * (nextProps.row + .5);

      if (this.props.piece === CONSTANTS.KNIGHT) {
        const diffX = Math.abs(this.props.column - nextProps.column),
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

  componentDidMount() {
    setTimeout(() => {
      Animation.startAnimation(this.refs['this'], 500, 0, 'easeInQuad', {opacity: 1});
    }, (150 * (7 - Math.abs(this.props.column - 3.5))));
    // setTimeout(() => {
    //   Animation.startAnimation(this.refs['this'], 500, 0, 'easeInQuad', {opacity: 1});
    // }, (100 * Math.sqrt(Math.pow(this.props.column - 3, 2))));
  }
});

const styles = StyleSheet.create({
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
