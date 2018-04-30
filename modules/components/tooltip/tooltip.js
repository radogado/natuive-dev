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
	registerComponent('tooltip', selector, init);

//     return nui;
    
})();

// Component Tooltip – end

