import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ScorePicker from '../components/UI/ScorePicker';
import HeaderButton from '../components/UI/HeaderButton';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';
import * as voteActions from '../store/actions/votes';
import * as matchesActions from '../store/actions/matches';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === 'FORM_INPUT_UPDATE') {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        };
    }
    return state;
};


const PollScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isVoting, setIsVoting] = useState(false);
    const [error, setError] = useState();
    const [errorVoting, setErrorVoting] = useState();
    const [players, setPlayers] = useState([]);
    const [scores, setScores] = useState(
        [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6', value: 6 },
            { label: '7', value: 7 },
            { label: '8', value: 8 },
            { label: '9', value: 9 },
            { label: '10', value: 10 }
        ]
    );

    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);

    const match = useSelector(state => state.matches.matches[0]);

    const [formState, dispatchFormState] = useReducer(formReducer,
        {
            inputValues: {
                player1: '',
                player2: '',
                player3: '',
                player4: '',
                player5: '',
                player6: '',
                player7: '',
                player8: '',
                player9: '',
                comment: '',
                terminator: 'p1',
                antifairplay: 'p3',
                goleador: 'p4',
                fantasma: 'p5'
            },
            inputValidities: {
                player1: false,
                player2: false,
                player3: false,
                player4: false,
                player5: false,
                player6: false,
                player7: false,
                player8: false,
                player9: false,
                comment: false,
                terminator: true,
                antifairplay: true,
                goleador: true,
                fantasma: true
            },
            formIsValid: false
        }
    );


    useEffect(() => {
        if (match) {
            const players1 = match.team1.players.filter(player => player.id !== userId);
            const players2 = match.team2.players.filter(player => player.id !== userId);

            const players = players1.concat(players2).map(player => {
                return {
                    label: player.name,
                    value: player.id
                }
            });
            setPlayers(players);
        }
    }, [match, userId, setPlayers]);

    const loadMatches = useCallback(async () => {
        setError(null);
        try {
            await dispatch(matchesActions.fetchMatches());
        } catch {
            setError(err.message);
        }
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadMatches);

        return () => {
            willFocusSub.remove();
        };
    }, [loadMatches]);

    useEffect(() => {
        setIsLoading(true);
        loadMatches().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadMatches]);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const submitHandler = useCallback(async () => {
        console.log(JSON.stringify(formState));
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
            return;
        }

        setErrorVoting(null);
        setIsVoting(true);

        try {

            const scores = [
                {
                    playerId: players[0].value,
                    score: formState.inputValues.player1
                },
                {
                    playerId: players[1].value,
                    score: formState.inputValues.player2
                },
                {
                    playerId: players[2].value,
                    score: formState.inputValues.player3
                },
                {
                    playerId: players[3].value,
                    score: formState.inputValues.player4
                },
                {
                    playerId: players[4].value,
                    score: formState.inputValues.player5
                },
                {
                    playerId: players[5].value,
                    score: formState.inputValues.player6
                },
                {
                    playerId: players[6].value,
                    score: formState.inputValues.player7
                },
                {
                    playerId: players[7].value,
                    score: formState.inputValues.player8
                },
                {
                    playerId: players[8].value,
                    score: formState.inputValues.player9
                }
            ];
            await dispatch(voteActions.postVote(
                match.id,
                userId,
                scores,
                formState.inputValues.comment,
                formState.inputValues.terminator,
                formState.inputValues.antifairplay,
                formState.inputValues.goleador,
                formState.inputValues.fantasma
            )
            );
            props.navigation.goBack();
        } catch (err) {
            setErrorVoting(err.message);
        }

        setIsVoting(false);
    }, [dispatch, match, userId, players, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        console.log(inputIdentifier + '-' + inputValue + '-' + inputValidity)
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    if (error) {
        return (
            <View style={styles.screen} >
                <Text>An error ocurred!</Text>
                <Button title="Try Again" color={Colors.primaryColor} onPress={loadMatches} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large' colors={Colors.primaryColor} />
            </View>
        );
    }


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Card style={styles.card}>
                        <ScorePicker
                            id='player1'
                            name={(players[0]) ? players[0].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='player2'
                            name={(players[1]) ? players[1].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='player3'
                            name={(players[2]) ? players[2].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='player4'
                            name={(players[3]) ? players[3].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='player5'
                            name={(players[4]) ? players[4].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='player6'
                            name={(players[5]) ? players[5].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='player7'
                            name={(players[6]) ? players[6].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='player8'
                            name={(players[7]) ? players[7].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='player9'
                            name={(players[8]) ? players[8].label : ''}
                            items={scores}
                            onValueChange={inputChangeHandler}
                        />

                    </Card>
                    <Card style={styles.card}>
                        <ScorePicker
                            id='goleador'
                            name='Goleador'
                            items={players}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='antifairplay'
                            name='Anti-FairPlay'
                            items={players}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='terminator'
                            name='Terminator'
                            items={players}
                            onValueChange={inputChangeHandler}
                        />
                        <ScorePicker
                            id='fantasma'
                            name='Fantasma'
                            items={players}
                            onValueChange={inputChangeHandler}
                        />
                    </Card>
                    <Card style={styles.card}>
                        <Input
                            id='comment'
                            label="Comentario"
                            errorText="Please enter a valid comment!"
                            keyboardType="default"
                            autoCapitalize="sentences"
                            autoCorrect
                            multiline
                            numberOfLines={3}
                            onInputChange={inputChangeHandler}
                            initiallyValid={false}
                            required
                            minLength={5}
                        />
                    </Card>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

PollScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: 'Poll',
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFn}
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
    },
    form: {
        margin: 20
    },
    card: {
        padding: 20,
        marginBottom: 20
    }
});

export default PollScreen;