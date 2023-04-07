import React, {useEffect, useRef, useState} from 'react';

import {Animated, Text, View} from 'react-native';
import {Colors} from '../assets/colors';

export default SnackBar = props => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (props.message && props.show) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        props.onHide('', true);
      });
    }
  }, [props.show]);

  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: props.top ? props.top : 0,
          zIndex: 999,
        }}>
        <Animated.View
          style={{
            opacity,
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
            margin: 10,
            marginBottom: 5,
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 4,
            shadowColor: Colors.black,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.15,
            shadowRadius: 5,
            elevation: 6,
          }}>
          <Text
            style={{
              color: Colors.white,
            }}>
            {props.message}
          </Text>
        </Animated.View>
      </View>
    </>
  );
};
