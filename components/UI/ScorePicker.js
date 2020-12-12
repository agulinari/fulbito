import React, { useReducer, useEffect } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";


const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
                touched: true
            };
        default:
            return state;
    }
};

const StorePicker = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '0',
        isValid: props.initiallyValid,
        touched: false
    });

    const { onValueChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            props.onValueChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onValueChange, id]);

    const valueChangeHandler = value => {
        if (value !== 0) {
            dispatch({ type: INPUT_CHANGE, value: value, isValid: true })
        }
    };


    return (
         
        <View style={styles.container}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={inputState.value}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={valueChangeHandler}
                >
                    {
                        (!inputState.touched) && <Picker.Item label='' value='0' />
                    }
                    {
                        props.items.map((item, index) => {
                            return <Picker.Item label={item.label} value={item.value} key={index} />
                        })
                    }
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 40,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    name: {
        fontFamily: 'open-sans-bold'
    },
    pickerContainer: {

        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.primaryColor
    },
    picker: {
        width: 100
    },
    pickerItem: {
        backgroundColor: 'grey',
        color: 'blue',
        fontFamily: 'Ebrima',
        fontSize: 17
    }
});

export default StorePicker;