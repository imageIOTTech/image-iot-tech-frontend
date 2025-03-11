import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles';
import IonIcon from 'react-native-vector-icons/Ionicons'

type ChangeEditProps = {
    onPressNo: () => void,
    onPressSave: () => void,
};

const ChangeEdit: React.FC<ChangeEditProps> = (props) => {

    const { onPressNo, onPressSave } = props;

    return (
        <View style={[styles.boxFooterEdit, { padding: 5 }]}>
            <TouchableOpacity style={[styles.boxSaveChange,]}
                onPress={onPressNo}>
                <IonIcon name="close-outline" size={30} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boxSaveChange,]}
                onPress={onPressSave}>
                <IonIcon name="checkmark" size={30} color={colors.black} />
            </TouchableOpacity>
        </View>
    )
}

export default ChangeEdit

const styles = StyleSheet.create({
    boxFooterEdit: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderTopWidth: 0.2,
    },
    boxSaveChange: {

    },
})