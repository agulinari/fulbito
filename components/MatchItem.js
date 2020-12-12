import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import DefaultText from './UI/DefaultText';
import TeamLogo from './TeamLogo';

const MatchItem = props => {
    return (
        <View style={styles.item}>
        <TouchableOpacity onPress={props.onSelect}>
        <View>
            <View style={{...styles.row, ...styles.header}}>
                <ImageBackground fadeDuration={200} source={require('../assets/match.jpg')} style={styles.bgImage}>
                    <View style={styles.scoreContainer} >
                        <TeamLogo logo={props.team1.logo}  name={props.team1.name}/>
                        <Text style={styles.title}>{props.team1.score} : {props.team2.score}</Text>
                        <TeamLogo logo={props.team2.logo} name={props.team2.name}/>
                    </View>
                    <View style={styles.titleContainer} >
                    <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{...styles.row, ...styles.detail}}>
                <DefaultText>{props.date}</DefaultText>
                <DefaultText>{props.place.toUpperCase()}</DefaultText>
            </View>
        </View>
        </TouchableOpacity>
        </View>
    );
 
};

const styles = StyleSheet.create({
    item: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden'
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        height: '85%'
    },
    detail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center'
    },
    scoreContainer: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default MatchItem;
