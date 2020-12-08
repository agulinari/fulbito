import React from 'react';
import { SafeAreaView, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const StatsScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            <Text>Stats Screen</Text>
        </SafeAreaView>
    );
};

StatsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Stats',
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

export default StatsScreen;