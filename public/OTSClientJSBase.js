
var OTS = {
    callBackList: {},
    callBackCodeList: {},


    SetOtsHost: {},
    SetFormIsShow: {},
    SetCheckState: {},
    CallBack: function (callBackKey, callBackData, isChipter) {
        setTimeout(function () {
            var base64data = new OTS.Base64();
            var _callBackKey = base64data.decode(callBackKey)
            var _callBackData = base64data.decode(callBackData)
            //_callBackData = OTS.JsonToObject(_callBackData);
            OTS.callBackList[_callBackKey](_callBackData);
            console.log('run CallBack');
            try {
                var code = callBackCodeList[_callBackKey];
                if (code != "GetCameraRectangle" && code != "HideCamera" && code != "TempSaveAnswerPaper" && code != "GetPaymentResult") {
                    // Common.LightBox.hide();
                }
            }
            catch (e) {
            }
            try {
                delete (OTS.callBackList[_callBackKey]);
                delete (OTS.callBackCodeList[_callBackKey]);
            }
            catch (e) {
            }
        }, 0);
    },
    Sent: function (code, param, data, callBack, checkNotGoFun) {
        setTimeout(function () {
            // && code != "ClientCheckLogin"
            if (code != "GetCameraRectangle" && code != "HideCamera" && code != "TempSaveAnswerPaper" && code != "GetIMEName" && code != "OTSOpen" && code != "GetPaymentResult") {
                //Common.LightBox.show();
            }
            //code 请求的接口的code会提供一个列表
            //param 地址栏参数这里不用带?
            //data 传输的jsondata
            //callBack 程序回调方法 必须带一个参数  callback(data) 这种形状的，一定要传函数的名称 function callback(data){} 这时候就传'callback'就好 不要 function(){}这种方式直接往里传
            //callback可以直接传方法名了不用 以字符串的方式穿了2019年1月11日17:28:27
            var paramData = new Object();
            paramData.code = code;
            paramData.param = param;
            paramData.data = data;
            var callBackKey = OTS.Guid();
            OTS.callBackList[callBackKey] = callBack;
            OTS.callBackCodeList[callBackKey] = code;
            paramData.callBack = callBackKey;
            //alert("sentcode:" + code)
            //alert(14)

            event = document.createEvent('MessageEvent');
            var origin = window.location.protocol + '//' + window.location.host;
            var jsonData = OTS.ObjectToJson(paramData)
            event.initMessageEvent('sent', true, true, jsonData, origin, 2507, window, null);
            document.dispatchEvent(event);
            //alert("sentOver:" + code)
        }, 5);
    },
    Sent_Post: function (code, param, data, callBack, checkNotGoFun) {
        setTimeout(function () {
            // && code != "ClientCheckLogin"
            if (code != "GetCameraRectangle" && code != "HideCamera" && code != "TempSaveAnswerPaper" && code != "GetIMEName" && code != "OTSOpen" && code != "GetPaymentResult") {
            }
            //code 请求的接口的code会提供一个列表
            //param 地址栏参数这里不用带?
            //data 传输的jsondata
            //callback可以直接传方法名了不用 以字符串的方式穿了2019年1月11日17:28:27
            var paramData = {};
            paramData.code = code;
            paramData.param = param;
            paramData.data = data;
            var callBackKey = OTS.Guid();
            OTS.callBackList[callBackKey] = callBack;          
            OTS.callBackCodeList[callBackKey] = code;
            paramData.callBack = callBackKey;
            //alert("sentcode:" + code)
            //alert(14)

            // event = document.createEvent('MessageEvent');
            // var origin = window.location.protocol + '//' + window.location.host;
            var jsonData = OTS.ObjectToJson(paramData)
            // event.initMessageEvent('sent', true, true, jsonData, origin, 2507, window, null);
            // document.dispatchEvent(event);  d
            //alert("sentOver:" + code) 


            // var resp = axios.post("/SentCommand", paramData);
            //return resp;


            $.ajax({
                type: 'post',
                url: "http://127.0.0.1:55889/SentPostData",
                dataType: "json",
                data: jsonData,
                complete :function(result){
                    $.ajax({
                        type: 'get',
                        url: "http://127.0.0.1:55889/SentCommand",
                        dataType: "jsonp",
                        data:{ OTScallBackKey:callBackKey}
                    });
                }
            });
           

        }, 5);

    },
    TestMessage: function (msg) {
        alert(msg);
    },
    Guid: function () {
        return 'xxxxxxxx-xxxx-2507-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    ObjectToJson: function (objectData) {
        return JSON.stringify(objectData)
    },
    JsonToObject: function (jsonData) {
        var newjsondata = jsonData.replace(/\\'/g, "'");
        return JSON.parse(newjsondata);
    },
    Base64: function () {

        // private property
        _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding
        this.encode = function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        }

        // public method for decoding
        this.decode = function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        }

        // private method for UTF-8 encoding
        _utf8_encode = function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        }

        // private method for UTF-8 decoding
        _utf8_decode = function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }
}
OTS.callBackCodeList = {};
OTS.callBackList = {};
window.OTS = OTS;
