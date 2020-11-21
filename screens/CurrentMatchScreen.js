import React from 'react';
import { Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const CurrentMatchScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            <Text>Current Match Screen</Text>
            <Button title="Vote" onPress={() => {
                props.navigation.navigate({ routeName: 'Poll' });
            }} />
            <Button title="Register for next match" onPress={() => {
                props.navigation.navigate({ routeName: 'Enlisting' });
            }} />
        </SafeAreaView>
    );
};

CurrentMatchScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Current Match',
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

export default CurrentMatchScreen;