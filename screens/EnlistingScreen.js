import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';


const EnlistingScreen = props => {
    return (
        <SafeAreaView style={styles.screen}>
            <Text>Enlisting Screen</Text>
        </SafeAreaView>
    );
};


EnlistingScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Register for next match'
    };
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EnlistingScreen;