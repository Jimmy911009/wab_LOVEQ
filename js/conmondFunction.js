// ===============================================================================================
//初始化内嵌页面
function mInitFn(ourl, otop, obottom) {
    mui.init({
        subpages: [{
            url: ourl,
            // 定死子页面的id,则子页面的name=id=subpage
            id: "subpage",
            styles: {
                top: otop, //mui标题栏默认高度为45px;
                // 在手机端设置此项不起作用===========
                // bottom: '50px' //默认为0px，可不定义;
                bottom: obottom //默认为0px，可不定义;
            }
        }]
    });
}

// ==========================TEST===================================================
// 绑定导航栏跳转操作事件
function swiftFn() {
    var urls = ["list/list_index2.html", "list/list_classify.html", "list/list_shoppingcar.html", "list/myCount.html"]
    $("nav>a").on("tap", function() {
        // 判断当前页面是否为按下的按钮所指向的页面,是就不跳转.
        if (sessionStorage.subhref.indexOf(urls[$(this).index()]) > -1) {
            return;
        } else if ($(this).index() == 2) {
            if (sessionStorage.login) {
                // openWindowFn("index_shoppingcar.html");

                // ====================TEST=====================================
                // 父页面调用子页面函数,子页面id永远都是"subpage";(注意,父页面调用子页面要使用的是子页面的name,而非id,mui生成子页面时name=id)
                window["subpage"].subSwiftFn("list/list_shoppingcar.html");
            } else {
                openWindowFn("index_register.html");
            }
        } else if ($(this).index() == 3) {
            if (sessionStorage.login) {
                // openWindowFn("index_myCount.html");

                // ====================TEST=====================================
                // 父页面调用子页面函数,子页面id永远都是"subpage";(注意,父页面调用子页面要使用的是子页面的name,而非id,mui生成子页面时name=id)
                window["subpage"].subSwiftFn("list/myCount.html");
            } else {
                openWindowFn("index_register.html");
            }
        } else {
            // openWindowFn(urls[$(this).index()]);

            // ====================TEST=====================================
            console.log(urls[$(this).index()]);
            window["subpage"].subSwiftFn(urls[$(this).index()]);
            // 还是需要list/这个路径,因为index.html调用此函数,其目录是...Combine_v1.0.0/,
            // 如果只给list_index2,则Combine_v1.0.0/list_index2.html,报找不到此文件.
        }
    });
}

// ===============================================================================================
// MUI-打开新页面函数API.
function openWindowFn(newurl) {
    mui.openWindow({
        url: newurl,
        id: newurl,
        styles: {
            top: "0px", //新页面顶部位置
            bottom: "0px" //新页面底部位置
        },
        createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
    });
}


// ===================TEST==========================
// 读取各导航栏子页面首页的href的函数,用以1.避免重复跳转 + 2.刷新页面时回到当前导航栏下的首页;
// 增加一个导航激活指数,用以标志激活哪个导航栏.
function subhrefFn(index){
    sessionStorage.subhref = window.location.href;
    sessionStorage.activeIndex = index;
}

// ===============================================================================================
// 购物车商品数量小图标同步(需要在有框架的页面中设置)
function shopcarNumFn() {
    // 如果sessionStorage.getItem("shopNum")还没有值,就取0;
    var num = sessionStorage.getItem("shopNum") || "0";
    $("#shopNum").html(num);
}

// ===============================================================================================
// 读取商品数量，并写入本地储存的函数.
function shopNumFn() {
    var arr = sessionStorage.getItem("item").split("**");
    var num = 0;
    // 遍历各商品数据列表.
    for (var i = 0; i < arr.length - 1; i++) {
        var data = JSON.parse(arr[i]);
        num += parseInt(data.num);
    }
    sessionStorage.setItem("shopNum", num);
}

// ===============================================================================================
// localStorage后台存储购物信息.
function shopDataFn(fn) {
    localStorage[sessionStorage.username +'Item'] = sessionStorage.item;
    // 购物成功后的柔性提示
    window.parent.$(".ns-box-inner>p").html("成功放入购物车");
    window.parent.showNoteBoxFn();
    // 回调函数
    fn();
}

// ========================...在ios端无效...============================================================
// 返回顶部函数
function toTopFn() {
    $("#topBtn").on("tap", function() {
        $("body,html").animate({
            "scrollTop": 0
        });
    });
}
// 滚动显隐返回顶部组件
function showHideFn() {
    $(window).scroll(function() {
        // 因为scrollTop在chrome和IE/FF中存在兼容问题
        // chorme：document.body.scrollTop .... IE、firefox：document.documentElement.scrollTop;
        // console.log($(window).scrollTop());
        if ($(window).scrollTop() > 300) {
            $("#topBtn").fadeIn(300);
        } else {
            $("#topBtn").fadeOut(300);
        }
    });
}

// ===============================================================================================
// 柔性弹框函数(alert弹窗太强硬了)
function showNoteBoxFn() {
    $(".ns-box").stop().fadeIn(300,function(){
        $(this).delay(1500).fadeOut(300);
    });
}
