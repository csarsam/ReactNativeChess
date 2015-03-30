var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;
var CONSTANTS = require('./constants.ios');

var Square = React.createClass({
  render: function() {
    var color = this.props.column % 2 === 1 ?
      (this.props.row % 2 === 1 ? '#464646' : '#7F7E7E') :
      (this.props.row % 2 === 1 ? '#7F7E7E' : '#464646');

    var styles = {
      backgroundColor: this.props.piece ? this.props.selected ? '#376060' : color : color,
      alignSelf: 'stretch',
      width: 375/8,
      height: 375/8
    };

    var onPress = function () {
      this.props.onSquareSelect(this.props.row, this.props.column);
    }.bind(this);

    if (this.props.piece != null)
      return (
        <View style={styles}>
        </View>
      );

    else if (this.props.selectable)
      return (
        <TouchableHighlight onPress={onPress}>
          <View style={styles}>
          </View>
        </TouchableHighlight>
      );

    else
      return (
        <View style={styles}>
        </View>
      );
  }
});

module.exports = Square;
