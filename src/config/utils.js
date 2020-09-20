/**
 * 存储localStorage
 */
export function parseWidth(width) {

    if (width !== undefined) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
            width = null;
        }
    }
    return width;
}

export function parseMinWidth(minWidth) {
    if (typeof minWidth !== 'undefined') {
        minWidth = parseWidth(minWidth);
        if (isNaN(minWidth)) {
            minWidth = 80;
        }
    }
    return minWidth;
}

export function parseHeight(height) {
    if (typeof height === 'number') {
        return height;
    }
    if (typeof height === 'string') {
        if (/^\d+(?:px)?$/.test(height)) {
            return parseInt(height, 10);
        } else {
            return height;
        }
    }
    return null;
}
import moment from 'moment'

/**
 * 设置cookie
 * @param name cookie的名称
 * @param value cookie的值
 * @param day cookie的过期时间
 */
export const setCookie = (name, value, day) => {

    if (day !== 0) { // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        var expires = day * 24 * 60 * 60 * 1000
        var date = new Date(+new Date() + expires)
        document.cookie = name + '=' + escape(value) + ';domain=.' + document.domain.split('.').slice(-2).join('.') + ';path=/;expires=' + date.toUTCString()
    } else {
        document.cookie = name + '=' + escape(value)
    }
}
/**
 * 获取对应名称的cookie
 * @param name cookie的名称
 * @returns {null} 不存在时，返回null
 */
export const getCookie = (name) => {
    var arr
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    arr = document.cookie.match(reg)
    if (arr && arr[2]) {
        return unescape(arr[2])
    }
    return ''
}

/**
 * 删除cookie
 * @param name cookie的名称
 */
export const delCookie = (name) => {
    setCookie(name, ' ', -1)
}

export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return
    return window.localStorage.getItem(name)
}
/**
 * 删除localStorage
 */
export const delStore = name => {
    if (!name) return
    return window.localStorage.removeItem(name)
}
/**
 * 存储sessionStorage
 */
export const setSession = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getSession = name => {
    if (!name) return
    return window.sessionStorage.getItem(name)
}
/**
 * 删除sessionStorage
 */
export const delSession = name => {
    if (!name) return
    return window.sessionStorage.removeItem(name)
}

export const formatDate = (val, format = 'YYYY-MM-DD') => {
    if (!val) return ''
    return moment(val).format(format)
}

export const numFormat = (num, t) => {

    if (num === null || num === '' || num === undefined) return ''

    if (!num) return '0.00'
    num = num.toString()

    if (isNaN(num)) {
        num = num.replace(/,/g, '')
    }

    // num = Number(num).toFixed(2) // toFixed会4舍5入

    if (num.includes('.')) { // 修复数字过长自动转为科学计算法
        num += '00'
        num = num.substring(0, num.lastIndexOf('.') + 3)
    } else {
        num += '.00'
    }

    return t === false ? num : num.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            return $1 + ','
        })
    })
}

