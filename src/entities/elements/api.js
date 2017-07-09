import * as apiHelper from '../../api-helpers';

export function postElement(element) {
    const userId = JSON.parse(localStorage.cookies).userId;
    element.userId = userId;

    if (userId) {
        return apiHelper.post(
            `${apiHelper.getBaseUrl()}/users/${element.userId}/elements`,
            {element},
            {headers: apiHelper.getHeaders()}
        ).catch((error) => {
            return {error};
        });
    } else {
        console.log('user ID could not be found for request');
    }
}

export function getElements() {
    const userId = JSON.parse(localStorage.cookies).userId;

    if (userId) {
        return apiHelper.get(
            `${apiHelper.getBaseUrl()}/users/${userId}/elements`,
            {headers: apiHelper.getHeaders()}
        ).catch((error) => {
            return {error};
        });
    } else {
        console.log('user ID could not be found for request');
    }
}


export function updateElement(element) {
    const userId = JSON.parse(localStorage.cookies).userId;

    if (userId) {
        return apiHelper.put(
            `${apiHelper.getBaseUrl()}/users/${element.userId}/elements/${element.id}`,
            {element},
            {headers: apiHelper.getHeaders()}
        ).catch((error) => {
            return {error};
        });
    } else {
        console.log('user ID could not be found for request');
    }
}
