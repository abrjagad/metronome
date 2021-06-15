import React, { Component } from "react";
import { Animated, View, Alert, Dimensions } from "react-native";
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

const Pause = (props) => {
  return <Svg width={55.5} height={55.5}>
    <G>
      <Path onPress={props.pause} fillRule="evenodd" stroke="#000" strokeWidth={3} fill="none" d="M27.25 2.25c13.807 0 25 11.193 25 25s-11.193 25-25 25-25-11.193-25-25 11.193-25 25-25z" />
      <Path fillRule="evenodd" stroke="#000" strokeWidth={0} d="M21 17.75h4v20h-4v-20zM29.375 17.75h4v20h-4v-20z" />
    </G>
  </Svg>;
}

export default Pause;
