import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../styles';

type RatioProps = {
    onChangeValue: (value: number) => void,
};
const Ratio: React.FC<RatioProps> = (props) => {

    const { onChangeValue } = props;

    const handlePress = (value: number) => {
        onChangeValue(value);
    };

    return (
        <View style={styles.boxRatio}>
            <ScrollView horizontal style={styles.scrollRotio}>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => handlePress(0)}>
                    <MaterialIcon name="crop-original" size={30} color={colors.gray} />
                    <Text>Original</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => handlePress(1 / 1)}>
                    <MaterialIcon name="crop-din" size={30} color={colors.gray} />
                    <Text>1:1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => handlePress(16 / 9)}>
                    <MaterialIcon name="crop-16-9" size={30} color={colors.gray} />
                    <Text>16:9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => handlePress(3 / 2)}>
                    <MaterialIcon name="crop-3-2" size={30} color={colors.gray} />
                    <Text>3:2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => handlePress(5 / 4)}>
                    <MaterialIcon name="crop-5-4" size={30} color={colors.gray} />
                    <Text>5:4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxRatioItem} onPress={() => handlePress(7 / 5)}>
                    <MaterialIcon name="crop-7-5" size={30} color={colors.gray} />
                    <Text>7:5</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Ratio

const styles = StyleSheet.create({
    scrollRotio: {
        height: 100,
    },
    boxRatio: {
        position: 'absolute',
        top: 0,
        marginTop: -75,
        height: 75,
        backgroundColor: colors.white,
    },
    boxRatioItem: {
        width: 100,
        height: 65,
        margin: 5,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})