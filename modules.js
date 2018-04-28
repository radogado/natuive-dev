var nui = (function () {

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

	function initComponents(host) {
	
		for (var key in nui.components) {
		
		    nui.components[key][0].init(host);
		
		}
	
	}
	  
  ready(function () {
	  
  	console.log('on ready components ' + components);
  	initComponents(document.querySelector('body'));
  	
  });
  
  // Set up a Mutation Observer which calls initComponents(host)

  return {
    someMethod: someMethod,
    anotherMethod: anotherMethod,
    components: components
  };
  
})();

// Component Tooltip – start

(function (nui) {
    
	console.log('starting extension module');
	
	var selector = '.tool';
	var init = function (host) {
		
		console.log('initialising tooltips ' + document.querySelectorAll(selector));
		host.querySelectorAll(selector + ':not([data-ready])').forEach( function(el) {
			
			el.setAttribute('data-ready', true);
			
		});
		
	};
	nui.components['tooltip'] = new Array;
	nui.components['tooltip'].push({ selector: selector, init: init });

//     return nui;
    
})(nui || {});

// Component Tooltip – end

// Component Slider – start

(function (nui) {
    
	console.log('starting extension module');
	
	var selector = '.slider';
	var init = function () {
		
		console.log('initialising sliders ' + document.querySelectorAll(selector));
		
	};
	nui.components['slider'] = new Array;
	nui.components['slider'].push({ selector: selector, init: init });

//     return nui;
    
})(nui || {});

// Component Slider – end
