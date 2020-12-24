import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Button, ActivityIndicator } from 'react-native';
import TeamCard from '../components/TeamCard';
import MessageList from '../components/UI/MessageList';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-chart-kit';
import * as votesActions from '../store/actions/votes';
import Colors from '../constants/Colors';

const MatchDetailScreen = props => {

    // Params
    const matchId = props.navigation.getParam('matchId');
    
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [comments, setComments] = useState([]);
    const [scoreTeam1, setScoreTeam1] = useState(['-', '-', '-', '-', '-']);
    const [scoreTeam2, setScoreTeam2] = useState(['-', '-', '-', '-', '-']);
    const [dataTerminator, setDataTerminator] = useState([]);
    const [dataAntifairplay, setDataAntifairplay] = useState([]);
    const [dataGoleador, setDataGoleador] = useState([]);
    const [dataFantasma, setDataFantasma] = useState([]);

    // Selectors
    const selectedMatch = useSelector(state =>
        state.matches.matches.find(match => match.id === matchId)
    );
    const votes = useSelector(state => state.votes.votes);

    const dispatch = useDispatch();

    // Charts config
    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    };


    // Load votes
    const loadVotes = useCallback(async () => {
        setError(null);
        try {
            await dispatch(votesActions.fetchVotes(matchId));
        } catch (err) {
            setError(err.message);
        }
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadVotes);

        return () => {
            willFocusSub.remove();
        };
    }, [loadVotes]);

    useEffect(() => {
        setIsLoading(true);
        loadVotes().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadVotes]);

    // Use votes and match information to generate charts data
    useEffect(() => {
        if (votes && selectedMatch) {
            const matchVotes = (votes[matchId] ? votes[matchId] : []);
            const comments = matchVotes.map(vote => vote.comment);
            setComments(comments);
            let scoreTeam1 = [];
            selectedMatch.team1.players.forEach(player => {
                const idPlayer = player.id;
                const sum = matchVotes.map(vote =>
                    vote.scores.find(score => score.playerId === idPlayer))
                    .filter(vote => vote !== undefined)
                    .reduce((accumulator, currentValue) => accumulator + currentValue.score, 0);
                const avg = (matchVotes.length !== 0) ? sum / matchVotes.length : '-';
                scoreTeam1.push(avg);
            });
            setScoreTeam1(scoreTeam1);

            let scoreTeam2 = [];
            selectedMatch.team2.players.forEach(player => {
                const idPlayer = player.id;
                const sum = matchVotes.map(vote =>
                    vote.scores.find(score => score.playerId === idPlayer))
                    .filter(vote => vote !== undefined)
                    .reduce((accumulator, currentValue) => accumulator + currentValue.score, 0);
                const avg = (matchVotes.length !== 0) ? sum / matchVotes.length : '-';
                scoreTeam2.push(avg);
            });
            setScoreTeam2(scoreTeam2);

            let dataTerminator = [];
            let dataAntifairplay = [];
            let dataFantasma = [];
            let dataGoleador = [];
            const colors = ['red', 'green', 'blue', 'orange', 'yellow',
                'grey', 'brown', 'pink', 'purple', 'lightblue'];

            const allPlayers = selectedMatch.team1.players.concat(selectedMatch.team2.players);

            allPlayers.forEach((player, index) => {
                const idPlayer = player.id;
                const terminatorCount = matchVotes.map(vote => vote.terminator)
                    .filter(pid => pid === idPlayer)
                    .reduce((accumulator, currentValue) => accumulator + 1, 0);
                const antifairplayCount = matchVotes.map(vote => vote.antifairplay)
                    .filter(pid => pid === idPlayer)
                    .reduce((accumulator, currentValue) => accumulator + 1, 0);
                const goleadorCount = matchVotes.map(vote => vote.goleador)
                    .filter(pid => pid === idPlayer)
                    .reduce((accumulator, currentValue) => accumulator + 1, 0);
                const fantasmaCount = matchVotes.map(vote => vote.fantasma)
                    .filter(pid => pid === idPlayer)
                    .reduce((accumulator, currentValue) => accumulator + 1, 0);
                dataTerminator.push({
                    name: player.name,
                    votes: terminatorCount,
                    color: colors[index],
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15
                });
                dataAntifairplay.push({
                    name: player.name,
                    votes: antifairplayCount,
                    color: colors[index],
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15
                });
                dataFantasma.push({
                    name: player.name,
                    votes: fantasmaCount,
                    color: colors[index],
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15
                });
                dataGoleador.push({
                    name: player.name,
                    votes: goleadorCount,
                    color: colors[index],
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15
                });

            });
            setDataTerminator(dataTerminator.sort((a,b) => a.votes < b.votes));
            setDataAntifairplay(dataAntifairplay.sort((a,b) => a.votes < b.votes));
            setDataGoleador(dataGoleador.sort((a,b) => a.votes < b.votes));
            setDataFantasma(dataFantasma.sort((a,b) => a.votes < b.votes));
        }
    }, [votes, selectedMatch, matchId,
        setComments, setScoreTeam1, setScoreTeam2,
        setDataAntifairplay, setDataFantasma, setDataGoleador, setDataTerminator]);

    // Error screen
    if (error) {
        return (
            <View style={styles.screen} >
                <Text>Ocurrió un error!</Text>
                <Button title="Intente nuevamente" color={Colors.primaryColor} onPress={loadVotes} />
            </View>
        )
    }

    // Loading screen
    if (isLoading) {
        return (
            <View style={styles.screen} >
                <ActivityIndicator
                    size="large"
                    color={Colors.primaryColor}
                />
            </View>
        )
    }

    // Main screen
    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView>
                <View style={styles.teamsSection}>
                    <TeamCard
                        navigation={props.navigation}
                        name={selectedMatch.team1.name}
                        logo={selectedMatch.team1.logo}
                        player1={selectedMatch.team1.players[0]}
                        score1={scoreTeam1[0]}
                        player2={selectedMatch.team1.players[1]}
                        score2={scoreTeam1[1]}
                        player3={selectedMatch.team1.players[2]}
                        score3={scoreTeam1[2]}
                        player4={selectedMatch.team1.players[3]}
                        score4={scoreTeam1[3]}
                        player5={selectedMatch.team1.players[4]}
                        score5={scoreTeam1[4]}
                    />

                    <TeamCard
                        navigation={props.navigation}
                        name={selectedMatch.team2.name}
                        logo={selectedMatch.team2.logo}
                        player1={selectedMatch.team2.players[0]}
                        score1={scoreTeam2[0]}
                        player2={selectedMatch.team2.players[1]}
                        score2={scoreTeam2[1]}
                        player3={selectedMatch.team2.players[2]}
                        score3={scoreTeam2[2]}
                        player4={selectedMatch.team2.players[3]}
                        score4={scoreTeam2[3]}
                        player5={selectedMatch.team2.players[4]}
                        score5={scoreTeam2[4]}
                    />
                </View>
                <MessageList listData={comments} />
                {(dataTerminator.length !== 0) &&
                    <View style={styles.chart}>
                        <Text style={styles.title}>Terminator</Text>
                        <PieChart
                            data={dataTerminator}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="votes"
                            backgroundColor="transparent"
                            paddingLeft="15"
                        />
                    </View>
                }
                {(dataAntifairplay.length !== 0) &&
                    <View style={styles.chart}>
                        <Text style={styles.title}>Anti-FairPlay</Text>
                        <PieChart
                            data={dataAntifairplay}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="votes"
                            backgroundColor="transparent"
                            paddingLeft="15"
                        />
                    </View>
                }
                {(dataGoleador.length !== 0) &&
                    <View style={styles.chart}>
                        <Text style={styles.title}>Goleador</Text>
                        <PieChart
                            data={dataGoleador}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="votes"
                            backgroundColor="transparent"
                            paddingLeft="15"
                        />
                    </View>
                }
                {(dataFantasma.length !== 0) &&
                    <View style={styles.chart}>
                        <Text style={styles.title}>Fantasma</Text>
                        <PieChart
                            data={dataFantasma}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="votes"
                            backgroundColor="transparent"
                            paddingLeft="15"
                        />
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

MatchDetailScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: navigationData.navigation.getParam('matchTitle')
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