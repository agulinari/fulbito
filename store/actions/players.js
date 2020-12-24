import Player from "../../models/player";

export const DELETE_PLAYER = 'DELETE_PLAYER';
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const SET_PLAYERS = 'SET_PLAYERS';


export const fetchPlayers = () => {

    return async (dispatch, getState) => {
        try {

            const token = getState().auth.token;
            const response = await fetch(`https://fulbito-7d71e.firebaseio.com/players.json?auth=${token}`);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();

            const loadedPlayers = [];
            for (const key in resData) {
                loadedPlayers.push(
                    new Player(
                        key,
                        resData[key].avatar,
                        resData[key].name,
                        resData[key].description,
                        resData[key].address,
                        resData[key].tel,
                        resData[key].email
                    )
                )
            }
            dispatch({ type: SET_PLAYERS, players: loadedPlayers })
        } catch (err) {
            throw err;
        }
    }
};

export const deletePlayer = playerId => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/players/${playerId}.json?auth=${token}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
    
        dispatch({ type: DELETE_PLAYER, pid: playerId });
    }
};

export const createPlayer = (avatar, name, description, address, tel, email) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/players.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar,
                name,
                description,
                address,
                tel,
                email
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_PLAYER,
            playerData: {
                id: resData.name,
                avatar: avatar,
                name: name,
                description,
                address,
                tel,
                email
            }
        });
    }
};


export const updatePlayer = (id, avatar, name, description, address, tel, email) => {

    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/players/${id}.json?auth=${token}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar,
                name,
                description,
                address,
                tel,
                email
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PLAYER,
            pid: id,
            playerData: {
                avatar: avatar,
                name: name,
                description,
                address,
                tel,
                email
            }
        });
    }
};