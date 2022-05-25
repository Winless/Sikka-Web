


export function isNull(val) {
    if (typeof val === 'boolean') {
        return false;
    }
    if (typeof val === 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
        return false;
    }
    return false;
}

//
export function isMobileTerminal() {

}

export function numFT(value, minLen, maxLen, cen) {
    if (isNaN(value)) return 0;
    minLen = minLen || 4;
    maxLen = maxLen || 6;
    cen = cen || 10;
    value = Number(value);
    if (Math.abs(value) < cen) {
        return toFixeds(value, minLen);
    } else {
        return toFixeds(value, maxLen);
    }
}

/**
 * 输出语句
 */
export function trace(message, ...optionalParams) {
    if (global.openLog) console.log(message, ...optionalParams);
}


export function changeSymbol(value) {
    if (value == "WETH") return "ETH";
    return value;
}

export function removeZERO(value) {
    let str = String(value);
    let id = str.indexOf(".")
    if (id >= 0) {
        while (str.slice(-1) == "0") {
            str = str.slice(0, -1)
        }
        if (str.slice(-1) == ".") {
            str = str.slice(0, -1)
        }
    }
    return str;
}


export function toFixed2Str(value) {
    let str = Number(value).toFixed(2);
    return removeZERO(str)
}

export function toFixed4Str(value) {
    let str = Number(value).toFixed(4);
    return removeZERO(str)
}

export function toFixed6Str(value) {
    let str = Number(value).toFixed(6);
    return removeZERO(str)
}

export function toFixed8Str(value) {
    let str = Number(value).toFixed(8);
    return removeZERO(str)
}

export function toFixedStrs(value, len) {
    let str = Number(value).toFixed(len);
    return removeZERO(str)
}

export function toSFR(value) {
    let len = 6
    if (Number(value) > 1) {
        return len
    } else if (Number(value) > 0.01) {
        return len
    } else if (Number(value) > 0.001) {
        return len + 1
    } else if (Number(value) > 0.0001) {
        return len + 2
    } else if (Number(value) > 0.00001) {
        return len + 3
    } else if (Number(value) > 0.000001) {
        return len + 4
    } else if (Number(value) > 0.0000001) {
        return len + 5
    } else if (Number(value) > 0.00000001) {
        return len + 6
    } else if (Number(value) > 0.000000001) {
        return len + 7
    } else if (Number(value) > 0.0000000001) {
        return len + 8
    } else if (Number(value) > 0.00000000001) {
        return len + 9
    } else if (Number(value) > 0.000000000001) {
        return len + 10
    }

    return 16;
}


export function toFixedChange(value, len) {
    len = len || 4
    if (Number(value) > 1) {
        return toFixeds(value, len)
    } else if (Number(value) > 0.01) {
        return toFixeds(value, 4)
    } else if (Number(value) > 0.0001) {
        return toFixeds(value, 6)
    } else if (Number(value) > 0.000001) {
        return toFixeds(value, 8)
    } else if (Number(value) > 0.00000001) {
        return toFixeds(value, 10)
    } else if (Number(value) > 0.0000000001) {
        return toFixeds(value, 12)
    } else if (Number(value) > 0.000000000001) {
        return toFixeds(value, 14)
    } else if (Number(value) > 0.00000000000001) {
        return toFixeds(value, 16)
    }
}


/**
 * 保留2位有效数据
 * @param value （string/Number）
 */
export function toFixed2(value) {

    if (Math.abs(Number(value)) < 0.01) return 0;
    let a = Math.floor(Number(value) * Math.pow(10, 2));
    value = a * Math.pow(10, -2)
    return parseFloat(Number(Number(value).toFixed(2)))
}


/**
 * 保留4位有效数据
 * @param value （string/Number）
 */
export function toFixed4(value) {

    if (Math.abs(Number(value)) < 0.0001) return 0;
    let a = Math.floor(Number(value) * Math.pow(10, 4));
    value = a * Math.pow(10, -4)
    return parseFloat(Number(Number(value).toFixed(4)))
}

/**
 * 保留6位有效数据
 * @param value （string/Number）
 */
export function toFixed6(value) {
    if (Math.abs(Number(value)) < 0.000001) return 0;
    let a = Math.floor(Number(value) * Math.pow(10, 6));
    value = a * Math.pow(10, -6)
    return parseFloat(Number(Number(value).toFixed(6)))
}

