import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { DataFont } from '../../utils/data';
import { colors } from '../../styles';



type FontTextProps = {
    onChangeValue: (value: string) => void;
};

const FontText: React.FC<FontTextProps> = (props) => {

    const { onChangeValue } = props;

    const [fontValue, setFontValue] = useState('');

    const handleOnPress = (value : string) => {
        onChangeValue(value);
    };

    const renderItemFont = ({ item }: { item: string }) => {
        return (
          <Pressable style={styles.boxFontItem} onPress={() => { handleOnPress(item); }}>
            <Text style={[styles.textFont, { fontFamily: item }]}>Aa</Text>
          </Pressable>
        )
      }

    return (
        <View style={styles.boxFont}>
            <FlatList
                data={DataFont}
                horizontal
                keyExtractor={(item) => item}
                renderItem={renderItemFont}
            />
        </View>
    )
}

export default FontText

const styles = StyleSheet.create({
    boxFont: {
        position: 'absolute',
        top: 0,
        marginTop: -130,
        height: 75,
      },
      boxFontItem: {
        width: 100,
        height: 65,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textFont: {
        fontSize: 16,
      },
})