function ViewModel() {
	var self = this;
	self.username = ko.observable();
	self.name = ko.observable();
	self.password = ko.observable();
	self.email = ko.observable();
	self.characters = ko.observableArray();
	self.characterMessage = ko.observable();
	self.message = ko.observable();
	self.form = {
		name : ko.observable(),
		race : ko.observable(),
		profession : ko.observable(),
		dutys : ko.observableArray([])
	};
	function Option(value, name) {
		this.value = value;
		this.name = name;
	}
	self.races = [
		new Option("human", "人类"),
		new Option("ne", "暗夜"),
		new Option("dwarf", "矮人"),
		new Option("dwarfism", "侏儒"),
		new Option("werewolf", "狼人"),
		new Option("delaney", "德莱尼"),
		new Option("panda", "熊猫人")
	];
	self.raceKeyValue = {
		"human" : "人类",
		"ne" : "暗夜",
		"dwarf" : "矮人",
		"dwarfism" : "侏儒",
		"werewolf" : "狼人",
		"delaney" : "德莱尼",
		"panda" : "熊猫人"
	};
	self.professions = [
		new Option("paladin", "圣骑士"),
		new Option("druid", "德鲁伊"),
		new Option("brave", "战士"),
		new Option("mage", "法师"),
		new Option("warlock", "术士"),
		new Option("bandit", "盗贼"),
		new Option("hunter", "猎人"),
		new Option("priest", "牧师"),
		new Option("shaman", "萨满"),
		new Option("deadknight", "死骑"),
		new Option("monk", "武僧")
	];
	self.professionKeyValue = {
		"paladin" : "圣骑士",
		"druid" : "德鲁伊",
		"brave" : "战士",
		"mage" : "法师",
		"warlock" : "术士",
		"bandit" : "盗贼",
		"hunter" : "猎人",
		"priest" : "牧师",
		"shaman" : "萨满",
		"deadknight" : "死骑",
		"monk" : "武僧"
	};
	self.dutys = [
		new Option('1', "坦克"),
		new Option('2', "治疗"),
		new Option('4', "输出")
	];
	self.getInfo = function () {
		var url = "/users/userInfo";
		$.get(url, {}, function(data, event){
			if(data.status == 0)
			{
				self.username(data.data.username);
				self.name(data.data.name);
				self.email(data.data.email);
			}
			else
			{
				self.message(data.message)
			}
		},'json')
	};
	self.onfocus = function(data, event) {
		$(event.target).parents("div.form-group").removeClass("has-success")
	};
	self.onchange = function(data, event) {
		$(event.target).parents("div.form-group").removeClass("has-success")
		if(!event.target.checkValidity()){
			$(event.target).parents("div.form-group").addClass("has-error")
			self.message(event.target.validationMessage)
		}
		else{
			$(event.target).parents("div.form-group").removeClass("has-error")
			self.message("")
		}
		var field = $(event.target).attr("name");
		$.post("/users/userInfo",{data:self[field](), field:field},function(data, event){
			if(data.status == 0)
			{
				$("input[name="+data.field+"]").parents("div.form-group").addClass("has-success")
				self.message("")
				self.getInfo()
			}
			else
			{
				$("input[name="+data.field+"]").parents("div.form-group").addClass("has-error")
				self.message(data.message)
			}
		},'json')
	};
	self.convertDuty = function(data) {
		var result = ""
		for(var i in self.dutys)
		{
			var key = parseInt(self.dutys[i].value)
			if((data & key) > 0)
			{
				result += self.dutys[i].name+" "
			}
		}
		return result;
	};
	self.getCharacters = function(){
		var url = "/users/character"
		$.get(url, {}, function(data,event){
			if(data.status == 0)
			{
				self.characterMessage("")
				self.characters(data.data)
			}
			else 
			{
				self.characterMessage(data.message)
			}
		},'json')
	};
	self.deleteCharacter = function(data,event){
		var id = $(event.target).attr("data-target")
		var url = "/users/character"
		$.ajax({
			url : url,
			dataType:"json",
			data:{id:id},
			type:"DELETE",
			success: function(data,event){
				if(data.status == 0)
				{
					$("input[name="+data.field+"]").parents("div.form-group").addClass("has-success")
					self.characterMessage("")
					self.getCharacters()
				}
				else
				{
					$("input[name="+data.field+"]").parents("div.form-group").addClass("has-error")
					self.characterMessage(data.message)
					}
				}})
	};
	self.newCharacter = function(){
		var url = "/users/character"
		$.post(url, self.form, function(data, event){
			if(data.status == 0)
			{
				self.characterMessage("")
				for(var i in data.form)
				{
					data.form[i]("")
				}
				self.getCharacters()
			}
			else
			{
				self.characterMessage(data.message)
			}
		},'json')
	};
	
	self.disable = ko.observable(false);
}
viewModel = new ViewModel()
ko.applyBindings(viewModel)
$(document).ready(viewModel.getInfo())
$(document).ready(viewModel.getCharacters())