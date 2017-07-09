import * as apiHelper from '../../api-helpers';

export function getSkySetup() {
    const userId = JSON.parse(localStorage.cookies).userId;

    if (userId) {
        return apiHelper.get(
            `${apiHelper.getBaseUrl()}/users/${userId}/sky`,
            {headers: apiHelper.getHeaders()}
        ).catch((error) => {
            return {error};
        });
    } else {
        console.log('Sky setup could not be completed');
    }
}
