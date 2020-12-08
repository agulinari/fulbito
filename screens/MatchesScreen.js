import React from 'react';
import { MATCHES } from '../data/dummy-data';
import MatchList from '../components/MatchList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';

const MatchesScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            <MatchList listData={MATCHES} navigation={props.navigation} />
        </SafeAreaView>
    );
};


MatchesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Matches',
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