export function userIsSignedIn() {
    if (localStorage.cookies === undefined) {
        return false;
    }

    if (JSON.parse(localStorage.cookies).userId === undefined) {
        return false;
    }

    return true;
}

export function currentUserId() {
    if (userIsSignedIn()) {
        return JSON.parse(localStorage.cookies).userId;
    }
}

export function currentUser() {
    if (userIsSignedIn()) {
        return JSON.parse(localStorage.cookies);
    }
}
