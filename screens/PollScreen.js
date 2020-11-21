import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const PollScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            <Text>Poll Screen</Text>
        </SafeAreaView>
    );
};

PollScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Poll'
    };
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PollScreen;