// NOTE(ZS): Each should have a request/receive pair
// request is used in `takeLatest` in sagas.js to know which generator function to call
// generator function calls the receive action which is a case in `reducer.js` which stores
// the updated info/state in the store

export function requestCreateElement(element) {
    return { type: 'requestCreateElement', element };
}

export function receiveElement(element) {
    return { type: 'receiveElement', element };
}


export function requestAllElements(elements) {
    return { type: 'requestAllElements', elements };
}

export function receiveAllElements(elements) {
    return { type: 'receiveAllElements', elements };
}

// NOTE: receive action same as receiveElement above
export function requestUpdateElement(element) {
    return { type: 'requestUpdateElement', element };
}
