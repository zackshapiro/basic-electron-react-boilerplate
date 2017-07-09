export function requestSkySetup(sky) {
    return { type: 'requestSkySetup', sky };
}

export function receiveSkySetup(sky) {
    return { type: 'receiveSkySetup', sky };
}
