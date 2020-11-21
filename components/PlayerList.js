import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PlayerItem from './PlayerItem';

const PlayerList = props => {
    const renderPlayerItem = (itemData) => {
        return <PlayerItem
            avatar={itemData.item.avatar}
            name={itemData.item.name}
            onSelect={() => {
                props.navigation.navigate({
                    routeName: 'PlayerProfile',
                    params: {
                        matchId: itemData.item.id
                    }
                })
            }}
        />
    };
    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={props.listData}
                renderItem={renderPlayerItem}
                numColumns={1}
                style={{ width: '100%' }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        margin: 10
    }
});

export default PlayerList;