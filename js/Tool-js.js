// 本文件定义了常用的函数方法供调用,调用之前请先引入此文件.
// 请各位确认有无需要修改 或 添加的函数方法.


function sumFn(num1, num2) {
    return num1 + num2;
}

// 返回随机数(不包含max)
function randomFn(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
}

// 返回随机数(包含max)
function randomMaxFn(min, max) {
    return parseInt(Math.random() * (max - min) + 1) + min;
}

// 排序(从小到大)
function sortSFn(arr) {
    return arr.sort(function(a, b) {
        return a - b;
    });
}

// 排序(从大到小)
function sortXFn(arr) {
    return arr.sort(function(a, b) {
        return b - a;
    });
}
