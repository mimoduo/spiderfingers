var swap = (function (sf) {

	var module = function() {
		this.items = document.querySelectorAll(".sf-swap");
		this.dom = {};
	};

	var mod = new module;

	var assignOptions = function() {
		for(var i in mod.items) {
			if(mod.items.hasOwnProperty(i)) {
				mod.dom[i] = {
					el: mod.items[i],
					data: JSON.parse(mod.items[i].dataset.options)
				}
			}
		}
	}

	assignOptions();

	var plugin = sf.plugin("swap");

	var construct = function() {}

	var activate = function() {}

	var deactivate = function() {}

	var bindUI = function() {}

	return plugin;

})(sf || {});