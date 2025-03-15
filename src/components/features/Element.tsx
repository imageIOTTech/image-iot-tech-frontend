import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../styles';
import { FlatList } from 'react-native';
import { DataImage } from '../../utils/data';
import ImageModel from '../../models/Image';

type ElementProp = {
    onPress: (uri: any) => void;
}

const Element: React.FC<ElementProp> = (props) => {

    const { onPress } = props;

    const onHandle = (image: any) => {
        onPress(image);
    };

    const renderItemImage = ({ item }: { item: ImageModel }) => {
        return (
            <Pressable style={styles.btnImage} key={item.id} onPress={() => onHandle(item.uri)}>
                <Image style={styles.img} source={{uri:item.uri}} />
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={DataImage}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItemImage}
                horizontal
            />
        </View>
    )
}

export default Element

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: 100,
        backgroundColor: colors.white,
        marginTop: -100,
    },
    btnImage: {

    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
})