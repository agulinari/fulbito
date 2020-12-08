import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import DefaultText from './UI/DefaultText';
import Colors from '../constants/Colors';
import { images } from '../constants/Images';

const PlayerMatchItem = props => {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={props.onSelect}>
                <View style={styles.playerInfo}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={images[props.player.avatar].uri}
                    />
                    <DefaultText>{props.player.name}</DefaultText>
                    <View style={styles.circle}>
                        <Text style={styles.scoreText}>{props.player.score}</Text>
                    </View>
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
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 1000,
        backgroundColor: Colors.backColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreText: {
        fontFamily: 'open-sans-bold'
    }
});

export default PlayerMatchItem;
