import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PlayerList from '../components/PlayerList';
import HeaderButton from '../components/UI/HeaderButton';
import * as enlistActions from '../store/actions/enlist';
import * as playersActions from '../store/actions/players';
import Colors from '../constants/Colors';

const EnlistingScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const registeredIds = useSelector(state => state.enlist.list);
    const userId = useSelector(state => state.auth.userId);
    const players = useSelector(state => state.players.players);
    const registeredPlayers = players.filter(player => registeredIds.includes(player.id));
    const dispatch = useDispatch();

    const loadList = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(enlistActions.fetchList());
            await dispatch(playersActions.fetchPlayers());
        } catch (err) {
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
                <Text>Ocurrió un error!</Text>
                <Button title="Intente nuevamente" color={Colors.primaryColor} onPress={loadList} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button
                    title="Registrarse para el siguiente partido"
                    disabled={registeredPlayers.length >= 10 || registeredIds.includes(userId)}
                    onPress={enlistHandler}
                />
                {
                    (registeredPlayers.length >= 10) &&
                    <View style={styles.infoContainer}>
                        <Text style={styles.info}>Equipos completos</Text>
                    </View>
                }
            </View>
            <PlayerList
                onRefresh={loadList}
                refreshing={isRefreshing}
                listData={registeredPlayers}
                navigation={props.navigation}
            />

        </SafeAreaView>
    );
};

EnlistingScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Anotate para el partido',
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
    },
    buttonContainer: {
        marginTop: 10
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    info: {
        fontFamily: 'open-sans-bold'
    }

});

export default EnlistingScreen;