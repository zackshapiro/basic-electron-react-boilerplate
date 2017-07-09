export function signUp(registration, callback) {
    console.log(registration);

    return { type: 'signUp', registration, callback };
}

export function logIn(user, callback) {
    console.log(user);

    return { type: 'logIn', user, callback };
}

export function receiveLoggedInUser(user) {
    return { type: 'receiveLoggedInUser', user };
}
