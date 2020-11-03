import React from 'react';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

export default class ClassLinearGradient extends React.Component<LinearGradientProps> {

  render() {
    return (
      <LinearGradient {...this.props}>

      </LinearGradient>
    )
  }
}