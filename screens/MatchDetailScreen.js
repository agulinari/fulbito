import React from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { MATCHES_DETAIL } from '../data/dummy-data';
import TeamCard from '../components/TeamCard';
import MessageList from '../components/MessageList';
import { ScrollView } from 'react-native-gesture-handler';

const MatchDetailScreen = props => {
    const matchId = props.navigation.getParam('matchId');

    const selectedMatch = MATCHES_DETAIL.find(match => match.id === matchId);
    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView>
            <View style={styles.teamsSection}>
            <TeamCard
                navigation={props.navigation}
                team={selectedMatch.team1.name}
                logo={selectedMatch.team1.logo}
                player1={selectedMatch.team1.players[0]}
                player2={selectedMatch.team1.players[1]}
                player3={selectedMatch.team1.players[2]}
                player4={selectedMatch.team1.players[3]}
                player5={selectedMatch.team1.players[4]}
            />
                        
            <TeamCard
                navigation={props.navigation}
                team={selectedMatch.team2.name}
                logo={selectedMatch.team2.logo}
                player1={selectedMatch.team2.players[0]}
                player2={selectedMatch.team2.players[1]}
                player3={selectedMatch.team2.players[2]}
                player4={selectedMatch.team2.players[3]}
                player5={selectedMatch.team2.players[4]}
            />
            </View>
            <MessageList listData={selectedMatch.comments}/>
            <Button
                title="Go Back"
                onPress={() => {
                    props.navigation.pop();
                }}
            />
            </ScrollView>
        </SafeAreaView>
    );
};

MatchDetailScreen.navigationOptions = (navigationData) => {
    const matchId = navigationData.navigation.getParam('matchId');
    const selectedMatch = MATCHES_DETAIL.find(match => match.id === matchId);
    return {
        headerTitle: selectedMatch.title
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamsSection: {
        flexDirection: 'row'
    }
});

export default MatchDetailScreen;