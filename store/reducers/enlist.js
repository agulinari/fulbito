import { ENLIST, SET_LIST } from "../actions/enlist";

const initialState = {
    list: []
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                list: action.list
            }
        case ENLIST:
            return {
                ...state,
                list: state.list.concat(action.userData.userId)
            };
    }

    return state;
};
