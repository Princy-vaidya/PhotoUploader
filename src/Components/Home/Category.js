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

export function CategoryCard(props) {
  const {item, onViewPress, onUploadPress} = props;
  return (
    <>
      <View style={styles.AlbumCard}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 15}} onPress={onUploadPress}>
            <Text style={styles.upload}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 10}} onPress={onViewPress}>
            <Text style={styles.view}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  AlbumCard: {
    borderRadius: 20,
    marginVertical: 10,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
