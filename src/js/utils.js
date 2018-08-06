export const omit = (key, object) => {
    const {['' + key]: deletedKey, ...notKey} = object;
    return notKey;
};