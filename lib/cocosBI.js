/**
 * cocos BI 应用接口集
 *
 * @author markal
 * @since 2014/12/11
 */
var util = require('util');
var async = require('async');
var request = require('request');
var request = require('request');
var zlib = require('zlib');
var https = require('https');

/**
 * 第三方 平台开放接口
 */
function Provider(conf) {
    conf = (typeof conf === 'string') ? (JSON.parse(conf)) : conf;
    
    this.kServerHost = "http://ark.cocounion.com/as";
    this.kAppID = conf.appid;
    this.fbBIid = conf.fbBIid;
    this.zone = conf.zone;
}

module.exports = Provider;

/**
 * 向cocos BI发送日志
 * 
 */
Provider.prototype.sendPaySuccLog2CocosBI = function(json, callback) {
    var self = this;
    var curTime = Math.ceil(Date.now() / 1000);
    var jTime = new Date(json.time);
    
    var data = {
        time : curTime,
        app : {
            7 : this.kAppID,    
            9 : this.fbBIid
        },
        device : {
            11 : 'html'
        },
        events : [
            {
                s : curTime,                    
                e : 'cc_paySucc',
                t : jTime.getTime()/1000,                   //transaction Date的时间戳
                p : {
                    td : jTime.getTime()/1000,
                    id : json.installdate,
                    ld : json.logindate,
                    iapId : json.itemid,
                    itemname : json.itemname,
                    orderId : json.orderid,
                    cAmount : json.itemprice,
                    type : json.type,
                    levesleft : json.levesleft,
                    cashleft : json.cashleft,
                    tc : json.tcount
                },
                u : {
                    28 : json.uid,
                    29 : this.fbBIid,
                    30 : json.name,
                    31 : json.level,
                    34 : this.zone
                }
            }
        ]
    };
    
    zlib.deflate(JSON.stringify(data), function(err, buff) {
        request(
            {
                method: 'POST',
                uri: (self.kServerHost),
                body : buff, 
                timeout: 12000
            },
            function(err, res, body) {
                callback();
            }
        );
    });
};
