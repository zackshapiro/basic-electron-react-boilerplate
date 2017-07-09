import fetch from 'isomorphic-fetch';

// @TODO encapsulate things like env checking in here
export function getHeaders() {
    let authToken = null;
    const headers = {
        'X-App-ID': 'Glimpse',
        'Content-Type': 'application/json',
    };

    if (localStorage.cookies === undefined) {
        return headers;
    } else {
        authToken = JSON.parse(localStorage.cookies).authToken;
    }

    if (authToken) {
        return {
            ...headers,
            authorization: `Bearer ${authToken}`,
        };
    }

    return headers;
}

// change to https
export function getBaseUrl() {
    if (process.env.NODE_ENV === 'production') {
        return 'http://glimpsebeta.com/v1';
    } else {
        return 'http://localhost:3001/v1';
    }
}

export function buildQueryString(query) {
    return Object.keys(query)
        .map(key => {
            const value = query[key];
            if (value === undefined || value === null || value === '') {
                return false;
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
        })
        .filter(param => param)
        .join(`&`);
}

// @TODO handle different statuses, including errors
export function parseResponse(response) {
    return response.json();
}

// Creating wrappers for common methods, expecting they will evolve
export function get(path, options = {}) {
    const opts = {
        ...options,
        method: 'GET',
    };

    return fetch(path, opts).then(parseResponse);
}

export function post(path, body, options = {}) {
    const opts = {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'accept': 'application/json',
            ...options.headers,
        },
    };

    return fetch(path, opts).then(parseResponse);
}

export function patch(path, payload, options = {}) {
    const opts = {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'accept': 'application/json',
            ...options.headers,
        },
    };

    return fetch(path, opts).then(parseResponse);
}

export function put(path, body, options = {}) {
    const opts = {
        ...options,
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'accept': 'application/json',
            ...options.headers,
        },
    };

    return fetch(path, opts).then(parseResponse);
}

export function del(path, options = {}) {
    const opts = {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            ...options.headers,
        },
    };

    return fetch(path, opts).then(parseResponse);
}
