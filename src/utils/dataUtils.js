
export const isExistent = (element) => {

    return typeof element !== 'undefined' && element !== null;
};


/**
 *
 * @param data {array} Array to search
 * @param needle {*} Key in data from which we want the max value from
 * @returns {number}
 */
export const getMaxValueFromData = (data, needle) => {

    return Math.max.apply(null, data.map(e => e[needle]));
};
