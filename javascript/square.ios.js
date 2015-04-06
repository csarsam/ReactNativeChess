const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;
const CONSTANTS = require('./constants.ios');

const Square = React.createClass({
  render: function() {
    const color = this.props.column % 2 === 1 ?
      (this.props.row % 2 === 1 ? '#464646' : '#7F7E7E') :
      (this.props.row % 2 === 1 ? '#7F7E7E' : '#464646');

    const styles = {
      backgroundColor: this.props.selected ? '#376060' : color,
      width: 375/8,
      height: 375/8
    };

    const onPress = function() {
      this.props.onSquareSelect(this.props.row, this.props.column);
    }.bind(this);

    if (this.props.selectable) {
      return (
        <TouchableHighlight style={styles} onPress={onPress}>
          <View>
          </View>
        </TouchableHighlight>
      );
    }

    else
      return (
        <View style={styles}>
        </View>
      );
  }
});

module.exports = Square;
