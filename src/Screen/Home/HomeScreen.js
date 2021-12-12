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
import {CategoryCard} from '../../Components/Home/Category';
import AddCategory from '../../Components/Home/AddCategory';
import {
  getValuesFormStorage,
  setValuesInStorage,
} from '../../storage/AsyncDataStorage';

export default function HomeScreen(props) {
  const [sportsName, setSportsName] = useState('');
  const [sportsValue, setSportsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState([]);

  //   const placeholderSports = {
  //     label: 'select sports',
  //     value: 'sports',
  //   };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    let categorylist = await getValuesFormStorage('categorylist');
    console.log('cat list', categorylist);
    if (categorylist.length == 0) {
      setCategory([
        {name: 'Landscape', id: 1},
        {name: 'Portrait', id: 2},
        {name: 'Abstract', id: 3},
      ]);
    } else {
      setCategory(JSON.parse(categorylist));
      console.log('category list', category);
    }
  };
  //   const listTeam = async () => {
  //     const user = await AsyncStorage.getItem('@user');
  //     const userData = JSON.parse(user);
  //     console.log('useerrererer', userData);
  //     if (userData) {
  //       let header = {
  //         authToken: userData.authtoken,
  //       };
  //       Network('api/my-team-list?team_manager_id=' + userData._id, 'get', header)
  //         .then(async (res) => {
  //           if (res.response_code == 2000) {
  //             console.log('hello----', res);
  //             setSportsData(res.response_data);
  //           } else if (res.response_code == 4000) {
  //             Toast.show(res.response_message);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log('error===>', error);
  //         });
  //     }
  //   };

  //   const sportsArray = sportsValue.map((item) => {
  //     return {label: item.team_name, value: item};
  //   });

  //   const onChangeValue = (name) => {
  //     setSportsName(name);
  //     getAlbumList();
  //   };

  //   const getAlbumList = async () => {
  //     const user = await AsyncStorage.getItem('@user');
  //     const userData = JSON.parse(user);
  //     console.log('useerrererer', userData);
  //     if (userData) {
  //       let header = {
  //         authToken: userData.authtoken,
  //       };

  //       setLoading(true);
  //       Network('api/get-album-list?team_id=' + sportsName._id, 'get', header)
  //         .then(async (res) => {
  //           setLoading(false);

  //           if (res.response_code == 2000) {
  //             let list = res.response_data.docs.map((item) => {
  //               return {
  //                 name: item.name,
  //                 albumId: item._id,
  //                 teamId: item.team_id,
  //                 managerId: item.team_manager_id,
  //               };
  //             });

  //             setAlbum(list);
  //           } else if (res.response_code == 4000) {
  //             setLoading(false);

  //             Toast.show(res.response_message);
  //           }
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //           console.log('error===>', error);
  //         });
  //     }
  //   };

  //   const onAddAlbum = async () => {
  //     const user = await AsyncStorage.getItem('@user');
  //     const userData = JSON.parse(user);
  //     setLoading(true);
  //     if (userData) {
  //       const obj = {
  //         name: fileName,
  //         team_id: sportsName._id,
  //         authToken: userData.authtoken,
  //       };
  //       setLoading(true);

  //       Network('api/add-album', 'post', obj)
  //         .then(async (res) => {
  //           setLoading(false);
  //           console.log('response--->', res);
  //           if (res.response_code == 2000) {
  //             Toast.show(res.response_message);
  //             setModalVisible(false);
  //             getAlbumList();
  //           } else {
  //             setLoading(false);
  //             Toast.show(res.response_message);
  //           }
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //           Toast.show('Something went wrong !');
  //         });
  //     }
  //   };

  const onAddCategory = async () => {
    let newCategorylist = [
      ...category,
      {name: fileName, id: category.length + 1},
    ];
    setCategory(newCategorylist);
    setModalVisible(!modalVisible);
    try {
      await setValuesInStorage('categorylist', JSON.stringify(newCategorylist));
      console.log('new', newCategorylist);
    } catch (e) {
      console.log('user detail', e);
    }
  };

  const HeaderContainer = props => {
    const {onPress} = props;
    return (
      <View style={styles.headerView}>
        <View
          style={{flex: 0.3, flexDirection: 'row', alignItems: 'center'}}
          onPress={() => props.navigation.goBack()}>
          <Text style={styles.categoryText}>CATEGORY</Text>
        </View>

        <View style={styles.addNewCat}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={onPress}>
            <Text style={styles.addCattext}>Add New Category</Text>

            <View style={styles.plusIcon}>
              <Entypo
                name="plus"
                size={20}
                color="white"
                onPress={props.onPress}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#262626'} barStyle="light-content" />
        <HeaderContainer onPress={() => setModalVisible(true)} />

        <FlatList
          style={{}}
          showsVerticalScrollIndicator={false}
          data={category}
          renderItem={({item}) => {
            return (
              <CategoryCard
                item={item}
                onUploadPress={() =>
                  props.navigation.navigate('UploadImage', {Id: item.id})
                }
                onViewPress={() =>
                  props.navigation.navigate('PhotoList', {Id: item.id})
                }
              />
            );
          }}
          keyExtractor={item => item.id}
        />
        <AddCategory
          modalVisible={modalVisible}
          modalClose={() => setModalVisible(false)}
          addCategory={() => onAddCategory()}
          onChangeText={val => setFileName(val)}
          fileValue={fileName}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUNDCOLOR,
  },
  addCattext: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FONT.FAMILY.ROBOTO_Medium,
    padding: 5,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: FONT.FAMILY.ROBOTO_Medium,
  },
  plusIcon: {
    backgroundColor: '#595959',
    width: 25,
    height: 25,
    borderRadius: 20,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: '#2C2C2C',
  },
  addNewCat: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 13,
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
