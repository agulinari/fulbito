import { PLAYERS } from '../../data/dummy-data';
import { DELETE_PLAYER, CREATE_PLAYER, UPDATE_PLAYER, SET_PLAYERS } from '../actions/players';
import Player from '../../models/player';

const initalState = {
    players: PLAYERS
};

export default (state = initalState, action) => {
    switch (action.type) {
        case SET_PLAYERS:
            return {
                ...state,
                players: action.players
            };
        case CREATE_PLAYER:
            const newPlayer = new Player(
                action.playerData.id, 
                action.playerData.avatar, 
                action.playerData.name, 
                action.playerData.description,
                action.playerData.address,
                action.playerData.tel,
                action.playerData.email
                );
            return {
                ...state,
                players: state.players.concat(newPlayer)
            };
        case UPDATE_PLAYER:
            const playerIndex = state.players.findIndex(player => player.id === action.pid);
            const updatedPlayer = new Player(
                action.pid, 
                action.playerData.avatar,
                action.playerData.name,
                action.playerData.description,
                action.playerData.address,
                action.playerData.tel,
                action.playerData.email
                );
            const updatedPlayers = [...state.players];
            updatedPlayers[playerIndex] = updatedPlayer;
            return {
                ...state,
                players: updatedPlayers
            }
        case DELETE_PLAYER:
            return {
                ...state,
                players: state.players.filter(
                    player => player.id !== action.pid
                )
            };
    }
    return state;
};