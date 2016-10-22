// 本文件定义了常用的函数方法JQ插件供调用,调用之前请先引入此文件.
// 请各位确认有无需要修改 或 添加的函数方法.


// 给jQuery本身扩展方法
$.extend({
    // 求和方法.
    sum: function(num1, num2) {
        return num1 + num2;
    },

    // 返回随机数(不包含max)
    randomFn: function(min, max) {
        return parseInt(Math.random() * (max - min)) + min;
    },

    // 返回随机数(包含max)
    randomMaxFn: function(min, max) {
        return parseInt(Math.random() * (max - min) + 1) + min;
    },

    // 排序(从小到大)
    sortSFn: function(arr) {
        return arr.sort(function(a, b) {
            return a - b;
        });
    }

    // 排序(从大到小)
    sortXFn: function(arr) {
        return arr.sort(function(a, b) {
            return b - a;
        });
    }

    
});
