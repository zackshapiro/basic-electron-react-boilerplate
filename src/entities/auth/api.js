import * as apiHelper from '../../api-helpers';

export function logInUser(user) {
    return apiHelper.post(
        `${apiHelper.getBaseUrl()}/login`,
        {user},
        {headers: apiHelper.getHeaders()}
    ).catch((error) => {
        return {error};
    });
}