// 金额转中文
export const NoToChinese = (currencyDigits, fplx) => {
    // Constants:
    var MAXIMUM_NUMBER = 99999999999.99
    // Predefine the radix characters and currency symbols for output:
    var CN_ZERO = '零'
    var CN_ONE = '壹'
    var CN_TWO = '贰'
    var CN_THREE = '叁'
    var CN_FOUR = '肆'
    var CN_FIVE = '伍'
    var CN_SIX = '陆'
    var CN_SEVEN = '柒'
    var CN_EIGHT = '捌'
    var CN_NINE = '玖'
    var CN_TEN = '拾'
    var CN_HUNDRED = '佰'
    var CN_THOUSAND = '仟'
    var CN_TEN_THOUSAND = '万'
    var CN_HUNDRED_MILLION = '亿'
    var CN_SYMBOL = ''
    var CN_DOLLAR = '圆'
    var CN_TEN_CENT = '角'
    var CN_CENT = '分'
    var CN_INTEGER = '整'
    if (fplx === '02' || fplx === '03') {
        CN_DOLLAR = '元'
    }

    // Variables:
    var integral // Represent integral part of digit number.
    var decimal // Represent decimal part of digit number.
    var outputCharacters // The output result.
    var parts
    var digits, radices, bigRadices, decimals
    var zeroCount
    var i, p, d
    var quotient, modulus

    // Validate input string:
    currencyDigits = currencyDigits.toString()
    if (currencyDigits === '') {
        // alert("请输入小写金额！");
        return ''
    }
    if (currencyDigits.match(/[^,.\d]/) != null) {
        if (currencyDigits.substring(0, 1) !== '-') {
            alert('小写金额含有无效字符！')
            return ''
        }
    }
    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
        if (currencyDigits.substring(0, 1) !== '-') {
            alert('小写金额的格式不正确！')
            return ''
        }
    }
    var fushuflag = ''
    if (currencyDigits.substring(0, 1) === '-') {
        if (fplx === '01' || fplx === '04') {
            fushuflag = '（负数）'
        } else if (fplx === '02' || fplx === '03' || fplx === '11') {
            fushuflag = '负数：'
        } else if (fplx === '10') {
            fushuflag = '负'
        } else {
            fushuflag = '（负数）'
        }

        currencyDigits = currencyDigits.substring(1, currencyDigits.length)
    }
    // Normalize the format of input digits:
    currencyDigits = currencyDigits.replace(/,/g, '') // Remove comma delimiters.
    currencyDigits = currencyDigits.replace(/^0+/, '') // Trim zeros at the beginning.
    // Assert the number is not greater than the maximum number.
    if (Number(currencyDigits) > MAXIMUM_NUMBER) {
        alert('金额过大，应小于1000亿元！')
        return ''
    }

    // Process the coversion from currency digits to characters:
    // Separate integral and decimal parts before processing coversion:
    parts = currencyDigits.split('.')
    if (parts.length > 1) {
        integral = parts[0]
        decimal = parts[1]
        // Cut down redundant decimal digits that are after the second.
        decimal = decimal.substr(0, 2)
    } else {
        integral = parts[0]
        decimal = ''
    }
    // Prepare the characters corresponding to the digits:
    digits = [CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE]
    radices = ['', CN_TEN, CN_HUNDRED, CN_THOUSAND]
    bigRadices = ['', CN_TEN_THOUSAND, CN_HUNDRED_MILLION]
    decimals = [CN_TEN_CENT, CN_CENT]
    // Start processing:
    outputCharacters = ''
    // Process integral part if it is larger than 0:
    if (Number(integral) > 0) {
        zeroCount = 0
        for (i = 0; i < integral.length; i++) {
            p = integral.length - i - 1
            d = integral.substr(i, 1)
            quotient = p / 4
            modulus = p % 4
            if (d === '0') {
                zeroCount++
            } else {
                if (zeroCount > 0) {
                    outputCharacters += digits[0]
                }
                zeroCount = 0
                outputCharacters += digits[Number(d)] + radices[modulus]
            }
            if (modulus === 0 && zeroCount < 4) {
                outputCharacters += bigRadices[quotient]
                zeroCount = 0
            }
        }
        outputCharacters += CN_DOLLAR
    }
    // Process decimal part if there is:
    if (decimal !== '') {
        for (i = 0; i < decimal.length; i++) {
            d = decimal.substr(i, 1)
            if (d !== '0') {
                outputCharacters += digits[Number(d)] + decimals[i]
            }
        }
    }
    // Confirm and return the final output string:
    if (outputCharacters === '') {
        outputCharacters = CN_ZERO + CN_DOLLAR
    }
    if (decimal === '' || decimal === '00' || decimal === '0') {
        outputCharacters += CN_INTEGER
    }
    outputCharacters = fushuflag + CN_SYMBOL + outputCharacters
    return outputCharacters
}
export const getParams = (query) => {
    query = query || {}
    query.pageNum && (query.pageNum = +query.pageNum)
    query.pageSize && (query.pageSize = +query.pageSize)
    query.page && (query.page = +query.page)
    query.size && (query.size = +query.size)
    for (const key in query) {
        (!query[key] || !query.hasOwnProperty(key)) && delete query[key]
    }
    return query
}
export const checkFile = (opt) => {
    // 文件类型和大小检测
    const file = Object.assign({
        size: '',
        name: '',
        maxsize: 2 * 1024 * 1024,
        suffix: ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    }, opt)

    let fileSuffix = file.name.slice(file.name.lastIndexOf('.') + 1)
    if (fileSuffix) fileSuffix = fileSuffix.toLowerCase()
    if (!file.size) return true // 低版本ie拿不到size，直接跳过验证
    return file.maxsize > file.size && fileSuffix && file.suffix.includes(fileSuffix)
}
