var mqtt = require('mqtt');
var gatewayService = require('../service/gatewayService');


var connectionOpts = {
    clientId: 'b8:02',
    keepalive: 60,
    connectTimeout: 10 * 1000,
    reconnectPeriod: 1 * 1000,
    clean: true,
    will: {
        topic: "device-will",
        payload: 'b8:02',
        qos: 0,
        retain: false
    },
    queueQoSZero: false,
    // incomingStore: mqttStore.incoming,
    // outgoingStore: mqttStore.outgoing,                
};


var client  = mqtt.connect('tcp://yulurobot.cn:1883',connectionOpts)

client.on('connect', function () {
    console.log('connected');
    client.subscribe('b8:02');
    
});

client.on('message', function (topic, message) {
  // message is Buffer
    console.log(topic+'|'+message.toString());
    if(topic == 'b8:02'){
        parseMsg(message);
    }
  
})



var parseMsg = function(packet){
    //console.log('parseMsg:' + packet );
    var msg;
    try{
            msg = JSON.parse(packet);
            //console.log('msg:' + msg );
            switch(msg.packetType){
            	case 'sendCommond':
            		gatewayService.sendCommond(msg);
            		break;
            	case 'sendRegister':
            		gatewayService.sendRegister(msg);
            		break;
            	case 'sendDel':
            		gatewayService.sendDel(msg);
            		break;
            	case 'permitJoin':
            		gatewayService.permitJoin(msg);
            		break;            	
            	
            	default :
            		//console.log('parseMsg: type not found');
            		break;
            }
                //gatewayService.gupline(msg.mac);
                //gatewayService.upline(msg.status,msg.addr,msg.gmac,msg.mac,msg.type);
            

    }catch(err){
        console.log('parseMsg:'+err);
    }
};



exports.mqinit = function(){ 
 console.log('mqinit');
 }

exports.sendCommond = function(msg){	
	//console.log("mq sendCommond:"+JSON.stringify(msg));
	client.publish('b8:02', JSON.stringify(msg));
}
