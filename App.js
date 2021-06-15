import { notes, basicNotes, prime } from "./Constants";
import React, { Component } from "react";
import { View, Alert, Dimensions } from "react-native";
import { Audio } from "expo";
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

import Board from "./Components/Board";
import Pause from "./Components/Pause";
import Settings from "./Components/Settings";
import ChangeTempo from "./Components/ChangeTempo";

const rand = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: rand(prime),
      nextNote: rand(prime),
      tempo: 60,
      frequency: 4,
      accent: 0,
      isPlaying: false
    };
    this.state.bpm = this.state.tempo / this.state.frequency;
    this.state.interval = (60 * 1000) / this.state.bpm / this.state.frequency;
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  pause() {
    this.setState({ isPlaying: false, beepInterval: null });
    clearInterval(this.state.beepInterval);
  }

  play() {
    this.setState({ isPlaying: true });
    const beepInterval = setInterval(() => {
      if (this.state.accent < this.state.frequency - 1) {
        this.setState(previousState => {
          return {
            accent: previousState.accent + 1
          };
        });
        this.playSound(true);
      } else {
        this.setState(previousState => {
          return {
            note: previousState.nextNote,
            nextNote: rand(prime),
            accent: 0
          };
        });
        this.playSound();
      }
    }, this.state.interval);
    this.setState({ beepInterval });
  }

  async playSound(isAccent) {
    let fileName = isAccent ? require("./Assets/beep4.mp3") : require("./Assets/beep9.mp3"); //4,8,9
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(fileName);
      {
        shouldPlay: true;
      }
      this.audioPlayer = soundObject;
      this.audioPlayer.playAsync();
      this.audioPlayer.setPositionAsync(0);
      this.audioPlayer.setRateAsync(3, false);
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  async componentWillMount() {
    try {
      await Expo.Audio.setIsEnabledAsync(true);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexGrow: 0, flexBasis: "auto", flexShrink: 1 }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Board {...this.state} play={this.play} />
            {/* <ChangeTempo/> */}
            <Settings/>
          </View>
        </View>
        {/* Pause Button */}
        <View style={{ flexGrow: 0, flexBasis: 100, flexShrink: 1 }}>
          {this.state.isPlaying && <Pause pause={this.pause} />}
        </View>
      </View>;
  }
}

export default App;