/**
 * 保留8位有效数据
 * @param value （string/Number）
 */
export function toFixed8(value) {
    if (Math.abs(Number(value)) < 0.00000001) return 0;
    let a = Math.floor(Number(value) * Math.pow(10, 8));
    value = a * Math.pow(10, -8)
    return parseFloat(Number(Number(value).toFixed(8)))
}

/**
 * 保留12位有效数据
 * @param value （string/Number）
 */
export function toFixed12(value) {
    if (Math.abs(Number(value)) < 0.000000000001) return 0;
    let a = Math.floor(Number(value) * Math.pow(10, 12));
    value = a * Math.pow(10, -12)
    return parseFloat(Number(Number(value).toFixed(12)))
}

/**
 * 保留16位有效数据
 * @param value （string/Number）
 */
export function toFixed16(value) {
    if (Math.abs(Number(value)) < 0.0000000000000001) return 0;
    let a = Math.floor(Number(value) * Math.pow(10, 16));
    value = a * Math.pow(10, -16)
    return parseFloat(Number(Number(value).toFixed(16)))
}

export function toFixeds(value, num) {
    if (!num || num < 2) num = 2;
    if (Math.abs(Number(value)) < Math.pow(10, -num)) return 0;

    let a = Math.floor(Number(value) * Math.pow(10, num));
    value = a * Math.pow(10, -num)
    return parseFloat(Number(Number(value).toFixed(num)))
}

export function resetStringKMG(value) {
    // trace("resetString=",value,value=="",value==0)
    if (value == "") return "0";
    if (value == 0) return "0.00";
    if (isNaN(value)) return "0.00"
    let a = "";
    let b = ""
    if (Number(value) < 0) {
        value = Math.abs(Number(value));
        a = "-";
    }

    value = Number(value)
    if (value >= 1000 * 1000 * 1000) {
        b = toFixed2(value / (1000 * 1000 * 1000)) + "b"
    } else if (value >= 1000 * 1000) {
        b = toFixed2(value / (1000 * 1000)) + "m"
    } else if (value >= 1000) {
        b = toFixed2(value / (1000)) + "k"
    } else {
        b = toFixed2(value);
    }

    return a + b;
}

export function resetStringKMG2(value) {
    // trace("resetString=",value,value=="",value==0)
    if (value == "") return "0.00";
    if (value == 0) return "0.00";
    if (isNaN(value)) return "0.00"
    let a = "";
    let b = ""
    if (Number(value) < 0) {
        value = Math.abs(Number(value));
        a = "-";
    }
    value = Math.abs(Number(value))

    if (value >= 1000 * 1000 * 1000) {
        b = (value / (1000 * 1000 * 1000)).toFixed(2) + "b"
    } else if (value >= 1000 * 1000) {
        b = (value / (1000 * 1000)).toFixed(2) + "m"
    } else if (value >= 1000) {
        b = (value / (1000)).toFixed(2) + "k"
    } else {
        b = (value).toFixed(2);
    }

    return a + b;
}

export async function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}


export function toThousands(num) {
    if (Math.abs(Number(num)) < 1000) return num;
    num = parseInt(Number(num));
    num = (num || 0).toString();
    let re = /\d{3}$/;
    let result = '';
    while (re.test(num)) {
        result = RegExp.lastMatch + result;
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) {
        result = num + result;
    }
    return result;
}
export function getRandom(num1,num2){
    let transition = num2-num1+1;
    let res = Math.floor(Math.random()*transition+num1)
    return res;
}
export function strToElement(str){
    const template = str;
    let tempNode = document.createElement("div");
    tempNode.innerHTML = template;
    return tempNode.firstChild;
}
export function notification(obj,{type,title,content,url})
{
    let icon = {
        success: strToElement('<a-icon type="check-circle" theme="filled" style="color: #00FF88" />'),
        error: strToElement('<a-icon type="close-circle" theme="filled" style="color: #FF2C0D" />'),
    }

    obj[type]({
        top: "64px",
        message: title,
        description: content,
        class: "notification-" + type + "-m1",
        duration: 5000,
        icon: icon[type],
        btn: h => {
            return h(
                'a-button',
                {
                    props: {
                        type: 'link',
                        size: 'small',
                    },
                    on: {
                        click: () => window.open(url),
                    },
                },
                'View on Etherscan',
            );
        },
    });
}



