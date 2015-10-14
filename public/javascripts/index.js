function ViewModel(){
	var self = this;
	self.noticeTarget = ko.observable()
	self.updateNotice = function(data,event)
	{
		var target = $(event.target).attr("data-target");
		var title = $(event.target).text();
		window.location.href = "/index/editNotice/"+target+"/"+title;
	}
}
viewModel = new ViewModel()
ko.applyBindings(viewModel)
$(document).ready(function(){
	$("a.notice").each(function(){
		var url = "/index/notice";
		var target = $(this).attr("data-target");
		$.get(url,{target:target},function(data,event){
			$("#"+target).innerHTML = data.content;
		})
	})
})

