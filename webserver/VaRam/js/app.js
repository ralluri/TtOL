jQuery.noConflict();
//controller
var VaRamController = function($tagService) {
	var controller = this;
	controller.tags =  $tagService.getTags();
	controller.updateTagCloud = function() {
		console.log("updating tag");
		controller.tags =  $tagService.getTags();
		console.log(controller.tags);
		controller.words = [];
		angular.forEach(controller.tags, function(value, key) {
			controller.words.push({"text":value.tagName, "weight":value.frequency});
		});
		console.log(controller.words);
		if(words.length != 0) {
			jQuery('#tagCloud').jQCloud('update', controller.words);
			updatePie(controller.tags);
		}
		return controller.words;
	};
	words = controller.updateTagCloud();
	tags = controller.tags;
};
//Service change code here to update to get from webservice
var tagService = function() {
	return {
		"getTags": function() {
			return [{"tagName":"development", "frequency": Math.random()*100, "order":1}, {"tagName":"testing", "frequency": Math.random()*100, "order":2}, {"tagName":"other", "frequency": Math.random()*100, "order":3}]
		}
	};
};

var words = [];
var tags = [];

var varamApp = angular.module("VaRam", []).service("tagService", tagService).controller("VaRamController", ["tagService", VaRamController]);

jQuery(function() {
	jQuery("#tagCloud").jQCloud(words);
	drawD3(tags);
});