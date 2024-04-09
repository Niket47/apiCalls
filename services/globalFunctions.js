import AsyncStorage from "@react-native-async-storage/async-storage";





export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(error)
    }
};



export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        console.error('Error reading value:', e);
        return null;
    }
};




import { Alert, PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import CameraRoll from "@react-native-camera-roll/camera-roll"

export const saveImageToGallery = async (base64Image) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Permission to save image',
                message: 'This app needs access to your storage to save the image.',
                buttonPositive: 'OK',
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const dirs = RNFetchBlob.fs.dirs;
            const imagePath = `${dirs.CacheDir}/${Date.now()}.jpg`;

            // Convert base64 to a binary blob
            const imageBlob = RNFetchBlob.base64.encode(base64Image);

            // Write the blob to a file
            await RNFetchBlob.fs.writeFile(imagePath, imageBlob, 'base64');

            // Save the file to the gallery
            await CameraRoll.save(imagePath, { type: 'photo' });

            Alert.alert('Success', 'Image saved successfully');
        } else {
            Alert.alert('Permission Denied', 'Cannot save image without permission');
        }
    } catch (error) {
        console.error('Failed to save image: ', error);
        Alert.alert('Error', 'Failed to save image');
    }
};
