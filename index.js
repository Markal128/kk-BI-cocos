/**
 * 第三方统计接入模块
 * 
 * @author markal
 * @since 2014/12/11
 */

var cocosBI = require('./lib/cocosBI');

/**
 * Cocos BI对象
 */
var providers = null;


/**
 * 配置模块基础信息
 */
exports.configure = function(opts) {
    providers = new cocosBI(opts);
};

/**
 * 向Cocos BI发送支付成功Log
 */
exports.sendPaySuccLog2CocosBI = function(code, callback) {
    var ob = providers;
    
    if (!ob) {
        return callback('未知Cocos SDK对象');
    }
    
    ob.sendPaySuccLog2CocosBI(code, callback);
};

