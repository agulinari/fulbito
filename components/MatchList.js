import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MatchItem from './MatchItem';

const MatchList = props => {
    const renderMatchItem = (itemData) => {
        return (
            <MatchItem
                title={itemData.item.title}
                date={itemData.item.date}
                place={itemData.item.place}
                team1={itemData.item.team1}
                team2={itemData.item.team2}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'MatchDetail',
                        params: {
                            matchId: itemData.item.id,
                            matchTitle: itemData.item.title
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
                renderItem={renderMatchItem}
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
        margin: 10
    }
});

export default MatchList;