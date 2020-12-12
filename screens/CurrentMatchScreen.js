import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
import * as statusActions from '../store/actions/status';

const CurrentMatchScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const status = useSelector(state => state.status.status);
    

    const dispatch = useDispatch();

    const loadState = useCallback(async () => {
        setError(null);
        try {
            await dispatch(statusActions.getStatus());
        } catch {
            setError(err.message);
        }
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadState);

        return () => {
            willFocusSub.remove();
        };
    }, [loadState]);

    useEffect(() => {
        setIsLoading(true);
        loadState().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadState, setIsLoading]);

    useEffect(() => {
        const redirect = async () => {
            if (!isLoading) {
                if (status === 'list') {
                    props.navigation.navigate('Enlisting');
                } else if (status === 'vote') {
                    props.navigation.navigate('Poll');
                }
            }
        };
        redirect();
    }, [status, isLoading]);

    if (error) {
        return (
            <View style={styles.screen} >
                <Text>An error ocurred!</Text>
                <Button title="Try Again" color={Colors.primaryColor} onPress={loadState} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
        </View>
    )
};

CurrentMatchScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Current Match',
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

export default CurrentMatchScreen;