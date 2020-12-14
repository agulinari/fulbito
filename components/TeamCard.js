import React from 'react';
import { View, StyleSheet } from 'react-native';
import TeamLogo from '../components/TeamLogo';
import PlayerMatchItem from '../components/PlayerMatchItem';

const TeamCard = props => {
    return (
        <View style={styles.teamContainer}>
            <View style={styles.teamLogoContainer}>
                <TeamLogo logo={props.logo} name={props.name} />
            </View>
            <PlayerMatchItem player={props.player1} score={props.score1} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'PlayerProfile',
                    params: {
                        playerId: props.player1.id
                    }
                })
            }} />
            <PlayerMatchItem player={props.player2} score={props.score2} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'PlayerProfile',
                    params: {
                        playerId: props.player2.id
                    }
                })
            }}/>
            <PlayerMatchItem player={props.player3} score={props.score3} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'PlayerProfile',
                    params: {
                        playerId: props.player3.id
                    }
                })
            }}/>
            <PlayerMatchItem player={props.player4} score={props.score4} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'PlayerProfile',
                    params: {
                        playerId: props.player4.id
                    }
                })
            }}/>
            <PlayerMatchItem player={props.player5} score={props.score5} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'PlayerProfile',
                    params: {
                        playerId: props.player5.id
                    }
                })
            }}/>
        </View>
    );

};

const styles = StyleSheet.create({
    teamContainer: {
        flex: 1,
        width: '100%',
        padding: 5,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamLogoContainer: {
        marginBottom: 10
    }
});

export default TeamCard;
