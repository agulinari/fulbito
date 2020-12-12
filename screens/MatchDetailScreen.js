import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Button, ActivityIndicator } from 'react-native';
import TeamCard from '../components/TeamCard';
import MessageList from '../components/UI/MessageList';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-chart-kit';

const MatchDetailScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const matchId = props.navigation.getParam('matchId');

    const selectedMatch = useSelector(state =>
        state.matches.matches.find(match => match.id === matchId)
    );

    const votes = useSelector(state => votes.votes);

    const dispatch = useDispatch();

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


    const loadVotes = useCallback(async () => {
        setError(null);
        try {
            await dispatch(votesActions.fetchVotes(matchId));
        } catch {
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

    if (error) {
        return (
            <View style={styles.screen} >
                <Text>An error ocurred!</Text>
                <Button title="Try Again" color={Colors.primaryColor} onPress={loadVotes} />
            </View>
        )
    }

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


    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView>
                <View style={styles.teamsSection}>
                    <TeamCard
                        navigation={props.navigation}
                        name={selectedMatch.team1.name}
                        logo={selectedMatch.team1.logo}
                        player1={selectedMatch.team1.players[0]}
                        player2={selectedMatch.team1.players[1]}
                        player3={selectedMatch.team1.players[2]}
                        player4={selectedMatch.team1.players[3]}
                        player5={selectedMatch.team1.players[4]}
                    />

                    <TeamCard
                        navigation={props.navigation}
                        name={selectedMatch.team2.name}
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
    return {
        headerTitle:  navigationData.navigation.getParam('matchTitle')
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