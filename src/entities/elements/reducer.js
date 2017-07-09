const defaultState = {
    elementsMap: {},
    visibleElements: [],
    unplacedElements: [],
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case 'receiveElement':
            let element = null;
            let unplacedElement = null;

            if (action.element.sectorId === undefined) {
                unplacedElement = `${action.element.id}`;
            } else {
                element = `${action.element.id}`;

                // don't add, duplicate
                const newState = {...state}; // copy old state
                delete newState[`${action.element.id}`]; // delete the item from the object
                const newVisibleElements = newState.visibleElements.filter(e => e !== `${action.element.id}`); // remove item from visible elements
                const newUnplacedElements = newState.unplacedElements.filter(e => e !== `${action.element.id}`);

                return {
                    ...newState,
                    elementsMap: {
                        ...newState.elementsMap,
                        [element]: action.element,
                    },
                    visibleElements: [...newVisibleElements, element],
                    unplacedElements: [...newUnplacedElements],
                };
            }

            return {
                ...state,
                elementsMap: {
                    ...state.elementsMap,
                    [action.element.id]: action.element,
                },
                visibleElements: [...state.visibleElements, element],
                unplacedElements: [...state.unplacedElements, unplacedElement],
            };

        case 'receiveAllElements':
            const visibleElements = {};
            const unplacedElements = {};

            const elements = action.elements.reduce((result, index) => {
                result[`${index.id}`] = index;
                return result;
            }, {});

            const keys = Object.keys(elements);
            for (const key of keys) {
                const e = elements[key];

                if (e.sectorId === null) {
                    unplacedElements[key] = e;
                } else {
                    visibleElements[key] = e;
                }
            }

            const visibleIds = Object.keys(visibleElements);
            const unplacedIds = Object.keys(unplacedElements);

            return {
                ...state,
                elementsMap: {
                    ...state.elementsMap,
                    ...elements,
                },
                visibleElements: [...state.visibleElements, ...visibleIds],
                unplacedElements: [...state.unplacedElements, ...unplacedIds],
            };
        default:
            return state;
    }
}
