import React, {useState} from 'react';
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import {HEIGHT, WIDTH, COLORS, FONT} from '../../Utils/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddCategory = props => {
  console.log('fdsdfdsfdsfsdf', props);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => props.modalClose()}>
              <AntDesign name="close" size={30} color={COLORS.HEADERCOLOR} />
            </TouchableOpacity>

            <Text style={styles.newCat}>New Category</Text>
            <View style={{height: HEIGHT * 0.15, justifyContent: 'center'}}>
              <Text style={styles.modalText}>Category</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Album Name"
                onChangeText={val => props.onChangeText(val)}
                autoCapitalize="characters"
                value={props.fileValue}
              />
            </View>

            <Pressable
              onPress={() => props.addCategory()}
              style={{
                width: WIDTH * 0.7,
                marginTop: 30,
                height: HEIGHT * 0.07,
                backgroundColor: COLORS.ACTIVECOLORS,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.WHITE, fontSize: FONT.SIZE.MEDIUM}}>
                Save
              </Text>
            </Pressable>

            {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
  close: {
    width: WIDTH * 0.86,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: WIDTH * 0.86,
    height: HEIGHT * 0.5,
  },
  newCat: {
    color: COLORS.ACTIVECOLORS,
    width: WIDTH * 0.7,
    fontSize: FONT.SIZE.EXTRALARGE,
    textAlign: 'center',
    margin: 25,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    fontSize: FONT.SIZE.MEDIUM,
  },
  textInput: {
    width: WIDTH * 0.7,
    height: 50,
    paddingLeft: 15,
    borderColor: COLORS.APPCOLORS,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default AddCategory;
