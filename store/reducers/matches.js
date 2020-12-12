import { MATCHES } from '../../data/dummy-data';
import { DELETE_MATCH, CREATE_MATCH, UPDATE_MATCH, SET_MATCHES } from '../actions/matches';
import Match from '../../models/match';

const initalState = {
    matches: MATCHES
};

export default (state = initalState, action) => {
    switch (action.type) {
        case SET_MATCHES:
            return {
                matches: action.matches
            };
        case CREATE_MATCH:
            const newMatch = new Match(
                action.matchData.id, 
                action.matchData.title, 
                action.matchData.date, 
                action.matchData.place,
                action.matchData.team1,
                action.matchData.team2
                );
            return {
                ...state,
                matches: state.matches.concat(newMatch)
            };
        case UPDATE_MATCH:
            const matchIndex = state.matches.findIndex(match => match.id === action.mid);
            const updatedMatch = new Match(
                action.mid, 
                action.matchData.title, 
                action.matchData.date, 
                action.matchData.place,
                action.matchData.team1,
                action.matchData.team2
                );
            const updatedMatches = [...state.matches];
            updatedMatches[matchIndex] = updatedMatch;
            return {
                ...state,
                matches: updatedMatches
            }
        case DELETE_MATCH:
            return {
                ...state,
                matches: state.matches.filter(
                    match => match.id !== action.mid
                )
            };
    }
    return state;
};