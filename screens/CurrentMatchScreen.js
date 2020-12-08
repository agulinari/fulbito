import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PlayerList from '../components/PlayerList';
import HeaderButton from '../components/UI/HeaderButton';
import * as enlistActions from '../store/actions/enlist';
import * as playersActions from '../store/actions/players';
import Colors from '../constants/Colors';

const CurrentMatchScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const registeredPlayers = useSelector(state => state.enlist.list);
    const userId = useSelector(state => state.auth.userId);
    const players = useSelector(state => state.players.players);
    const dispatch = useDispatch();

    const loadList = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(enlistActions.fetchList());
            await dispatch(playersActions.fetchPlayers());
        } catch {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadList);

        return () => {
            willFocusSub.remove();
        };
    }, [loadList]);

    useEffect(() => {
        setIsLoading(true);
        loadList().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadList]);

    const enlistHandler = async () => {
        setIsLoading(true);
        await dispatch(enlistActions.enlistUser(userId));
        setIsLoading(false);
    }

    if (error) {
        return (
            <View style={styles.screen} >
                <Text>An error ocurred!</Text>
                <Button title="Try Again" color={Colors.primaryColor} onPress={loadList} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Button title="Register for next match" onPress={enlistHandler} />
            <PlayerList
                onRefresh={loadList}
                refreshing={isRefreshing}
                listData={players.filter(player => registeredPlayers.includes(player.id))}
                navigation={props.navigation}
            />

        </SafeAreaView>
    );
};

CurrentMatchScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Current Match',
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

export default CurrentMatchScreen;