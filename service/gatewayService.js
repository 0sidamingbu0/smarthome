var express = require('express');
var router = express.Router();
var mqtt = require('../mqtt/mq');
var request = require("request");
//down
exports.sendCommond = function(msg){ 
    var dev = JSON.parse(JSON.stringify(msg));
    console.log('sendCommond: '+JSON.stringify(dev));
    if(dev.deviceType == '1_SwitchLightPanel' || dev.deviceType == '2_SwitchLightPanel' || dev.deviceType == '3_SwitchLightPanel'){
        dev.deviceType = 'N_SwitchLightPanel';
    }
    sendCommond('/zbClient/API/send',dev);
}

exports.sendRegister = function(msg){ 
    console.log('sendRegister: '+JSON.stringify(msg));
    sendCommond('/zbClient/API/feedback/register',msg);    
}

exports.sendDel = function(msg){ 
    console.log('sendDel: '+JSON.stringify(msg));
    sendCommond('/zbClient/API/delete',msg);      
}

exports.permitJoin = function(msg){ 
    console.log('permitJoin: '+JSON.stringify(msg));
    sendCommond('/zbClient/API/permit',msg); 
}

//=======================================
//up:
exports.deviceReg = function(msg){    
    var dev = JSON.parse(JSON.stringify(msg));
    dev.packetType = 'deviceReg';
    dev.mac = dev.macAddr;
    console.log('deviceReg: '+JSON.stringify(dev));
    mqtt.sendCommond(dev); 
    return 'ok';
}

exports.reportStatus = function(msg){     
    var dev = JSON.parse(JSON.stringify(msg));
    dev.packetType = 'reportStatus';
    dev.mac = dev.macAddr;
    console.log('reportStatus: '+JSON.stringify(dev));
    mqtt.sendCommond(dev); 
    return 'ok';
}

exports.reportEvent = function(msg){     
    var dev = JSON.parse(JSON.stringify(msg));
    dev.packetType = 'reportEvent';
    if(dev.indaddressex == 2 && dev.event == 'PressDown'){
        dev.event = '2PressDown';
    }
    if(dev.indaddressex == 3 && dev.event == 'PressDown'){
        dev.event = '3PressDown';
    }
    if(dev.indaddressex == 2 && dev.event == 'PressUp'){
        dev.event = '2PressUp';
    }
    if(dev.indaddressex == 3 && dev.event == 'PressUp'){
        dev.event = '3PressUp';
    }

    dev.mac = dev.macAddr;
    console.log('reportEvent: '+JSON.stringify(dev));
    mqtt.sendCommond(dev); 
    return 'ok';
}

exports.reportAddr = function(msg){     
    var dev = JSON.parse(JSON.stringify(msg));
    dev.packetType = 'reportAddr';
    dev.mac = dev.macAddr;
    console.log('reportAddr: '+JSON.stringify(dev));
    mqtt.sendCommond(dev); 
    return 'ok';
}

exports.reportValue = function(msg){     
    var dev = JSON.parse(JSON.stringify(msg));
    dev.packetType = 'reportValue';
    dev.mac = dev.macAddr;
    console.log('reportValue: '+JSON.stringify(dev));
    mqtt.sendCommond(dev); 
    return 'ok';
}


var sendCommond = function(url,body){
    var options = {
        url: 'http://127.0.0.1:8888' + url,
        method: "POST",
        json: true,
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: body
    };     

    request(options, function (error, response, body) {
        if (error) {
            //logger.error("send message to zbClient failed: " + error);
        }
        else {
            if (body.message === "success") {
            }
            else {
                //logger.error("send message to zbClient failed. ");
            }
        }
    });
}



