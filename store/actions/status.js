export const SET_STATUS = 'SET_STATUS';

export const getStatus = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://fulbito-7d71e.firebaseio.com/status.json?auth=${token}`);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            console.log(resData);

            dispatch({ 
                type: SET_STATUS, 
                status: resData
            });
        } catch (err) {
            throw err;
        }
    }
}

export const updateStatus = (status) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/status.json?auth=${token}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: SET_STATUS,
            status: status
        })
    };
    return;
};