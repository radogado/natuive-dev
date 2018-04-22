function ready(fn) {

  if (document.readyState != 'loading') {

    fn();

  } else if (document.addEventListener) {

    document.addEventListener('DOMContentLoaded', fn);

  } else {

    document.attachEvent('onreadystatechange', function() {
    	if (document.readyState != 'loading')
        	fn();
    });

  }

}

var Module = (function () {

	console.log('starting main module');

	var components = new Array;

  var privateMethod = function () {
    // private
  };

  var someMethod = function () {
    // public
  };

  var anotherMethod = function () {
    // public
  };
  
  console.log('startup components ' + components);
  
  ready(function () {
	  
  	console.log('on ready components ' + components);

	for (var key in Module.components) {
	
	    Module.components[key][0].init();
	
	}	  
	  
  });

  return {
    someMethod: someMethod,
    anotherMethod: anotherMethod,
    components: components
  };
  
})();

var component_tooltip = (function (Module) {
    
	console.log('starting extension module');
	
	var selector = '.tool';
	var init = function () {
		
		console.log('initialising tooltips ' + document.querySelectorAll(selector));
		
	};
	Module.components['tooltip'] = new Array;
	Module.components['tooltip'].push({ selector: selector, init: init });

//     return Module;
    
})(Module || {});

var component_slider = (function (Module) {
    
	console.log('starting extension module');
	
	var selector = '.slider';
	var init = function () {
		
		console.log('initialising sliders ' + document.querySelectorAll(selector));
		
	};
	Module.components['slider'] = new Array;
	Module.components['slider'].push({ selector: selector, init: init });

//     return Module;
    
})(Module || {});
