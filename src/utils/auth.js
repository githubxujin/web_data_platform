import Cookies from 'js-cookie'

const TokenKey = 'access_token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(response) {
    return Cookies.set(TokenKey, response.access_token, {
        expires: response.expires_in
    })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}




export function setCookie(key,value) {
    // console.log('key',key);
    // console.log('value',value);
    return  Cookies.set(key, value, {
        domain: '.' + document.domain.split('.').slice(-2).join('.'),
        path: '/',
        expires: 1
    })
}

