import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MatchList from '../components/MatchList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import { View, Text, Button, Switch, ActivityIndicator, SafeAreaView, StyleSheet, Platform } from 'react-native';
import * as matchesActions from '../store/actions/matches';

const MatchesScreen = props => {

    // States
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [error, setError] = useState();
    const [isEnabled, setIsEnabled] = useState(false);
    
    // Selectors
    const matches = useSelector(state => state.matches.matches);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();
    
    // Switch button 
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // Load matches
    const loadMatches = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(matchesActions.fetchMatches());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadMatches);

        return () => {
            willFocusSub.remove();
        };
    }, [loadMatches]);

    useEffect(() => {
        setIsLoading(true);
        loadMatches().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadMatches]);

    // Filter matches
    useEffect(() => {

        if (isEnabled) {
            const filter = matches.filter(match =>
                (match.team1.players.find(player => player.id === userId) !== undefined)
                || (match.team2.players.find(player => player.id === userId) !== undefined)
            );
            setFilteredMatches(filter);
        } else {
            setFilteredMatches(matches);
        }
    }, [isEnabled, matches, userId]);

    // Error screen
    if (error) {
        return (
            <SafeAreaView style={styles.screen} >
                <Text>An error ocurred!</Text>
                <Button title="Try Again" color={Colors.primaryColor} onPress={loadMatches} />
            </SafeAreaView>
        )
    }

    // Loading screen
    if (isLoading) {
        return (
            <SafeAreaView style={styles.screen} >
                <ActivityIndicator
                    size="large"
                    color={Colors.primaryColor}
                />
            </SafeAreaView>
        )
    }

    // Empty list screen
    if (!isLoading && filteredMatches.length === 0) {
        return (
            <SafeAreaView style={styles.screen}>
                <View style={styles.switchContainer}>
                <Text sytle={styles.switchLabel}>Mis Partidos</Text>
                <Switch
                    trackColor={{ false: Colors.primaryColor, true: Colors.accentColor }}
                    thumbColor={isEnabled ? Colors.secondaryColor : Colors.backColor}
                    ios_backgroundColor={Colors.backColor}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                </View>
                <View style={styles.centered}>
                <Text>No se encontraron partidos.</Text>
                </View>
            </SafeAreaView>
        )
    }

    // Main screen
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.switchContainer}>
                <Text sytle={styles.switchLabel}>{ (isEnabled) ? 'Mis Partidos' : 'Todos los partidos' }</Text>
                <Switch
                    trackColor={{ false: Colors.primaryColor, true: Colors.accentColor }}
                    thumbColor={isEnabled ? Colors.secondaryColor : Colors.backColor}
                    ios_backgroundColor={Colors.backColor}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <MatchList
                onRefresh={loadMatches}
                refreshing={isRefreshing}
                listData={filteredMatches}
                navigation={props.navigation}
            />
        </SafeAreaView>
    );
};


MatchesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Partidos',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        margin: 10
    },
    switchLabel: {
        fontFamily: 'open-sans-bold'
    }
});

export default MatchesScreen;