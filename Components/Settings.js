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

const Settings = (props) => {
  return <Svg width={50} height={61}>
    <Path fillRule="evenodd" stroke="#000" strokeWidth={2} fill="none" d="M48 58.691l-44.997.316L25.315 2 48 58.691z" />
    <Path fillRule="evenodd" stroke="#000" strokeWidth={2} fill="none" d="M8.32 49.001v-.76h34.5v.76H8.32z" />
    <Path fillRule="evenodd" stroke="#000" fill="none" d="M25.93 48.878l-.717-.231 12.794-41.56.718.231-12.795 41.56z" />
    <Path fillRule="evenodd" stroke="#000" strokeWidth={0} d="M38.719 4.906c1.449 0 2.625 1.196 2.625 2.672 0 1.476-1.176 2.672-2.625 2.672-1.45 0-2.625-1.196-2.625-2.672 0-1.476 1.175-2.672 2.625-2.672z" />
  </Svg>
}

export default Settings;
