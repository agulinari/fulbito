import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Profile from '../components/Profile';
import contactData from '../data/contact.json';

const PlayerProfileScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            <Profile {...contactData} />
        </SafeAreaView>
    )
};


PlayerProfileScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Player Profile'
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