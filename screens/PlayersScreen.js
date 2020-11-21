import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlayerList from '../components/PlayerList';
import { PLAYERS } from '../data/dummy-data';

const PlayersScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            <PlayerList listData={PLAYERS} navigation={props.navigation}/>
        </SafeAreaView>
    );
};


PlayersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Players',
        headerLeft: (
            <HeaderButtons HeaderButtonsComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => { 
                    navData.navigation.toggleDrawer()
                }} />
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

export default PlayersScreen;