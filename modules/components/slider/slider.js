// Component Slider – start

var componentSlider = (function (){
    
	console.log('starting extension module');
	
	var selector = '.slider';
	var init = function (){
		
		console.log('initialising sliders ' + document.querySelectorAll(selector));
		
	};
	registerComponent('slider', selector, init);

//     return nui;
    
})();

// Component Slider – end


// Main – end
