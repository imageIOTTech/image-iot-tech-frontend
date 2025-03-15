import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import Font5Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../styles'
import ImageCropPicker from 'react-native-image-crop-picker'

type FooterEditProps = {

    image: string | undefined,
    imageLogo: string | undefined,

    uriImage: (value: string) => void,
    uriLogo: (value: string) => void,

    setDimensions: (dimension: any) => void

    handleActiveTool: (value: string) => void,
};
const FooterEdit: React.FC<FooterEditProps> = (props) => {

    const { image, uriImage, uriLogo, handleActiveTool, setDimensions } = props;

    const [isActive, setIsActive] = useState<string>('')

    //1
    useEffect(() => {
        if (!image) openImageLibrary('Photos');
    }, [])

    // Open the image Library 
    const openImageLibrary = (type: string) => {
        ImageCropPicker.openPicker({
            width: 500,
            height: 500,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: false,
            mediaType: 'photo',
        })
            .then((imageS: any) => {
                if (type == 'Photos') {
                    uriImage(imageS.path);
                    setDimensions({
                        width: imageS.width,
                        height: imageS.height
                    })
                    console.log(imageS);
                }
                else {
                    uriLogo(imageS.path)
                }
                console.log(imageS)
            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    };

    const handleOnPress = (value: string) => {
        if (isActive == value) {
            setIsActive('');
        }
        else {
            setIsActive(value);
        }
        handleActiveTool(value);
    }

    return (
        <View style={styles.boxFooterEdit}>
            <TouchableOpacity id='Photos' style={[styles.itemBoxEdit]} onPress={() => { openImageLibrary("Photos") }}>
                <FontIcon name="photo" size={18} color={colors.gray} />
                <Text style={[styles.textBoxEdit, { color: colors.gray }]}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Logos' style={[styles.itemBoxEdit,]} onPress={() => { openImageLibrary("Logos") }}>
                <FontIcon name="file-image-o" size={18} color={colors.gray} />
                <Text style={[styles.textBoxEdit, { color: colors.gray }]} >Logos</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Text' style={[styles.itemBoxEdit,]} onPress={() => { handleOnPress('Text') }}>
                <IonIcon name="text" size={18} color={colors.gray} />
                <Text style={[styles.textBoxEdit, { color: colors.gray }]} >Text</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Ratio' style={[styles.itemBoxEdit,]} onPress={() => { handleOnPress('Ratio') }}>
                <MaterialIcon name="photo-size-select-large" size={18} color={isActive == 'Ratio' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Ratio' ? { color: colors.black } : { color: colors.gray }]} >Ratio</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Element' style={[styles.itemBoxEdit,]} onPress={() => { handleOnPress('Element') }}>
                <Font5Icon name="shapes" size={18} color={isActive == 'Element' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Element' ? { color: colors.black } : { color: colors.gray }]} >Element</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Draw' style={[styles.itemBoxEdit,]} onPress={() => { handleOnPress('Draw') }}>
                <Font5Icon name="pen" size={18} color={isActive == 'Draw' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Draw' ? { color: colors.black } : { color: colors.gray }]} >Draw</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Crop' style={[styles.itemBoxEdit,]} onPress={() => { handleOnPress('Crop') }}>
                <IonIcon name="crop" size={18} color={isActive == 'Crop' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Crop' ? { color: colors.black } : { color: colors.gray }]} >Crop</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FooterEdit

const styles = StyleSheet.create({
    boxFooterEdit: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
        borderTopWidth: 0.2,
    },
    itemBoxEdit: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBoxEdit: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.gray,
    },
})