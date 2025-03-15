import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ImageCropPicker from 'react-native-image-crop-picker';
import IonIcon from 'react-native-vector-icons/Ionicons'
import EntyIcon from 'react-native-vector-icons/Entypo'
import { colors } from '../../styles';

type CropImageProps = {
    image?: string,
    setImage: (image: string) => void,
    setDimensions: (value: any) => void,
};

const CropImage: React.FC<CropImageProps> = (props) => {

    const { image, setImage, setDimensions } = props;

    const rotateImage = () => {
        if (!image) {
            return Alert.alert('No image', 'Before open cropping only, please select image');
        }

        ImageCropPicker.openCropper({
            path: image,
            mediaType: 'photo',
            width: 200,
            height: 200,
            cropping: false,
            enableRotationGesture:true,
            freeStyleCropEnabled: true,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            hideBottomControls: true
        })
            .then((croppedImage) => {
                setImage(croppedImage.path);
                setDimensions({
                    width: croppedImage.width,
                    height: croppedImage.height
                })
            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    };

    const cropLast = () => {
        if (!image) {
            return Alert.alert('No image', 'Before open cropping only, please select image');
        }

        ImageCropPicker.openCropper({
            path: image,
            mediaType: 'photo',
            width: 200,
            height: 200,
            freeStyleCropEnabled: true,
            hideBottomControls: true
        })
            .then((croppedImage) => {
                setImage(croppedImage.path);
                setDimensions({
                    width: croppedImage.width,
                    height: croppedImage.height
                })
            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    };

    return (
        <View style={styles.boxCrop} >
            <ScrollView contentContainerStyle={{ width: '100%', flexDirection: 'row' }}>
                <Pressable style={styles.btnCrop} onPress={()=>cropLast()}>
                    <IonIcon name="crop" size={18} color={colors.black} />
                    <Text style={styles.txtTitle}>Crop</Text>
                </Pressable>
                <Pressable style={styles.btnCrop} onPress={rotateImage}>
                    <EntyIcon name="circle" size={18} color={colors.black} />
                    <Text style={styles.txtTitle}>Rotate</Text>
                </Pressable>
            </ScrollView>
        </View>

    )
}

export default CropImage

const styles = StyleSheet.create({
    boxCrop: {
        width: '100%',
        position: 'absolute',
        top: 0,
        marginTop: -66,
        height: 65,
        backgroundColor: colors.white,
    },
    btnCrop: {
        width: 100,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtTitle: {
        fontSize: 16,
        color: colors.gray,
    },
})

const data = {
    "cropRect":
    {
        "height": 480,
        "width": 480,
        "x": 0,
        "y": 6
    },
    "exif": {
        "DateTime": null,
        "DateTimeDigitized": null,
        "ExposureTime": null,
        "FNumber": null, "Flash": null,
        "FocalLength": null,
        "GPSAltitude": null,
        "GPSAltitudeRef": null,
        "GPSDateStamp": null,
        "GPSLatitude": null,
        "GPSLatitudeRef": null,
        "GPSLongitude": null,
        "GPSLongitudeRef": null,
        "GPSProcessingMethod": null,
        "GPSTimeStamp": null,
        "ISOSpeedRatings": null,
        "ImageLength": "500",
        "ImageWidth": "500",
        "Make": null,
        "Model": null,
        "Orientation": "0",
        "SubSecTime": null,
        "SubSecTimeDigitized": null,
        "SubSecTimeOriginal": null,
        "WhiteBalance": null
    },
    "height": 500,
    "mime": "image/jpeg",
    "modificationDate": "1741790766000",
    "path": "file:///storage/emulated/0/Pictures/0126a3a9-cbe0-4e33-a34e-626e2becf348.jpg",
    "size": 88164,
    "width": 500
}