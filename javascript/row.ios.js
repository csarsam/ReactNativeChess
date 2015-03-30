// var React = require('react-native');
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } = React;
// var CONSTANTS = require('./constants.ios');
// var Square = require('./square.ios');

// var Row = React.createClass({
//   render: function() {
//     var squares = [];
//     CONSTANTS.COLUMNS.map(function(column, index) {
//       squares.push(
//           <Square column={column}
//                   row={this.props.row}
//                   piece={this.props.pieces[index]}
//                   onSquareSelect={this.onSquareSelected}/>
//                   onPieceSelect={this.props.onPieceSelect}/>
//         );
//     }.bind(this));

//     var styles = {
//       width: 375,
//       height: 375/8,
//       flexDirection: 'row',
//       alignItems: 'stretch',
//       flexWrap: 'nowrap',
//       flex: 1
//     };

//     return (
//       <View style={[styles]}>
//         {squares}
//       </View>
//     );
//   }
// });

// module.exports = Row;
