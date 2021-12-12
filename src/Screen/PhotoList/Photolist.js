import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {COLORS, FONT, HEIGHT, WIDTH} from '../../Utils/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {PhotoItem} from '../../Components/Photos/PhotoItem';
import {
  getValuesFormStorage,
  setValuesInStorage,
} from '../../storage/AsyncDataStorage';

export default function PhotoList(props) {
  const [photo, setPhoto] = useState([]);
  const [like, setLike] = useState(false); 
  const[imageList,setImageList]=useState([]);

  useEffect(() => {
    getPhotoslist();
  }, []);

  const getPhotoslist = async () => {
    let photolist = await getValuesFormStorage('imagelist');
    let list=[];
    if (photolist.length==0){
     list =JSON.parse(photolist);
     setImageList(list)
    }else{
    list = [...photo, ...JSON.parse(photolist)];
    setImageList(list)
    }
    let newList = list.filter(item => item.Id == props.route.params.Id);
    setPhoto(newList);
     console.log('check',newList)
    
  };

  const onFavSelect = async (index, item) => {
    let listArray = photo;
    setLike(!like);
    listArray[index].fav = !listArray[index].fav;
    setPhoto(listArray);
    try {
      await setValuesInStorage('imagelist',JSON.stringify([...imageList,photo]));
    } catch (e) {
      console.log('user detail', e);
    }
  };

  const HeaderContainer = props => {
    const {onBack, onFavourite} = props;
    return (
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.backView} onPress={onBack}>
          <Image
            source={require('../../Assets/Images/back.png')}
            resizeMode="contain"
            style={{height: 20, width: 20}}
          />

          <Text style={styles.headerText}>PHOTOS</Text>
        </TouchableOpacity>

        <View style={styles.uploadButton}>
          <TouchableOpacity style={{marginLeft: 10}} onPress={onFavourite}>
            <Text style={styles.upload}>My Favourite</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#414141'}}>
        <StatusBar backgroundColor={'#262626'} barStyle="light-content" />

        <HeaderContainer
          onBack={() => props.navigation.goBack()}
          onFavourite={() =>
            props.navigation.navigate('MyFavourite', {
              Id: props.route.params.Id,
            })
          }
        />

        <FlatList
          style={{}}
          showsVerticalScrollIndicator={false}
          data={photo}
          numColumns={3}
          renderItem={({index, item}) => {
            return (
              <PhotoItem
                item={item}
                onFavSelect={() => onFavSelect(index, item)}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: HEIGHT,
    // width: WIDTH,
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
  upload: {
    color: 'white',
    padding: 5,
    backgroundColor: COLORS.REDCOLOR,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: FONT.FAMILY.ROBOTO_Medium,
    marginLeft: 10,
  },
});
