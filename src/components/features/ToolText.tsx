import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles'

type ToolTextProps = {
    onChangeValue: (value: string) => void;
}
const ToolText: React.FC<ToolTextProps> = (props) => {

    const { onChangeValue } = props;

    const handleOnPress = (value: string) => {
        onChangeValue(value);
    };

    return (
        <View style={styles.boxToolText}>
            <ScrollView horizontal style={styles.scrollToolText} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleOnPress('download')}}>
                    <MaterialIcon name="download" size={30} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleOnPress('font') }}>
                    <IonIcon name="text" size={30} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleOnPress('color') }}>
                    <IonIcon name="color-palette-outline" size={30} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleOnPress('edit') }}>
                    <MaterialIcon name="edit" size={30} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxToolTextItem} onPress={() => { handleOnPress('opacity') }}>
                    <MaterialIcon name='opacity' size={30} color={colors.gray} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default ToolText

const styles = StyleSheet.create({
    boxToolText: {
        position: 'absolute',
        top: 0,
        marginTop: -65,
        height: 65,
        backgroundColor: colors.white,
    },
    scrollToolText: {
        height: 100,
    },
    boxToolTextItem: {
        width: 100,
        height: 65,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})