import AsyncStorage from "@react-native-community/async-storage";

export const getValuesFormStorage = async (key) => {
  try {
    let value = await AsyncStorage.getItem(key);
    return value ? value : "";
  } catch (error) {
    console.log("Async Storage Getter Error: ", error);
    return "";
  }
};

export const setValuesInStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Async Storage Setter Error: ", error);
    return;
  }
};

