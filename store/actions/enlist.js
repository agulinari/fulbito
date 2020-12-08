export const ENLIST = 'ENLIST';
export const SET_LIST = 'SET_LIST';

export const fetchList = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://fulbito-7d71e.firebaseio.com/list.json?auth=${token}`);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedList = [];

            for (const key in resData) {
                loadedList.push(key);
            }
            dispatch({ type: SET_LIST, list: loadedList });
        } catch (err) {
            throw err;
        }
    }
}

export const enlistUser = (userId) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/list.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: ENLIST,
            userData: {
                userId: userId
            }
        })
    };
    return;
};