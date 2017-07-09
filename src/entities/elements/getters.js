// Provide functions for getting data out of the Elements store

// only used in mapStateToProps b/c only place you have access to the store
export function getElementsByKeyName(elementsStore, keyName) {
    return elementsStore[keyName] ? elementsStore[keyName].map(id => elementsStore.elementsMap[id]) : [];
}

export function getElementsBySectorId(elementsStore, sectorId) {
    return elementsStore['visibleElements']
        .filter(id => elementsStore.elementsMap[id].sectorId === sectorId)
        .map(id => elementsStore.elementsMap[id]);
}

export function getElementsBySlotId(elementsStore, slotId) {
    return elementsStore['visibleElements']
        .filter(id => elementsStore.elementsMap[id].slotId === slotId)
        .map(id => elementsStore.elementsMap[id]);
}

export function getAllElements(elementsStore) {
    return elementsStore;
}

export function getAllUnplacedElements(elementsStore) {
    const unplacedKeys = elementsStore.unplacedElements;
    return unplacedKeys.map(id => {
        return elementsStore.elementsMap[id];
    });
}
