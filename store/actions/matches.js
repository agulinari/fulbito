import Match from "../../models/match";

export const DELETE_MATCH = 'DELETE_MATCH';
export const CREATE_MATCH = 'CREATE_MATCH';
export const UPDATE_MATCH = 'UPDATE_MATCH';
export const SET_MATCHES = 'SET_MATCHES';

export const fetchMatches = () => {

    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://fulbito-7d71e.firebaseio.com/matches.json?auth=${token}`);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();

            //console.log(resData);

            const loadedMatches = [];
            for (const key in resData) {
                loadedMatches.push(
                    new Match(
                        key,
                        resData[key].title,
                        resData[key].date,
                        resData[key].place,
                        resData[key].team1,
                        resData[key].team2
                    )
                )
            }
            dispatch({ type: SET_MATCHES, matches: loadedMatches })
        } catch (err) {
            throw err;
        }
    }
};

export const deleteMatch = matchId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/matches/${matchId}.json?auth=${token}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
    
        dispatch({ type: DELETE_MATCH, mid: matchId });
    }
};

export const createMatch = (title, date, place, team1, team2) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/matches.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                date,
                place,
                team1,
                team2
            })
        });

        const resData = await response.json();

        console.log(resData);

        dispatch({
            type: CREATE_MATCH,
            matchData: {
                id: resData.name,
                title: title,
                date: date,
                place,
                team1,
                team2
            }
        });
    }
};


export const updateMatch = (id, avatar, name, description) => {

    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/matches/${id}.json?auth=${token}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar,
                name,
                description
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_MATCH,
            mid: id,
            matchData: {
                title: title,
                date: date,
                place,
                team1,
                team2
            }
        });
    }
};