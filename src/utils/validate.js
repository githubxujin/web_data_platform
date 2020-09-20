/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} 
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} 
 * @returns {Boolean}
 */
export function validUsername(str) {

    return /\S{4,16}$/.test(str)
}
