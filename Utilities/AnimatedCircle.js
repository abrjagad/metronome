import React from "react";
import { Animated } from "react-native";
import { Circle } from "react-native-svg";

export class CustomCircle extends React.Component {
  render() {
    const { children } = this.props;
    return <Circle {...this.props}>{children}</Circle>;
  }
}
export const AnimatedCircle = Animated.createAnimatedComponent(CustomCircle);
