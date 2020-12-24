import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View, Button, Text, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import PlayerList from '../components/PlayerList';
import Colors from '../constants/Colors';
import * as playerActions from '../store/actions/players';

const PlayersScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const players = useSelector(state =>  state.players.players);
    const dispatch = useDispatch();

    const loadPlayers = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(playerActions.fetchPlayers());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadPlayers);

        return () => {
            willFocusSub.remove();
        };
    }, [loadPlayers]);

    useEffect(() => {
        setIsLoading(true);
        loadPlayers().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadPlayers]);

    if (error) {
        return (
            <View style={styles.screen} >
                <Text>Ocurrió un error!</Text>
                <Button title="Intente nuevamente" color={Colors.primaryColor} onPress={loadPlayers} />
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

    if (!isLoading && players.length === 0) {
        return (
            <View style={styles.screen} >
                <Text>No se encontraron jugadores.</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.screen}>
            <PlayerList
                onRefresh={loadPlayers}
                refreshing={isRefreshing}
                listData={players}
                navigation={props.navigation}
            />
        </SafeAreaView>
    );
};


PlayersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Jugadores',
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
        alignItems: 'center',
        backgroundColor: Colors.rowColor
    }
});

export default PlayersScreen;