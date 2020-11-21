import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import DefaultText from './DefaultText';
import Colors from '../constants/Colors';

const PlayerItem = props => {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={props.onSelect}>
                <View style={styles.playerInfo}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={props.avatar}
                    />
                    <DefaultText>{props.name}</DefaultText>
                </View>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    item: {
        height: 75,
        width: '100%',
        backgroundColor: Colors.rowColor,
        alignSelf: 'stretch',
        marginBottom: 2,
        overflow: 'hidden'
    },
    playerInfo: {
        flexDirection: 'row',
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60
    }
});

export default PlayerItem;
