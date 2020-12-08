import React from 'react';
import { MATCHES } from '../data/dummy-data';
import MatchList from '../components/MatchList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import { SafeAreaView, Platform, StyleSheet } from 'react-native';


const MyMatchesScreen = props => {
    const myMatches = MATCHES.filter(match => match.id === 'm1' | match.id === 'm3');
    return (
        <SafeAreaView style={styles.screen}>
            <MatchList listData={myMatches} navigation={props.navigation} />
        </SafeAreaView>
    );
};

MyMatchesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'My Matches',
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

export default MyMatchesScreen;