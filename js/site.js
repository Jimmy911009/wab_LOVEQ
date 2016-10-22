
//-----------填写信息*----------
var $siteUl = $("#site_ul>li").eq(1);
//点击却换填写信息页面
$siteUl.click(function(){
	$("#site_wrap").css("display","none");
	$("#write_wrap").css("display","block");

	//初始化
	//获取
	$("input").val('');
	$("textarea").val('');
	//添加返回按钮
	$("#write_wrap").find($("a")).on("click",function(){
		$("#site_wrap").css("display","block");
		$("#write_wrap").css("display","none");			
	})
	writeIntFn();
});

function writeIntFn(){
	console.log('填写信息');

	// 点击确定后输出数组
	var $star = $("h2");
	//点击确认健
	$star.off("click").on("click",function(){
		console.log('dianji');
		// 定义数组来保存用户信息
		var iptarr = [];
		//获取
		var $writeInt = $("input");
		//判断是否为空
		if($("textarea").val() == "" && $writeInt.val() == ""){
			alert('请输入完整信息');
			return;
		}else{
			$writeInt.each(function(i){
				iptarr[i] = $(this).val();
			});
			iptarr.push($("textarea").val());
			console.log('数组储蓄完成');
			additionFn(iptarr);
		}

	});
}
function additionFn(iptarr){
	console.log('编辑结构添加主页面');
	$("#site_wrap").css("display","block");
	$("#write_wrap").css("display","none");

	// 创建标签保存内容
	$center = $(
			"<div id='site_one'>"+
				"<div id='site_one_left'>"+
					"<img class='pitch_on' src='image/elect_1.png' alt=''>"+
					"<dl>"+
						"<dt><p id='user'>"+iptarr[0]+"</p><span id='handset'>"+iptarr[1]+"</span></dt>"+
						"<dd>"+iptarr[2]+"</dd>"+
					"</dl>"+
				"</div>"+
				"<ul id='compile'>"+
					"<li class='remove'><img src='image/rom.png' alt=''>删除</li>"+
					"<li>"+"<b>"+"<img src='image/redact.png' alt=''>"+"编辑</b>"+"</li>"+
				"</ul>"+
			"</div>"
		);

	// 把创建的信息添加到上一个页面中
	$("#site_head").append($center);
	// 增加编辑按钮
	compileinputFn();
	// 增加删除按钮
	removeFn();	
	//选中地址
	pitchOnFn();
}

//-----------------编辑按钮-----------------
compileinputFn();
function compileinputFn(){
	console.log('编辑按钮');
	//初始化
	$("#compile_wrap").html('');
	//获取第一页面中的编辑和删除
	//获取编辑标签
	var $compB = $("b");
	$compB.off("click").on("click",function(){
		//获取它父级
		//设置为全局
		 $compBPar = $(this).parents("#site_one");
		//增加编辑按钮
		compileFn($compBPar);
	});
}

function compileFn(i){

	var $compP = i.find($("p"));
	var $compS = i.find($("span"));
	var $compD = i.find($("dd"));
	// console.log($compS.text());

	$("#compile_wrap").css("display","block");
	$("#site_wrap").css("display","none");
	$("#write_wrap").css("display","none");

	// 创建标签保存内容
	$compCent = $(
		"<ul>"+
			"<li>用户姓名:<input maxlength='10' class='replacipt' type='text' value="+$compP.text()+"></li>"+
			"<li>联系方式:<input class='replacipt' type='text' value="+$compS.text()+"></li>"+
			"<li>收货地址:<textarea class='textarea' name='' id='' cols='30' rows='10' >"+$compD.text()+"</textarea></li>"+
		"</ul>"+
		"<h2 class='replaceH2'>确定</h2>"
		);

	//添加到网页中
	$("#compile_wrap").append($compCent);
	//替换内容
	replaceFn();

}


//-----------删除按钮-----------
//增加删除按钮
removeFn();
function removeFn(){

	$('.remove').off("click").click(function(){
		//获取父级元素
		var $removeOne = $(this).parents("#site_one");

		$removeOne.remove();
	});
}
//--------增加替换文字------------
function replaceFn(){

	// 定义数组来保存用户信息
	var replaceiptarr = [];
		var $writeInt = $(".replacipt");
		// 点击确定后输出数组
		var $star = $(".replaceH2");

		$star.off("click").on("click",function(){
			// console.log('点击了');
			$writeInt.each(function(i){
				replaceiptarr[i] = $(this).val();
			});
			replaceiptarr.push($(".textarea").val());
			
			$repcenter = $(
				"<div id='site_one'>"+
					"<div id='site_one_left'>"+
						"<img class='pitch_on' src='image/elect_1.png' alt=''>"+
						"<dl>"+
							"<dt><p id='user'>"+replaceiptarr[0]+"</p><span id='handset'>"+replaceiptarr[1]+"</span></dt>"+
							"<dd>"+replaceiptarr[2]+"</dd>"+
						"</dl>"+
					"</div>"+
					"<ul id='compile'>"+
						"<li class='remove'><img src='image/rom.png' alt=''>删除</li>"+
						"<li>"+"<b>"+"<img src='image/redact.png' alt=''>"+"编辑</b>"+"</li>"+
					"</ul>"+
				"</div>"
			);

			$compBPar.html($repcenter);

			$("#compile_wrap").css("display","none");
			$("#site_wrap").css("display","block");
			$("#write_wrap").css("display","none");

			// 增加编辑按钮
			compileinputFn();
			// 增加删除按钮
			removeFn();	
			//选中地址
			pitchOnFn();
		});
	
}
// function clickImgFn(){
// 	var $clickImg = $("#site_head").find($("a")).find($("img")).index();
// 	console.log($clickImg);
// 	// $clickImg.attr("src","image/log_2.png");
// }
//选中地址
pitchOnFn();
function pitchOnFn(){
	var pitchOn = $(".pitch_on");
	var pitchBol = true;

	pitchOn.each(function(i){
		pitchOn.eq(i).off("click").on("click",function(){
			if(pitchBol){
				$(this).attr("src","image/elect_2.png");
				pitchBol = false;		
			}else{
				$(this).attr("src","image/log_1.png");
				pitchBol = true;
			}

		})	
	});
	
}








