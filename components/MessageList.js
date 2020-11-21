import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MessageBubble from './MessageBubble';

const MessageList = props => {
    return (
        <View style={styles.list}>
            {props.listData.map((item, index) => {
                return (
                    (index % 2 === 0)
                        ? <MessageBubble mine text={item} />
                        : <MessageBubble text={item} />
                );
            })
            }
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

export default MessageList;