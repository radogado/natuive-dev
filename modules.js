// JS file = "var nui = (function (){" + core JS + "concatenated ./components/*/*.js" + "return { ... } })();"
// CSS file = "core SSS" + "concatenated ./components/*/*.css"
// inheritable components like Slider (to be inherited by Lightbox) to be named var componentSlider = (function (){ ... 
// Lite natUIve to include only a subset of ./components, minus Grid with Inline Popups, Parallax, Sortable tables etc

var nui = (function (){

	function ready(fn) {
	
	  if (document.readyState != 'loading') {
	
	    fn();
	
	  } else if (document.addEventListener) {
	
	    document.addEventListener('DOMContentLoaded', fn);
	
	  } else {
	
	    document.attachEvent('onreadystatechange', function(){
	    	if (document.readyState != 'loading')
	        	fn();
	    });
	
	  }
	
	}

	console.log('starting main module');
	
	var components = new Array;

	var privateMethod = function (){
	// private
	};
	
	var someMethod = function (){
	// public
	};
	
	var anotherMethod = function (){
	// public
	};
	
	console.log('startup components ' + components);
	
	function initComponents(host) {
	
		for (var key in components) {
		
		    components[key][0].init(host);
		
		}
	
	}
	  
	ready(function (){
	  
		console.log('on ready components ' + components);
		initComponents(document.querySelector('body'));
		
	});
  
  // Set up a Mutation Observer which calls initComponents(host)

// Main – end

// Component Tooltip – start

(function (){
    
	console.log('starting extension module');
	
	var selector = '.tool';
	var init = function (host) {
		
		console.log('initialising tooltips ' + document.querySelectorAll(selector));
		host.querySelectorAll(selector + ':not([data-ready])').forEach( function(el) {
			
			el.setAttribute('data-ready', true);
			
		});
		
	};
	components['tooltip'] = new Array;
	components['tooltip'].push({ selector: selector, init: init });

//     return nui;
    
})();

// Component Tooltip – end

// Component Slider – start

(function (){
    
	console.log('starting extension module');
	
	var selector = '.slider';
	var init = function (){
		
		console.log('initialising sliders ' + document.querySelectorAll(selector));
		
	};
	components['slider'] = new Array;
	components['slider'].push({ selector: selector, init: init });

//     return nui;
    
})();

// Component Slider – end


// Main – end

  return {
    someMethod: someMethod,
    anotherMethod: anotherMethod,
    components: components
  };
  
})();

