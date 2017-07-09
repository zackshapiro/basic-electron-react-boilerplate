const defaultState = {
    user: {},
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case 'logIn':
            return {
                ...state,
                user: action.user,
            };
        case 'receiveLoggedInUser':
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
}
