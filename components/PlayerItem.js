import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import DefaultText from './UI/DefaultText';
import Colors from '../constants/Colors';
import { images } from '../constants/Images';

const PlayerItem = props => {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={props.onSelect}>
                <View style={styles.playerInfo}>
                    <Image
                        style={styles.imageContainer}
                        resizeMode="contain"
                        source={images[props.avatar].uri}
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
        borderBottomColor: Colors.secondaryColor,
        elevation: 10,
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
        fontSize: 22,
        color: Colors.primaryColor
    }
});

export default PlayerItem;
