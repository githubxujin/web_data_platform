export {
    parseTime,
    formatTime
}
from '@/utils'
import moment from 'moment'
export const formatDate = (val, format = 'YYYY-MM-DD') => {
    if (!val) return ''
    return moment(val).format(format)
}
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
    const si = [{
            value: 1E18,
            symbol: 'E'
        },
        {
            value: 1E15,
            symbol: 'P'
        },
        {
            value: 1E12,
            symbol: 'T'
        },
        {
            value: 1E9,
            symbol: 'G'
        },
        {
            value: 1E6,
            symbol: 'M'
        },
        {
            value: 1E3,
            symbol: 'k'
        }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function numFormat2(num) {
    return (+num || 0).toFixed(2).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export function numFormat(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export function toFixedNumFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}
/*
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
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

//获取去年到今年上个月日期
export function getDateArr() {
    let date = new Date()
    let t_year = date.getFullYear()
    let t_month = date.getMonth() + 1
    let up_year = t_year - 1
    let total = 12 + t_month - 2
    let arr = []
    let num


    for (let i = 0; i < total; i++) {
        if (t_month + i > 12) {
            num = t_month + i - 12
            arr.push({
                date: (up_year + 1) + '-' + Appendzero(num)
            })
        } else {
            num = t_month + i;
            arr.push({
                date: up_year + '-' + Appendzero(num)
            })
        }
    }
    return arr
}

function Appendzero(obj) {
    if (obj < 10) return "0" + "" + obj;
    else return obj;
}
