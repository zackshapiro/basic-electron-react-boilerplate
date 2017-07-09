const defaultState = {
    sectors: [],
    slots: [],
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case 'receiveSkySetup':
            return {
                ...state,
                sectors: action.sky.sectors,
                slots: action.sky.slots,
            };
        default:
            return state;
    }
}
