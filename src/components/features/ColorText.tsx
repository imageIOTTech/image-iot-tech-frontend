import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { DataColor } from '../../utils/data';
import { colors } from '../../styles';

type ColorTextProps = {
    onChangeValue: (value: string) => void;
};

const ColorText: React.FC<ColorTextProps> = (props) => {

    const { onChangeValue } = props;

    const [selectedColor, setSelectedColor] = useState('');

    const handleOnPress = (color: string) => {
        try {
            if (selectedColor == '' || selectedColor != color) {
                setSelectedColor(color);
                onChangeValue(color);
            } else {
                setSelectedColor('');
            }
        } catch (error) {
            console.log("Error handle active color: " + error);
        }
    };

    const renderItemColor = ({ item }: { item: string }) => {
        return (
            <Pressable
                style={[styles.boxColorItem,
                { backgroundColor: item },
                { borderWidth: selectedColor == item ? 0.5 : 0 }]}
                onPress={() => handleOnPress(item)} />
        )
    }

    return (
        <View style={styles.boxColor}>
            <FlatList
                horizontal
                data={DataColor}
                keyExtractor={(item) => item}
                renderItem={renderItemColor}
            />
        </View>
    )
}

export default ColorText

const styles = StyleSheet.create({
    boxColor: {
        height: 75,
        backgroundColor: colors.white,
        position: 'absolute',
        top: 0,
        marginTop: -130,
    },
    boxColorItem: {
        width: 50,
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})