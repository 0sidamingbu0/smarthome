var express = require('express');
var router = express.Router();
var gatewayService = require('../service/gatewayService');
var mq = require('../mqtt/mq');
/* GET home page. */
router.use('/device/API/deviceReg', function(req, res) {
	res.send(gatewayService.deviceReg(req.body));
});

router.use('/device/API/feedback/status', function(req, res) {
	res.send(gatewayService.reportStatus(req.body));
});

router.use('/device/API/command', function(req, res) {
	res.send(gatewayService.reportEvent(req.body));
});

router.use('/device/API/report', function(req, res) {
	res.send(gatewayService.reportAddr(req.body));
});

router.use('/device/API/value', function(req, res) {
	res.send(gatewayService.reportValue(req.body));
});

module.exports = router;
