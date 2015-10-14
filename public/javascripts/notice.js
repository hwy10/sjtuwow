var ViewModel = function(){
	var self = this;
	self.message = ko.observable();
	self.getNotice = function(data,event)
	{
		
	}
	self.submit = function(data,event) {
		var target = $(event.target).attr("data-target");
		var url = "/index/notice"
		var content = self.testEditor.getMarkdown()
		$.post(url,{target:target,content:content},function(data,event){
			self.message(data.message)
		});
	};
	self.testEditor = editormd("notice-editormd", {
		path   : "/static/lib/",
		height : 640,
		width : "90%",
		// saveHTMLToTextarea : true
	});
}
var viewModel = new ViewModel();
ko.applyBindings(viewModel)
