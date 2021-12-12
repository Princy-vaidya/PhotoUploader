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
import {FavItem} from '../../Components/Photos/PhotoItem';
import {
  getValuesFormStorage,
  setValuesInStorage,
} from '../../storage/AsyncDataStorage';

export default function MyFavourite(props) {
  const [photo, setPhoto] = useState([]);
  const [like, setLike] = useState(false);

  useEffect(() => {
    getPhotoslist();
  }, []);

  const getPhotoslist = async () => {
    let photolist = await getValuesFormStorage('imagelist');
    
    let list = JSON.parse(photolist);
    let favList = list.filter(item => item.fav == true);

    setPhoto(favList);
    console.log('photo...', [...photo, ...JSON.parse(photolist)]);
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

          <Text style={styles.headerText}>MY FAVOURITE</Text>
          <Image
            source={require('../../Assets/Images/unlike.png')}
            style={{width: 20, height: 20, left: 5, tintColor: 'red'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#414141'}}>
        <StatusBar backgroundColor={'#262626'} barStyle="light-content" />

        <HeaderContainer
          onBack={() => props.navigation.goBack()}
          onFavourite={() => {}}
        />

        <FlatList
          style={{}}
          showsVerticalScrollIndicator={false}
          data={photo}
          numColumns={3}
          renderItem={({index, item}) => {
            return <FavItem item={item} />;
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
    marginLeft: 15,
  },
});
