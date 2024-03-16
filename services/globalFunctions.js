import AsyncStorage from "@react-native-async-storage/async-storage";
// import { PermissionsAndroid } from "react-native";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';

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



export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Cool Photo App Location Permission',
                message:
                    'Cool Photo App needs access to your location ' +
                    'so you can find nearby places.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};





export const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    heading: position?.coords?.heading,
                };
                console
                resolve(cords);
            },
            error => {
                reject(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
    })

export const locationPermission = () => new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
        try {
            const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
            if (permissionStatus === 'granted') {
                return resolve("granted");
            }
            reject('Permission not granted');
        } catch (error) {
            return reject(error);
        }
    }
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve("granted");
        }
        return reject('Location Permission denied');
    }).catch((error) => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
    });
});

const showError = (message) => {
    showMessage({
        message,
        type: 'danger',
        icon: 'danger'
    })
}

const showSuccess = (message) => {
    showMessage({
        message,
        type: 'success',
        icon: 'success'
    })
}

export {
    showError,
    showSuccess
}