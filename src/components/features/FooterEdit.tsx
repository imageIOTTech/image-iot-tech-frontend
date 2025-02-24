import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../styles'
import { launchImageLibrary } from 'react-native-image-picker'

type FooterEditProps = {

    image: string | undefined,

    uriImage: (value: string) => void,
    uriLogo: (value: string) => void,

    handleActiveTool: (value : string) => void,
};
const FooterEdit: React.FC<FooterEditProps> = (props) => {
    
    const { image, uriImage, uriLogo ,handleActiveTool } = props;

    const [isActive, setIsActive] = useState()


    useEffect(() => {
        if (!image) openImageLibrary('Photos');
        return () => {}
    }, [])


    // Open the image library
    const openImageLibrary = async (text: string) => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Image Picker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                    if (text == 'Photos') {
                        uriImage(uri)
                    }
                    else {
                        uriLogo(uri)
                    }
                }
            } else {
                console.log('No assets found in response');
            }
        });
    };

    const handleOnPress = (value: string) => {
        handleActiveTool(value);
    }

    return (
        <View style={styles.boxFooterEdit}>
            <TouchableOpacity id='Photos' style={[styles.itemBoxEdit]} onPress={() => { openImageLibrary("Photos") }}>
                <FontIcon name="photo" size={18} color={isActive == 'Photos' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Photos' ? { color: colors.black } : { color: colors.gray }]}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Logos' style={[styles.itemBoxEdit,]} onPress={() => { openImageLibrary("Logos") }}>
                <FontIcon name="file-image-o" size={18} color={isActive == 'Logos' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Logos' ? { color: colors.black } : { color: colors.gray }]} >Logos</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Text' style={[styles.itemBoxEdit,]} onPress={() => { handleOnPress('Text') }}>
                <IonIcon name="text" size={18} color={isActive == 'Text' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Text' ? { color: colors.black } : { color: colors.gray }]} >Text</Text>
            </TouchableOpacity>
            <TouchableOpacity id='Ratio' style={[styles.itemBoxEdit,]} onPress={() => {handleOnPress('Ratio')}}>
                <MaterialIcon name="photo-size-select-large" size={18} color={isActive == 'Ratio' ? colors.black : colors.gray} />
                <Text style={[styles.textBoxEdit, isActive == 'Ratio' ? { color: colors.black } : { color: colors.gray }]} >Ratio</Text>
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
        justifyContent: 'space-between',
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