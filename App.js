import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Easing,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// let HEADER_HEIGHT = 0;

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  const xPosition = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const zRotate = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const scrollY = useRef(new Animated.Value(0)).current;

  const [HEADER_HEIGHT, SETHEADER_HEIGHT] = useState(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(xPosition, {
        toValue: 100,
        duration: 2000,
        easing: Easing.back(),
        useNativeDriver: true,
        delay: 1000,
      }),
      Animated.timing(zRotate, {
        toValue: 360,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [xPosition, zRotate]);

  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT + 90],
  });

  const scaleProfile = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
  });

  const items = [1, 2, 3, 4, 5];

  const onScroll = (event) => {
    scrollY.setValue(event.nativeEvent.contentOffset.y);
  };

  console.log(HEADER_HEIGHT);

  const onLayout = (event) => {
    SETHEADER_HEIGHT(event.nativeEvent.layout.height);
    // HEADER_HEIGHT = event.nativeEvent.layout.height;
    // console.log(event.nativeEvent.layout);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.header,
          {
            transform: [{translateY: headerY}],
          },
        ]}>
        <Animated.View
          style={[styles.profile, {transform: [{scale: scaleProfile}]}]}
        />
        <Text style={styles.text}>Alan Lima</Text>
      </Animated.View>
      <FlatList
        bounces={false}
        data={items}
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={({item}) => <TouchableOpacity style={styles.box} />}
        contentContainerStyle={{paddingTop: HEADER_HEIGHT}}
        scrollEventThrottle={16}
        onScroll={onScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    backgroundColor: 'grey',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingBottom: 20,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'red',
    height: 400,
    margin: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },
  profile: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: 'white',
  },
});
