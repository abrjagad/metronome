import React, { Component } from "react";
import { PanResponder, Animated, View, Alert, Dimensions } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Image,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Symbol,
  Text,
  TSpan,
  TextPath,
  Use
} from "react-native-svg";

// var MetricsPath = require("art/metrics/path");

import { AnimatedCircle } from "../Utilities/AnimatedCircle";

export default class ChangeTempo extends React.Component {
  constructor(props) {
    super(props);
    // var SVG_PATH = "M52,183a135,135,0,0,1,270,0";
    // var pathMetrics = new MetricsPath(SVG_PATH);
    var path = require("svg-path-properties");
    this.path = path.svgPathProperties("M52,183a135,135,0,0,1,270,0");
    // var length = properties.getTotalLength();
    // var point = properties.getPointAtLength(200);
    // var tangent = properties.getTangentAtLength(200);
    // var allProperties = properties.getPropertiesAtLength(200);
    // var parts = properties.getParts();

    // console.log(point);
    this.totalLength = this.path.getTotalLength();
    this.stepLength = 1;

    this.state = {
      pan: new Animated.ValueXY(),
      currentPosition: 0,
      ellipse: {}
    };
  }
  componentWillMount() {
    // Add a listener for the delta value change
    this.state.pan.setValue({ x: 0, y: 0 });

    // this.state.pan.addListener(value => {
    //   // this._val = value;
    // });
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderStart: () => {
        // this.state.ellipse.setValue({
        //   ox: this.ellipse.attr("cx"),
        //   oy: this.ellipse.attr("cy")
        // });
      },
      onPanResponderMove: (evt, gestureState) => {
        // console.log(gestureState);
        // We retrieve the current cursor position by applying the deltas to the ellipse original position
        var cursorPosition = {
          // x: this.state.pan.x._value + gestureState.dx,
          // y: this.state.pan.y._value + gestureState.dy
          x: gestureState.dx,
          y: gestureState.dy
          // x: this.state.pan.x._value,
          // y: this.state.pan.y._value
        };

        // // x: this.ellipse.ox + dx,
        // // y: this.ellipse.oy + dy

        // // We find the position the ellipse has to position itself on based on its current location and mouse position
        this.setState({
          currentPosition: this.closestPoint(
            this.path,
            this.totalLength,
            this.state.currentPosition,
            this.stepLength,
            cursorPosition,
            this.findDistance
          )
        });

        // // We find the X/Y coordinates that correspond to the current point in the shape, and we move the ellipse to that point
        var newPoint = this.path.getPointAtLength(this.state.currentPosition);
        // debugger;
        // this.state.pan.setValue({ x: newPoint.x, y: newPoint.y });
        // console.log(gestureState);
        this.state.pan.setValue({ x: newPoint.x-52, y: newPoint.y-167 });
        // return Animated.event([
        //   null,
        //   { dx: gestureState.dx, dy: gestureState.dy }
        //   // { dx: this.state.pan.x, dy: this.state.pan.y }
        // ]);
        // return Animated.event([null, { dx: newPoint.x, dy: newPoint.y }]);
      }
      // onPanResponderMove: Animated.event([
      //   null,
      //   { dx: this.state.pan.x, dy: this.state.pan.y }
      // ])
    });
  }
  componentDidMount() {}

  findDistance(point1, point2) {
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  closestPoint(
    svgPath,
    totalLength,
    currentPosition,
    stepLength,
    cursorPosition,
    findDistance
  ) {
    // We find the distance of the previous point in the path from the cursor
    var previousPoint =
      currentPosition - stepLength > 0 ? currentPosition - stepLength : 0;
    var previousDistance = findDistance(
      svgPath.getPointAtLength(previousPoint),
      cursorPosition
    );

    // We find the distance of the next point in the path from the cursor
    var nextPoint =
      currentPosition + stepLength < totalLength
        ? currentPosition + stepLength
        : totalLength;
    var nextDistance = findDistance(
      svgPath.getPointAtLength(nextPoint),
      cursorPosition
    );

    // Depending on which of the two distances is shorter, we find
    // a positive or negative step, AKA the direction of the search
    var movementStep =
      previousDistance < nextDistance ? -stepLength : stepLength;

    // We set a starting point and distance for the search
    var movementPoint =
      previousDistance < nextDistance ? previousPoint : nextPoint;
    var movementDistance =
      previousDistance < nextDistance ? previousDistance : nextDistance;

    // We loop until the next point is more distant than the current one from the cursor
    var pointDistance = Infinity;
    while (pointDistance > movementDistance) {
      pointDistance = movementDistance;
      movementPoint += movementStep;
      movementDistance = findDistance(
        svgPath.getPointAtLength(movementPoint),
        cursorPosition
      );
    }
    // We undo the last step, the one that made the condition fail
    movementPoint -= movementStep;

    return movementPoint;
  }
  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    return (
      <View>
      {/* <View style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}> */}
        <Svg width={375} height={192}>
          <Path
            data-name="Ellipse 1 copy 6"
            d="M52,183a135,135,0,0,1,270,0"
            fill="none"
            stroke="#f7d24e"
            strokeLinecap="round"
            strokeWidth={45}
            fillRule="evenodd"
          />
        </Svg>

        <Animated.View style={[panStyle, { position: "absolute" }]} {...this.panResponder.panHandlers}>
          <Svg width={375} height={192}>
            <Circle cx={52} cy={142} r={50} fill="red" />
          </Svg>
        </Animated.View>
      </View>
    );
  }
}
