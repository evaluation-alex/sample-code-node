"use strict";

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var utils = require('../utils.js');
var constants = require('../constants.js');

var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
merchantAuthenticationType.setName(constants.apiLoginKey);
merchantAuthenticationType.setTransactionKey(constants.transactionKey);

var updateRequest = new ApiContracts.UpdateSplitTenderGroupRequest();
updateRequest.setMerchantAuthentication(merchantAuthenticationType);
updateRequest.setSplitTenderId("115901");
updateRequest.setSplitTenderStatus(ApiContracts.SplitTenderStatusEnum.VOIDED);

//pretty print request
//console.log(JSON.stringify(createRequest.getJSON(), null, 2));
	
var ctrl = new ApiControllers.UpdateSplitTenderGroupController(updateRequest.getJSON());

ctrl.execute(function(){

	var apiResponse = ctrl.getResponse();

	var response = new ApiContracts.UpdateSplitTenderGroupResponse(apiResponse);

	//pretty print response
	//console.log(JSON.stringify(response, null, 2));

	if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
		console.log("Text: " + response.getMessages().getMessage()[0].getText());
	}
	else{
		console.log("Result Code: " + response.getMessages().getResultCode());
	}

});