import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TeamLogo = props => {
    return (
        <View style={styles.teamContainer}>
            <Image source={props.logo} style={styles.teamLogo} />
            <Text style={styles.teamName}>{props.team}</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    teamName: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'black'
    },
    teamLogo: {
        width: '75%',
        height: '75%',
        justifyContent: 'flex-start'
    },
    teamContainer: {
        height: 100, 
        alignItems: 'center'
    }
});

export default TeamLogo;