export function toThousands2(num,w) {
    if(w!=null){
        num = toFixeds(num,w)
    }
    let afer = "";
    if (Number(num) < 0) afer = "-"
    if (Math.abs(Number(num)) < 1000) return num;
    let str = String(Math.abs(Number(num)));
    if (str.indexOf(".") >= 0) {
        str = str.slice(str.indexOf("."));
    } else {
        str = "";
    }

    num = parseInt(Math.abs(Number(num)));
    num = (num || 0).toString();
    let re = /\d{3}$/;
    let result = '';
    while (re.test(num)) {
        result = RegExp.lastMatch + result;
        if (num !== RegExp.lastMatch) {
            result = ',' + result;
            num = RegExp.leftContext;
        } else {
            num = '';
            break;
        }
    }
    if (num) {
        result = num + result;
    }
    return afer + result + str;
}

export function resetString(value) {
    let len = 8;
    if (String(value).length <= len) return this.toThousands(value);
    return this.toThousands(String(value).slice(0, len)) + "...";
}


export function hkGetTimeFmt(time) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    return dateFormatCC("YYYY/mm/dd HH:MM:SS", d)
}

export function hkGetTimeFmt2(time) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    return dateFormatCC("YYYY/mm/dd HH:MM", d)
}


export function hkGetTimeMDHM(time) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    return dateFormatCC("mm/dd HH:MM", d)
}

export function hkGetTimeMD(time) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    return dateFormatCC("mm/dd", d)
}

/**
 * 剩余时间毫秒
 * @param lefttime
 * @returns {string}
 */
export function hkGetTime(lefttime) {
    // var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
    var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
        lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
        leftm = Math.floor(lefttime / (1000 * 60) % 60) //计算分钟数
    // lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
    return leftd + "d " + lefth + "h " + leftm + "m ";  //返回倒计时的字符串
}

export function hkGetTimeHM(time) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    return dateFormatCC("HH:MM", d)
}

/**
 * 时间格式转换
 * @param fmt  dateFormatCC()"YYYY-mm-dd HH:MM:SS"
 * @param date
 * @returns {*}   dateFormat("YYYY-mm-dd HH:MM:SS", new Date(Number(date)));
 */
export function dateFormatCC(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}

export function toDate(date) {
    date = date || new Date();
    let a = date.toDateString();
    let b = a.indexOf(" ");
    return a.slice(b + 1);
}

/**
 * 清楚非数字字符
 * @param obj
 */
export function clearNoNum(value) {
    trace("clearNoNum-", value)
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    // value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    if (value.indexOf(".") < 0 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        value = parseFloat(value);
    }
    return value
}


export function isFlipPrice(value) {
    return (value == "USDC" || value == "USDT")
}



//
// export function getIcon(symbol) {
//     if (symbol == "WETH") symbol = "ETH";
//     let list = getPoolList();
//     let obj = list.find((item) => {
//         if (item.symbol == "WETH") item.symbol = "ETH"
//         return item.symbol == symbol
//     })
//     if (obj) {
//         return symbol;
//     }
//     return "unknow";
// }


export function findValue(list, key, value) {
    const _item = list.find((item) => {
        return item[key] == value;
    })
    trace("findValue", key, value, _item)
    return _item || {};
}

export function findObject(list, obj) {
    let _item;
    if (list && obj) {
        for (let i = 0; i < list.length; i++) {
            let key1 = 0;
            let keyLen = 0;
            for (let key in obj) {
                keyLen += 1;
                if (list[i][key] == obj[key]) {
                    key1 += 1;
                }
            }
            if (key1 == keyLen) {
                _item = list[i];
                break;
            }
        }
    }
    // trace("_item=", _item)
    return _item || {};
}



export function getMoreNumber(value, num) {
    num = num || 6;
    const str = String(value);
    // const str = value.toLocaleString();
    trace("getMoreNumber-value=", str)
    const isMinus = str.indexOf("-") >= 0;
    const isDecimal = str.indexOf(".") >= 0;
    if (isDecimal) {
        const dotIndex = str.indexOf(".");
        let obj = "";
        obj = Number(str.slice(0, dotIndex + num + 1))
        if (isMinus) {        //-
            if (Number(str.slice(dotIndex + num + 1)) > 0) {
                obj -= Math.pow(10, -num)
            }
        } else {              //+
        }
        return obj;

    } else {
        return Number(str);
    }
}

