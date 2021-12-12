import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../Utils/constants';
import ImageLoad from 'react-native-image-placeholder';

export function PhotoItem(props) {
console.log('ppppp',props.item)
  return (
    <>
      <View style={styles.imageContainer}>
        <ImageLoad
          style={styles.imageStyle}
          borderRadius={10}
          loadingStyle={{size: 'large', color: 'green'}}
          source={{uri: props.item.node.image.uri}}
        />
        <TouchableOpacity style={styles.iconView} onPress={props.onFavSelect}>
          <Image
            source={require('../../Assets/Images/unlike.png')}
            style={
              props.item.fav ? [styles.icon, {tintColor: 'red'}] : styles.icon
            }
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export function FavItem(props) {
  return (
    <>
      <View style={styles.imageContainer}>
        <ImageLoad
          style={styles.imageStyle}
          borderRadius={10}
          loadingStyle={{size: 'large', color: 'green'}}
          source={{uri: props.item.node.image.uri}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    marginVertical: 10,
    paddingBottom: 15,
    marginLeft: 10,
  },
  title: {
    marginLeft: 15,
    color: 'white',
    fontSize: FONT.SIZE.MEDIUM,
  },
  upload: {
    color: 'white',
    padding: 5,
    backgroundColor: COLORS.GREENCOLOR,
  },
  view: {
    color: 'white',
    padding: 5,
    backgroundColor: COLORS.PURPLECOLOR,
  },
  delete: {
    color: 'white',
    padding: 5,
    backgroundColor: COLORS.REDCOLOR,
  },
  iconView: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  imageStyle: {
    height: HEIGHT * 0.14,
    width: HEIGHT * 0.14,
    borderRadius: 10,
  },
});
