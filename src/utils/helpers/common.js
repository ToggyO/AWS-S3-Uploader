/**
 * Lodash.get function implementation
 * Lets you safely retrieve a property of an object
 * https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab
 */
export function getProp(object, keys, defaultVal) {
    const keysArray = Array.isArray(keys) ? keys : keys.split('.');
    const result = object[keysArray[0]];
    if (result && keysArray.length > 1) {
        return getProp(result, keysArray.slice(1));
    }

    if (object === undefined) {
        return defaultVal;
    }

    return result;
}
