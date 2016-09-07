window.onload = function () {
	waterfall("main","pin");
	var dataInit = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]};
	window.onscroll = function () {
	    if(checkscrollside()){
	        var oParent = document.getElementById('main');// 父级对象
	        for(var i=0;i<dataInit.data.length;i++){
	            var oPin=document.createElement('div'); //添加 元素节点
	            oPin.className='pin';                   //添加 类名 name属性
	            oParent.appendChild(oPin);              //添加 子节点
	            var oBox=document.createElement('div');
	            oBox.className='box';
	            oPin.appendChild(oBox);
	            var oImg=document.createElement('img');
	            oImg.src='./images/'+dataInit.data[i].src;
	            oBox.appendChild(oImg);
	        }
	        waterfall('main','pin');
	    };
	}
}
var aPinH = [];
function waterfall(parent,pin) {
	var oParent = document.getElementById(parent);
	var aPin = getClass(oParent,pin);
	var aPinL = aPin.length;
	var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
	var num = Math.floor(document.documentElement.clientWidth/iPinW);
	console.log(num);

	// oParent.style.cssText = "width:" + iPinW*num +"px;margin:0 auto;";
    oParent.style.cssText='width:'+iPinW*num+'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

	var aPinIndex;
	aPinH.length ? (aPinIndex = aPinL - 5) : (aPinIndex = 0); 
	for(var i = 0; i < aPinL; i++) {
		var pinH=aPin[i].offsetHeight;
		if (i < num) { 
			aPinH[i] = pinH;
		} 
		else {
			var minH = Math.min.apply(null,aPinH);
			var minHIndex = getMinHIndex(aPinH,minH);
			console.log(minH);
			console.log(minHIndex);

			aPin[i].style.position = "absolute";
			aPin[i].style.top = minH+"px";
			aPin[i].style.left = aPin[minHIndex].offsetLeft + "px";
			aPinH[minHIndex] += aPin[i].offsetHeight; 
			
			// var minH=Math.min.apply(null,aPinH);//数组aPinH中的最小值minH
			// var minHIndex=getminHIndex(aPinH,minH);
			// aPin[i].style.position='absolute';//设置绝对位移
			// aPin[i].style.top=minH+'px';
			// aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
			// //数组 最小高元素的高 + 添加上的aPin[i]块框高
			// aPinH[minHIndex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
		}
	}
}

function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}
// function getMinHIndex(arrly,min) {
// 	for (var i = 0; i < arrly.length; i++) {
// 		if (arrly[i] == min) {
// 			return i;
// 		}
// 	}
// }
// 
function getMinHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}

// function getClass(parent,className) {
// 	var obj = parent.getElementsByTagName('*');
// 	// var objLength = obj.length;
// 	var aPin = [];
// 	for (var i = obj.length - 1; i >= 0; i--) {
// 		if (obj[i].className == className) {
// 			aPin.push(obj[i]);
// 		} 
// 	}
// 	console.log(aPin.length);
// 	return aPin;
// }
function getClass(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    var objLength = obj.length;
    // console.log(objLength);
    for (var i=0;i<objLength;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==className){
            pinS.push(obj[i]);
        }
    }
    console.log(pinS.length);

    return pinS;
}

function checkscrollside(){
	var oParent = document.getElementById('main');
	var aPin = getClass(oParent,"pin");
	var pinTop = Math.min.apply(null,aPinH);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var documentH = document.documentElement.clientHeight;
	return (pinTop<(scrollTop + documentH))?true:false;
	// 
	// var oParent=document.getElementById('main');
 //    var aPin=getClass(oParent,'pin');
 //    //创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
 //    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);
 //    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
 //    var documentH=document.documentElement.clientHeight;//页面高度
 //    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数

}