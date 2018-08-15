export const omit = (key, object) => {
    const {['' + key]: deletedKey, ...notKey} = object;
    return notKey;
};

export const dataType = (data) => {
    if(data === undefined || data === null) return 'undefined';
    if(data.constructor === String) return 'string';
    if(data.constructor === Array) return 'array';
    if(data.constructor === Object) return 'object';
    if(data.constructor === Number) return 'number';
    if(data.constructor === Boolean) return 'boolean';
    if(data.constructor === Function) return 'function';
    if(data.constructor === Date) return 'date';
    if(data.constructor === RegExp) return 'regex';
    return 'unknown';
};

/**
 * calculate deep difference between objects
 * by StefansArya
 * https://stackoverflow.com/questions/8572826/generic-deep-diff-between-two-objects
 * @param obj1
 * @param obj2
 * @returns {*}
 */
export const objectDifference = (obj1, obj2) => {
    if((dataType(obj1) !== 'array' && dataType(obj1) !== 'object') || (dataType(obj2) !== 'array' && dataType(obj2) !== 'object')){
        let type = '';

        if(obj1 === obj2 || (dataType(obj1) === 'date' && dataType(obj2) === 'date' && obj1.getTime() === obj2.getTime()))
            type = 'unchanged';
        else if(dataType(obj1) === 'undefined')
            type = 'created';
        if(dataType(obj2) === 'undefined')
            type = 'deleted';
        else if(type === '') type = 'updated';

        return {
            type: type,
            data:(obj1 === undefined) ? obj2 : obj1
        };
    }

    let diff = null;

    if(dataType(obj1) === 'array' && dataType(obj2) === 'array'){
        diff = [];
        obj1.sort(); obj2.sort();
        for(let i = 0; i < obj2.length; i++){
            let type = obj1.indexOf(obj2[i]) === -1?'created':'unchanged';
            if(type === 'created' && (dataType(obj2[i]) === 'array' || dataType(obj2[i]) === 'object')){
                diff.push(
                    objectDifference(obj1[i], obj2[i])
                );
                continue;
            }
            diff.push({
                type: type,
                data: obj2[i]
            });
        }

        for(let i = 0; i < obj1.length; i++){
            if(obj2.indexOf(obj1[i]) !== -1 || dataType(obj1[i]) === 'array' || dataType(obj1[i]) === 'object')
                continue;
            diff.push({
                type: 'deleted',
                data: obj1[i]
            });
        }
    } else {
        diff = {};
        let key = Object.keys(obj1);
        for(let i = 0; i < key.length; i++){
            let value2 = undefined;
            if(dataType(obj2[key[i]]) !== 'undefined')
                value2 = obj2[key[i]];

            diff[key[i]] = objectDifference(obj1[key[i]], value2);
        }

        key = Object.keys(obj2);
        for(let i = 0; i < key.length; i++){
            if(dataType(diff[key[i]]) !== 'undefined')
                continue;

            diff[key[i]] = objectDifference(undefined, obj2[key[i]]);
        }
    }

    return diff;
};