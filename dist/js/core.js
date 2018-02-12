var sf = (function() {

	var core = function() {
		this.window = window;
		this.document = document;
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;
		this.scrollTop = window.pageYOffset;
		this.resize = [];
		this.scroll = [];
		this.plugins = {};
	};

	var spider = new core();

	core.prototype.plugin = function(name) {
		spider.plugins[name] = (function(name) {
			var construct = function() {

			};

			return {
				construct: construct
			};
		})(name);

		return spider.plugins[name];
	}

	core.prototype.fireUIEvents = function() {
		onResize();
		onScroll();
	};

	var iterate = function(items) {
		for(var i in items) {
			if(items.hasOwnProperty(i)) {
				items[i].call(spider);
			}
		}
	};

	var onResize = function() {
		iterate(spider.resize);

		spider.windowWidth = window.innerWidth;
		spider.windowHeight = window.innerHeight;
	};

	var onScroll = function() {
		iterate(spider.scroll);

		spider.scrollTop = window.pageYOffset;
	};

	var bindUIEvents = function() {
		window.addEventListener('resize', onResize, false);
		window.addEventListener('scroll', onScroll, false);
	};

	bindUIEvents();

	return spider;

})();