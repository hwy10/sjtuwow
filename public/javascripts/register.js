function ViewModel() {
	var self = this;
	self.form = {
		username : ko.observable(),
		name : ko.observable(),
		password : ko.observable(),
		email : ko.observable(),
		question : ko.observable(),
	};
	self.message = ko.observable();
	self.validate = function(data,event) {
		if(!event.target.checkValidity()){
			$(event.target).parents("div.form-group").addClass("has-error")
			self.message(event.target.validationMessage)
		}
		else{
			$(event.target).parents("div.form-group").removeClass("has-error")
			self.message("")
		}
	};
	self.disable = ko.observable(false);
	self.submit = function(data) {
		url = '/users/register';
		if(!data.checkValidity()) {
			return false;
		}
		self.disable(true)
		$.post(url,self.form,function(result){
			if(result.status == 0)
			{
				window.location.href = "/";
			}
			else
			{
				viewModel.message(result.message)
				viewModel.disable(false)
			}
		},'json')
	};
}
viewModel = new ViewModel()
ko.applyBindings(viewModel)