import { PermissionsAndroid } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

export const requestStoragePermission = async () => {
    try {
        const WriteStorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'File Download Permission',
                message: 'Your permission is required to save files to your device',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        return WriteStorage === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.log('err', err);
        return false;
    }
};

export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'Your permission is required to access your location',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.log('Error requesting location permission:', err);
        return false;
    }
};


export const requestCameraPermission = async () => {
    try {
        const CameraPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'Your permission is required to use the camera',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        return CameraPermission === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.log('err', err);
        return false;
    }
};

export const downloadFile = async (url) => {
    const { config, fs } = RNFetchBlob;
    const cacheDir = fs.dirs.DownloadDir;

    const filename = url.split('/').pop();
    const imagePath = `${cacheDir}/${filename}`;

    try {
        const configOptions = Platform.select({
            ios: {
                fileCache: true,
                path: imagePath,
                appendExt: filename.split('.').pop(),
            },
            android: {
                fileCache: true,
                path: imagePath,
                appendExt: filename.split('.').pop(),
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: imagePath,
                    description: 'File',
                },
            },
        });

        const response = await RNFetchBlob.config(configOptions).fetch('GET', url);
        // Return the path to the downloaded file
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// npm i react-native-base64     look for this package

// export const downloadBase64File = async (url) => {
//     const { config, fs } = RNFetchBlob;
//     const cacheDir = fs.dirs.DownloadDir;

//     const filename = url.split('/').pop();
//     const imagePath = `${cacheDir}/${filename}`;

//     try {
//         const configOptions = Platform.select({
//             ios: {
//                 fileCache: true,
//                 path: imagePath,
//                 appendExt: filename.split('.').pop(),
//             },
//             android: {
//                 fileCache: true,
//                 path: imagePath,
//                 appendExt: filename.split('.').pop(),
//                 addAndroidDownloads: {
//                     useDownloadManager: true,
//                     notification: true,
//                     path: imagePath,
//                     description: 'File',
//                 },
//             },
//         });

//         const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

//         // Convert base64 string to binary data
//         const binaryData = decode(response.data);

//         // Save binary data as a file
//         await fs.writeFile(imagePath, binaryData, 'base64');

//         // Return the path to the downloaded file
//         return response;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };