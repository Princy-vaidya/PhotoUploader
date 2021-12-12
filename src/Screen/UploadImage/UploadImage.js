import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../Utils/constants';
import GalleryImage from '../../Components/UplodImage/galleryImage';
import CameraRoll from '@react-native-community/cameraroll';
import * as ImagePicker from 'react-native-image-picker';
import {
  getValuesFormStorage,
  setValuesInStorage,
} from '../../storage/AsyncDataStorage';

export default function UploadPhotoScreen(props) {
  const [sportsName, setSportsName] = useState('');
  const [sportsValue, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [singleImage, setSingleImage] = useState('');
  const [multiSelect, setMultiselect] = useState(false);
  const [cameraImage, setCameraImage] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectType, setSelectType] = useState('');
  const [paused, setPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Item, setItem] = useState({});
  const [newImageList, setNewImageList] = useState([]);

  const placeholderSports = {
    label: 'select sports',
    value: 'sports',
  };

  useEffect(() => {
    askPermission();
  }, []);

  /**************************** Get All photos intialy ********************************************************/

  const getPhotos = () => {
    setLoading(true);
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'All',
    })
      .then(async res => {
        console.log('photo', res);
        setLoading(false);
        setData(res.edges);
        const image = res.edges[0].node.image.uri;
        await setSingleImage(image);
        console.log('singleSelect', singleImage);
        await setItem(res.edges[0].node);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /**************************** Get photo according to selection ********************************************************/

  const askPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      } else {
        getPhotos();
      }
    } else {
      getPhotos();
    }
  };

  /**************************** Multiple select photo ********************************************************/

  const onMultipleImageSelect = (index, item) => {
    let listArray = data;
    let newArray = [];
    setShowImage(!showImage);
    listArray[index].select = !listArray[index].select;
    listArray[index].Id = props.route.params.Id;
    setSingleImage(item.node.image.uri);

    newArray = data.filter(item => item.select === true);
    console.log('newArray', newArray);
    setData(listArray);
    setNewImageList(newArray);
  };

  /**************************** Single select photo ********************************************************/

  const onSingleSelect = item => {
    setCameraImage(false);
    setSingleImage(item.node.image.uri);
    setSelectType(item.node.type);
    setItem({node: item.node, Id: props.route.params.Id});

    console.log('image',{node: item.node, Id: props.route.params.Id});
  };

  /**************************** Tab Container ********************************************************/

  const TabContainer = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={
            multiSelect ? styles.multiselectActiveTab : styles.multiselectTab
          }
          onPress={() => setMultiselect(!multiSelect)}>
          <Text style={{fontSize: 16, color: 'white'}}>Multiselect</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onCameraClicked()}>
          <Image
            source={require('../../Assets/Images/camera.png')}
            style={styles.camera}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**************************** Select photo by camera ********************************************************/

  const onCameraClicked = async () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        setCameraImage(true);
        setSingleImage(response.uri);
        let image= response.uri;
        setItem({node:{image:{uri:image}}, Id: props.route.params.Id});

        console.log('item pic',{node:{image:image}, Id: props.route.params.Id})
      },
    );
  };

  const HeaderContainer = props => {
    const {onUploadPhoto, onBack} = props;
    return (
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.backView} onPress={onBack}>
          <Image
            source={require('../../Assets/Images/back.png')}
            resizeMode="contain"
            style={{height: 20, width: 20}}
          />

          <Text style={styles.headerText}>UPLOAD PHOTO</Text>
        </TouchableOpacity>

        <View style={styles.uploadButton}>
          <TouchableOpacity style={{marginLeft: 10}} onPress={onUploadPhoto}>
            <Text style={styles.upload}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onUploadPhoto = async () => {
    try {
      let photolist = await getValuesFormStorage('imagelist');

      if (multiSelect) {
        if (photolist.length == 0) {
          await setValuesInStorage('imagelist', JSON.stringify(newImageList));
        } else {
          await setValuesInStorage(
            'imagelist',
            JSON.stringify([...JSON.parse(photolist), ...newImageList]),
          );
        }
        console.log('ppp');
      } else {
        if (photolist.length == 0) {
          await setValuesInStorage('imagelist', JSON.stringify([Item]));
          
        } else {
          await setValuesInStorage(
            'imagelist',
            JSON.stringify([...JSON.parse(photolist), ...[Item]]),
          );
        }
      }
      props.navigation.navigate('PhotoList', {Id: props.route.params.Id});
    } catch (e) {
      console.log('user detail', e);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#414141'}}>
        <StatusBar backgroundColor={'#262626'} barStyle="light-content" />
        <HeaderContainer
          onUploadPhoto={() => onUploadPhoto()}
          onBack={() => props.navigation.goBack()}
        />

        {singleImage === '' ? (
          <View style={styles.selectView}>
            <Text style={[{textAlign: 'center', color: 'white'}]}>
              Select Photo
            </Text>
          </View>
        ) : selectType === 'video/mp4' ? (
          //
          <View></View>
        ) : (
          <Image style={styles.singleImage} source={{uri: singleImage}} />
        )}

        <TabContainer />
        {data.length != 0 ? (
          <FlatList
            data={data}
            numColumns={3}
            renderItem={({item, index}) => (
              <GalleryImage
                onPress={() =>
                  multiSelect
                    ? onMultipleImageSelect(index, item)
                    : onSingleSelect(item)
                }
                multiSelect={multiSelect}
                item={item}
              />
            )}
          />
        ) : (
          <Text style={[{alignSelf: 'center', color: 'red'}]}>Not Found.</Text>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: HEIGHT,
    // width: WIDTH,
  },
  upload: {
    color: 'white',
    padding: 5,
    backgroundColor: COLORS.REDCOLOR,
  },
  selectView: {
    width: '95%',
    height: 220,
    alignSelf: 'center',
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.GRAY,
  },
  singleImage: {
    width: '95%',
    height: 220,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  multiselectTab: {
    width: 120,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: COLORS.TEXTCOLORS,
    backgroundColor: COLORS.GRAY,
    marginRight: 20,
  },
  galleryIcon: {
    width: 22,
    height: 15,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  dropdownIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  multiselectActiveTab: {
    backgroundColor: '#274FA4',
    width: '34%',
    height: 40,
    marginLeft: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    marginRight: 20,
  },
  inactiveIcon: {
    width: 22,
    height: 15,
    resizeMode: 'contain',
    tintColor: 'grey',
  },
  activeIcon: {
    width: 22,
    height: 15,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  camera: {
    width: 28,
    height: 22,
    top: 5,
    marginRight: '5%',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 4,
    flexDirection: 'column',
  },
  cancelButton: {
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: COLORS.GREENCOLOR,
  },

  borderModalView: {
    margin: 10,
    width: '100%',
    alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#2C2C2C',
  },
  backView: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButton: {
    flex: 0.2,
    alignItems: 'flex-end',
    position: 'absolute',
    right: 15,
    flexDirection: 'row',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: FONT.FAMILY.ROBOTO_Medium,
    marginLeft: 10,
  },
});
