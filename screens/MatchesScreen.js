import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MatchList from '../components/MatchList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import { View, Text, Button, ActivityIndicator, SafeAreaView, StyleSheet, Platform } from 'react-native';
import * as matchesActions from '../store/actions/matches';

const MatchesScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const matches = useSelector(state => state.matches.matches);
    const dispatch = useDispatch();

    const loadMatches = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(matchesActions.fetchMatches());
        } catch {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])

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

    if (error) {
        return (
            <View style={styles.screen} >
                <Text>An error ocurred!</Text>
                <Button title="Try Again" color={Colors.primaryColor} onPress={loadMatches} />
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

    if (!isLoading && matches.length === 0) {
        return (
            <View style={styles.screen} >
                <Text>No se encontraron partidos.</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.screen}>
            <MatchList
                onRefresh={loadMatches}
                refreshing={isRefreshing}
                listData={matches}
                navigation={props.navigation}
            />
        </SafeAreaView>
    );
};


MatchesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Todos los partidos',
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MatchesScreen;