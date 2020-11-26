import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { MATCHES_DETAIL } from '../data/dummy-data';
import TeamCard from '../components/TeamCard';
import MessageList from '../components/MessageList';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-chart-kit';

const MatchDetailScreen = props => {

    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    };
    const data = [
        { name: 'Quique', votes: 4, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Fede', votes: 2, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Gabi', votes: 1, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Juan', votes: 3, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Bruno', votes: 0, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ];

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
                <MessageList listData={selectedMatch.comments} />
                <View style={styles.chart}>
                    <Text style={styles.title}>Terminator</Text>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="votes"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={styles.title}>Anti-FairPlay</Text>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="votes"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={styles.title}>Goleador</Text>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="votes"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
                </View>
                <View style={styles.chart}>
                    <Text style={styles.title}>Fantasma</Text>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="votes"
                        backgroundColor="transparent"
                        paddingLeft="15"
                    />
                </View>
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
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22
    },
    chart: {
        alignItems: 'center'
    }
});

export default MatchDetailScreen;