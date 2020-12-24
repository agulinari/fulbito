import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, SafeAreaView, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MatchesScreen from '../screens/MatchesScreen';
import MatchDetailScreen from '../screens/MatchDetailScreen';
import Colors from '../constants/Colors';
import PlayersScreen from '../screens/PlayersScreen';
import StatsScreen from '../screens/StatsScreen';
import CurrentMatchScreen from '../screens/CurrentMatchScreen';
import EnlistingScreen from '../screens/EnlistingScreen';
import PollScreen from '../screens/PollScreen';
import PlayerProfileScreen from '../screens/PlayerProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const defaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MatchesNavigator = createStackNavigator({
    Matches: MatchesScreen,
    MatchDetail: MatchDetailScreen
}, {
    initialRouteName: 'Matches',
    initialRouteParams: {
        myMatches: false
    },
    defaultNavigationOptions: defaultStackNavigationOptions
});

const MyMatchesNavigator = createStackNavigator({
    MyMatches: MatchesScreen,
    MatchDetail: MatchDetailScreen
}, {
    initialRouteName: 'MyMatches',
    initialRouteParams: {
        myMatches: true
    },
    defaultNavigationOptions: defaultStackNavigationOptions
});


const EnlistingNavigator = createStackNavigator({
    Enlisting: EnlistingScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});


const PollNavigator = createStackNavigator({
    Poll: PollScreen,
    MatchDetail: MatchDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});

const CurrentMatchNavigator = createSwitchNavigator({
    CurrentMatch: CurrentMatchScreen,
    Enlisting: EnlistingNavigator,
    Poll: PollNavigator
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultStackNavigationOptions
});

const PlayersNavigator = createStackNavigator({
    Players: PlayersScreen,
    PlayerProfile: PlayerProfileScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});

const MyProfileNavigator = createStackNavigator({
    MyProfile: PlayerProfileScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});

const matchesTabScreenConfig = {
    Matches: {
        screen: MatchesNavigator,
        navigationOptions: {
            tabBarLabel: 'Partidos',
            tabBarIcon: (tabInfo) => {
                return <MaterialCommunityIcons name='soccer-field' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    },
    Players: {
        screen: PlayersNavigator, navigationOptions: {
            tabBarLabel: 'Jugadores',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-people' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    }
};



const MatchesTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(matchesTabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        },
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <MaterialCommunityIcons
                    name="soccer-field"
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    })
    : createBottomTabNavigator(matchesTabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor
        }
    });


const MainNavigator = createDrawerNavigator({
    Home: CurrentMatchNavigator,
    Matches: MatchesTabNavigator,
    //Profile: MyProfileNavigator
    // Stats: StatsScreen
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerNavigatorItems {...props} />
                    <Button title="Logout" color={Colors.primaryColor} onPress={() => {
                        dispatch(authActions.logout());
                    }} />
                </SafeAreaView>
            </View>
        );
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});

const AppNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Main: MainNavigator
})

export default createAppContainer(AppNavigator);