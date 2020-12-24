import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Profile from '../components/Profile';
import contactData from '../data/contact.json';

const PlayerProfileScreen = props => {
    const playerId = props.navigation.getParam('playerId');
    const selectedPlayer = useSelector(state =>
        state.players.players.find(player => player.id === playerId)
    );

    return (
        <SafeAreaView style={styles.screen}>
            <Profile {...selectedPlayer} />
        </SafeAreaView>
    )
};


PlayerProfileScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Perfil del jugador'
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PlayerProfileScreen;