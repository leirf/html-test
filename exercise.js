window.onload = function () {
  //正则数据存储域
  var regData={};

  // 去除空格的正则
  regData.rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;

  //中文
  regData.Chinese = /[\u4e00-\u9fa5]/g;

  //数字
  regData.nonumber = /\D/g;

  //非中文
  regData.nochinese = /[^\u4e00-\u9fa5]/g;

  //邮件
  regData.email = /^\s*[a-zA-Z0-9]+(([\._\-]?)[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/;

  //电话
  regData.phone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,})){0,}$/;

  //带小数位的数字
  regData.decimalNumber = /^\d+(\.\d+)+$/;

  //html
  regData.htmlTags = /<[\/\!]*[^<>]*>/ig;

	var btn = document.getElementById('btn');
	var str = document.getElementById('str');
	//判断有没有输入,判断之前去除空格
	btn.onclick = function () {
    str.value = str.value.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"");
		if(str.value){

    }
		else {
			alert("请输入");
		}
  }

 	//禁止输入
  var banInput = document.getElementById('banInput');
	banInput.onfocus = function () {
		banInput.blur();
	}
 	
 	//禁止输入中文
  var banInputMethod = document.getElementById('banInputMethod');
	if (banInputMethod.getAttribute('banInputMethod')) {
		var clearChinese = function (_this) {
			_this.value = _this.value.replace(/[\u4e00-\u9fa5]/g,"");
		}
		banInputMethod.onkeyup = function() {
			clearChinese(this);
		}
		banInputMethod.onblur = function() {
			clearChinese(this);
		}
	} 
	 
	//禁止复制粘贴
  var banCopy = document.getElementById('banCopy');
	banCopy.oncopy = function() {
		return false;
	}
	banCopy.onpaste = function () {
		return false;
	}

	//只能输入数字
  var onlyNumber = document.getElementById('onlyNumber');
	function only_Number(_this) {
   _this.value = _this.value.replace(/\D/g,"");
  } 
  onlyNumber.onfocus = function () {
  	only_Number(this);
  }
  onlyNumber.onblur = function () {
  	only_Number(this);
  }
  onlyNumber.onkeyup = function () {
  	only_Number(this);
  }  	 

  //限制字符串长度
  var limitLength = document.getElementById('limitLength');
  function limit_len(_this) {
    var limitL = _this.getAttribute('limit');
    var num = _this.value.length;
    if (num > limitL) {
      _this.value = _this.value.substr(0,limitL);
    }    
  }
  limitLength.onfocus = function(){
    limit_len(this);
  }
  limitLength.onkeyup = function(){
    limit_len(this);
  }
  limitLength.onblur = function(){
    limit_len(this);
  }

  //显示提示消息,获取焦点提示取消
  var hintIn = document.getElementById('hint'),
      setCss = function (element,style) {
        if (!element || element.nodeType === 3 || element.nodeType === 8 || !element.style) {
          return;
        }
        for (var prop in style) {
          element.style[prop] = style[prop];
        }
        return element;
      },
      hintData = hintIn.getAttribute('hintMessage'),
      spanHint = document.createElement("span");
  setCss(spanHint,{ "position":"absolute",
                  "left":hintIn.offsetLeft+2,
                  "top":hintIn.offsetTop,
                  "zIndex":2,
                  "display":"inline-block",
                  "overflow":"hidden"
  });
  spanHint.innerText = hintData;
  hintIn.parentNode.insertBefore(spanHint,hintIn);
  hintIn.onfocus = spanHint.onclick = function () {
    setCss(spanHint,{"display":"none"});
  }
  hintIn.onblur = function(){
    if (!hintIn.value.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "")) {
      setCss(spanHint,{"display":"inline-block"});
    }
  }

  //实时显示密码强度
  var colorPassword = ["red","yellow","orange","green"],
      dataPassword = ["密码太短","弱","中","强"],
      trim = function (char) {
        return (char || "").replace(regData.rtrim,"");
      },
      charStrength = function(char){//计算单个字符强度
        if (char>=48 && char <=57){ //数字
            return 1;
        }
        if (char>=97 && char <=122) {//小写
            return 2;
        }else{
            return 3; //特殊字符
        }
      },
      passwStreng = function (obj) {
        var value = trim(obj.value),
            valueL = value.length;
        // console.log(value);
        if (valueL < 6) {
          return 0;
        }
        var passwordS=0;
        for (var i = 0; i < valueL; i++) {
          passwordS += charStrength(value.toLocaleLowerCase().charCodeAt(i));
          // console.log(passwordS);
        }
        return passwordS;
      };
  (function (obj,show) {
    obj.onkeyup = function () {
      var strength = passwStreng(obj);
      // console.log(strength);
      if (strength < 1) {
        show.innerText = dataPassword[0];
        setCss(show,{"color":colorPassword[0]});
      } 
      else if (strength < 10) {
        show.innerText = dataPassword[1];
        setCss(show,{"color":colorPassword[1]});
      }
      else if (strength < 15) {
        show.innerText = dataPassword[2];
        setCss(show,{"color":colorPassword[2]});
      }
      else if (strength >= 15) {
        show.innerText = dataPassword[3];
        setCss(show,{"color":colorPassword[3]});
      }
    }
  })(document.getElementById('password'),document.getElementById('strength'));
 




} 