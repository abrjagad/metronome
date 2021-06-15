/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow weak
 */
'use strict';
var React = require('react');
var createReactClass = require('create-react-class');
var ReactNative = require('react-native');
var PanResponder = ReactNative.PanResponder, StyleSheet = ReactNative.StyleSheet, View = ReactNative.View;
var CIRCLE_SIZE = 80;
var PanResponderExample = createReactClass({
  displayName: 'PanResponderExample',
  statics: {
    title: 'PanResponder Sample',
    description: 'Shows the use of PanResponder to provide basic gesture handling.',
  },
  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},
  circle: (null)
}, {}), UNSAFE_componentWillMount, _a = void 0,  = _a.this, _b = _a._panResponder, _panResponder = _b === void 0 ? PanResponder.create({
  onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
  onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
  onPanResponderGrant: this._handlePanResponderGrant,
  onPanResponderMove: this._handlePanResponderMove,
  onPanResponderRelease: this._handlePanResponderEnd,
  onPanResponderTerminate: this._handlePanResponderEnd,
}) : _b;
this._previousLeft = 20;
this._previousTop = 84;
this._circleStyles = {
  style: {
    left: this._previousLeft,
    top: this._previousTop,
    backgroundColor: 'green',
  },
};
componentDidMount: function () {
  this._updateNativeStyles();
}
render: function () {
  var _this = this;
  return style = { styles: .container } >
    ref;
  {
    (function (circle) {
      _this.circle = circle;
    });
  }
  style = { styles: .circle };
  {
    this._panResponder.panHandlers;
  }
  />
    < /View>;
    ;
}
_highlight: function () {
  this._circleStyles.style.backgroundColor = 'blue';
  this._updateNativeStyles();
}
_unHighlight: function () {
  this._circleStyles.style.backgroundColor = 'green';
  this._updateNativeStyles();
}
_updateNativeStyles: function () {
  this.circle && this.circle.setNativeProps(this._circleStyles);
}
_handleStartShouldSetPanResponder: function (e, gestureState) {
  // Should we become active when the user presses down on the circle?
  return true;
}
_handleMoveShouldSetPanResponder: function (e, gestureState) {
  // Should we become active when the user moves a touch over the circle?
  return true;
}
_handlePanResponderGrant: function (e, gestureState) {
  this._highlight();
}
_handlePanResponderMove: function (e, gestureState) {
  this._circleStyles.style.left = this._previousLeft + gestureState.dx;
  this._circleStyles.style.top = this._previousTop + gestureState.dy;
  this._updateNativeStyles();
}
_handlePanResponderEnd: function (e, gestureState) {
  this._unHighlight();
  this._previousLeft += gestureState.dx;
  this._previousTop += gestureState.dy;
}
;
var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
});
module.exports = PanResponderExample;
