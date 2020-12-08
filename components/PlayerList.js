import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PlayerItem from './PlayerItem';

const PlayerList = props => {
    const renderPlayerItem = (itemData) => {
        return (
            <PlayerItem
                avatar={itemData.item.avatar}
                name={itemData.item.name}
                description={itemData.item.description}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'PlayerProfile',
                        params: {
                            playerId: itemData.item.id
                        }
                    })
                }}
            />
        )
    };
    return (
        <View style={styles.list}>
            <FlatList
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
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
        width: '100%',
        margin: 10
    }
});

export default PlayerList;