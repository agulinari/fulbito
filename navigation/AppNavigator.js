import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MatchesScreen from '../screens/MatchesScreen';
import MatchDetailScreen from '../screens/MatchDetailScreen';
import Colors from '../constants/Colors';
import MyMatchesScreen from '../screens/MyMatchesScreen';
import PlayersScreen from '../screens/PlayersScreen';
import StatsScreen from '../screens/StatsScreen';
import CurrentMatchScreen from '../screens/CurrentMatchScreen';
import EnlistingScreen from '../screens/EnlistingScreen';
import PollScreen from '../screens/PollScreen';
import PlayerProfileScreen from '../screens/PlayerProfileScreen';

const defaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MatchesNavigator = createStackNavigator({
    Matches: {
        screen: MatchesScreen
    },
    MatchDetail: {
        screen: MatchDetailScreen
    }
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});

const MyMatchesNavigator = createStackNavigator({
    MyMatches: MyMatchesScreen,
    MatchDetail: MatchDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
});

const CurrentMatchNavigator = createStackNavigator({
    CurrentMatch: CurrentMatchScreen,
    Enlisting: EnlistingScreen,
    Poll: PollScreen
}, {
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
    CurrentMatch: {
        screen: CurrentMatchNavigator, navigationOptions: {
            tabBarLabel: 'Current Match',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-calendar' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    },
    AllMatches: {
        screen: MatchesNavigator, navigationOptions: {
            tabBarLabel: 'All Matches',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-people' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    },
    MyMatches: {
        screen: MyMatchesNavigator, navigationOptions: {
            tabBarLabel: 'My Matches',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-person' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    }
};

const playersTabScreenConfig = {
    Players: {
        screen: PlayersNavigator, navigationOptions: {
            tabBarLabel: 'Players',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-people' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    },
    MyProfile: {
        screen: MyProfileNavigator, navigationOptions: {
            tabBarLabel: 'My Profile',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-person' size={25} color={tabInfo.tintColor} />
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
        }
    })
    : createBottomTabNavigator(matchesTabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor
        }
    });


const PlayersTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(playersTabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
    })
    : createBottomTabNavigator(playersTabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor
        }
    });

const MainNavigator = createDrawerNavigator({
    Matches: MatchesTabNavigator,
    Players: PlayersTabNavigator,
    Stats: StatsScreen
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
})

export default createAppContainer(MainNavigator);