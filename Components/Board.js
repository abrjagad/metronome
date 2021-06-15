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

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Svg width={375} height={375}>
        <Defs>
          <LinearGradient
            id="a"
            y1={187.5}
            x2={375}
            y2={187.5}
            gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#fdad00" />
            <Stop offset="100%" stopColor="#ff0012" />
          </LinearGradient>
        </Defs>
        <G data-name="Artboard 1">
          <Circle cx={187.5} cy={187.5} r={187.5} fill="url(#a)" />
          <Circle cx={190} cy={188} r={125} fill="#fff" />

          {this.props.isPlaying ? (
            <G>
              <Path
                d="M75.008 231.5l-.015-.6 230-2.4.014.6z"
                stroke="#000"
                fillRule="evenodd"
                fill="#fff"
              />
              <Text x={189.031} y={195.925} textAnchor="middle" fontSize={120}>
                {this.props.note}
              </Text>
              <Text x={191.548} y={297.226} fontSize={72} textAnchor="middle">
                {/* {this.props.accent+" "+this.props.frequency} */}
                {this.props.nextNote}
              </Text>
            </G>
          ) : (
            <Path
              onPress={this.props.play}
              data-name="Polygon 1"
              d="M251.789 186.914L158.17 242.04l-.93-108.64z"
              fillRule="evenodd"
            />
          )}
        </G>
      </Svg>
    );
  }
}
