import { SET_STATUS } from "../actions/status";

const initialState = {
    status: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
    }

    return state;
};
