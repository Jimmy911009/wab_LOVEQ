// ===============================================================================================
// 读取本地储存、渲染出购物车页面的函数
function DomFn() {
    if (sessionStorage.getItem("item")) {
        // 如果读取到有本地数据,则进行dom操作.
        var arr = sessionStorage.getItem("item").split("**");
        // 遍历各商品数据列表.
        for (var i = 0; i < arr.length - 1; i++) {
            var data = JSON.parse(arr[i]);
            // 确认商品有没有尺码这参数.
            var size = data.size ? "<p class='osize'>" + data.size + "</p>" : "";
            // 建立新的结点
            var $newDom = $('<div class="olis"><a href="###"><div class="oimg"><img src="' + data.img + '" alt="" /></div> <div class="mui-collapse-content"><p class="oname">' + data.name + '</p> ' + size + '<span>￥<span class="oprice">' + data.price + '</span></span> <p class="onumber"> <section class="mui-numbox"  data-numbox-min="0"><button class="mui-btn mui-numbox-btn-minus" type="button">-</button> <input class="mui-numbox-input" type="number" value="' + data.num + '" /><button class="mui-btn mui-numbox-btn-plus" type="button">+</button> </section> <span class="mui-icon mui-icon-trash mui-pull-right oicon del"></span> </p> </div> </a> </div>');
            $newDom.insertBefore($(".oclearing"));
        }
        // 重新读取商品数据
        shopCount();
        // 创建script标签,准备引入mui.min.js以进行初始化.
        var muiInitial = document.createElement("script");
        muiInitial.setAttribute("src", "../js/mui.min.js");
        // 引入script标签. 因为购物车每次进入都是由js读取数据写入的,可先写入DOM然后再引入mui.js
        document.body.appendChild(muiInitial);
        // input事件绑定.
        inputEventFn();
        // 删除事件绑定
        delFn();
        // 结算事件绑定
        checkoutFn();
    } else {
        console.log("shopcar is empty！");
    }
}

// =====================================================
// 在购物车里更改了数量,直接重新写入storage
function recoverFn() {
    // 将shopCount捆绑在recoverFn的头部
    shopCount();
    // ==================================
    var items = "";
    //如果当前页面存在商品列表,则进行重写,否则直接给空值.
    if ($(".olis")[0]) {
        $(".olis").each(function() {
            var item = {
                "name": "",
                "price": "",
                "num": "",
                "img": "",
                "size": false
            };
            // 获取对应的数据
            item.name = $(this).find(".oname").html();
            item.price = $(this).find(".oprice").html();
            item.num = $(this).find("input").val();
            item.img = $(this).find(".oimg>img").attr("src");
            if ($(".osize")) {
                item.size = $(this).find(".osize").html();
            }
            // 这里需要+=,因为要累加！
            items += JSON.stringify(item) + "**";
        });
    }
    sessionStorage.setItem("item", items);
    // 后台存储购物信息:
    shopcarDataFn();
}

// ========================================================================
// 计算商品数据函数（商品件数、总价格）
function shopCount() {
    // 获取商品列表
    var $olis = $(".olis");
    var tolnum = 0;
    var tolprice = 0;
    // 价格计算
    $olis.each(function() {
        // 获取单价
        var price = parseInt($(this).find(".oprice").html());
        // 获取数量
        var num = parseInt($(this).find("input").val());
        // 总价计算
        tolprice += price * num;
        // 总数量
        tolnum += num;

    });
    var $oclearing = $(".oclearing");
    $oclearing.find(".tolprice").html("￥" + tolprice + ".00");
    $oclearing.find(".tolnum").html(tolnum);
    // 放入本地储存,用作购物车数量小图标同步
    sessionStorage.setItem("shopNum", tolnum);
    // 购物车遮罩层操作
    coverFn();
}

// ========================================================================
// 删除商品列表函数
function delFn() {
    $(".del").on("click", function() {
        $(this).parents(".olis").remove();
        // 重新计算商品数据(放入后台处理中,当后台出错时,数据不会算错---貌似shopCount跟后台数据没什么关系)
        // 而放后台有一个问题,shopCount处理的时间会延迟非常多,体验很差
        // shopCount();
        // 重新获取商品信息,覆盖后台信息
        recoverFn();
    });
}

// =======================================================================
// input事件绑定函数
function inputEventFn() {
    $("section").find("input").on("change", function() {
        // 更正确、简便的写法(shopCount和recover应该写在最后,否则会读取到num=0的商品列表结构):
        if ($(this).val() == 0) {
            $(this).parents(".olis").remove();
        }
        recoverFn();
    });
}

// =======================================================================
// 结算函数,点击结算,所有商品清零.
function checkoutFn() {
    $(".oclearing").find("button").on("tap", function() {
        $(".olis").remove();
        recoverFn();
    });
}

// ======================================================================
// 后台存储购物信息
function shopcarDataFn() {
    localStorage[sessionStorage.username +'Item'] = sessionStorage.item;
    // 修改成功后调用父级的柔性提示
    window.parent.$(".ns-box-inner>p").html("修改成功");
    window.parent.showNoteBoxFn();
}


// ========================================================================
// 购物车遮罩层操作(后续优化：怎样使得遮罩层更快打开)
function coverFn(){
    if(sessionStorage.shopNum && parseInt(sessionStorage.shopNum)>0){
        $(".cover").css("display","none");
    }else{
        $(".cover").css("display","block");
    }
}
