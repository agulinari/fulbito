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
                        style={styles.imageContainer}
                        resizeMode="contain"
                        source={props.avatar}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{props.name}</Text>
                        <DefaultText>{props.description}</DefaultText>
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
    imageContainer: {
        width: 60,
        height: 60
    },
   nameContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 20,
        alignItems: 'flex-start'        
    },
    name: {
        fontFamily: 'open-sans-bold',
        fontSize: 22
    }
});

export default PlayerItem;
