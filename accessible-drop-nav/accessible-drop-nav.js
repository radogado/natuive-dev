// To do: on nav blur, deactivate all drop downs
// The nav should be accessible by tab only, in addition to the arrow keys
// Home/End keys to jump to first/last item

function closest(el, selector) { // Thanks http://gomakethings.com/ditching-jquery/

    for ( ; el && el !== document; el = el.parentNode ) {

		if (el.matches(selector)) {
			
			return el;

		}

    }

    return false;

}

window.addEventListener('click', function (e) {
	
	if (!closest(e.target, 'nav.drop li')) {
		
		document.querySelectorAll('nav.drop input').forEach ( function (el) {
			
			el.checked = false;
			el.removeAttribute('data-checked');
			
		});
		
	}
	
});

var active_item = null;	

	document.querySelectorAll('nav.drop > ul > li > input').forEach ( function (el) { // Disable standard keyboard behaviour on inputs
		
		el.onkeyup = el.onkeydown = el.onkeypress = function(e) {
			
			if (e.key === 'ArrowDown') {
			
				e.preventDefault();
			
			}
			
		};
		
	});
	
	function focusItem(e) {
			
		var el = e.target;	
		if (el.checked && el.getAttribute('data-checked')) {

			el.removeAttribute('data-checked');
			el.checked = false;
			
			el.parentNode.querySelector('ul').querySelectorAll('input').forEach( function (el) {
				
				el.checked = false;
				el.removeAttribute('data-checked');
				
			});
			
		} else {
			
			// Clear data-attribute from all other inputs
			
			document.querySelectorAll('input[name=' + el.name + ']').forEach( function (el) {
				
				el.checked = false;
				el.removeAttribute('data-checked');
				
			});
			
			
		}
		
			el.checked = true;
			el.setAttribute('data-checked', 'true');
			el.focus();
		
		
		return false;

	}

	function blurEvent(e) {

/*
		if (!document.querySelector('nav.drop :focus')) {
		console.log('blur');
			
			document.querySelectorAll('nav.drop [data-checked]').forEach( function (el) {
				
				el.checked = false;
				el.removeAttribute('data-checked');
				
			});
			
		}
*/

		console.log(e);
	
/*
		if (!document.querySelector('nav.drop :focus') && e.target.getAttribute('name') === 'level-0') {
			
			document.querySelectorAll('nav.drop input').forEach( function (el) {
				
				el.checked = false;
				el.removeAttribute('data-checked');
				
			});
						
		}
*/
		
	}

	document.querySelectorAll('nav.drop input').forEach ( function (el) {
		
		el.addEventListener('click', focusItem);
		el.addEventListener('focus', function(e) {

			if (!e.target.getAttribute('data-checked')) {
				
				focusItem(e);
				
			}
			
		});
		
		el.addEventListener('blur', blurEvent);
		
		el.addEventListener('keyup', function (e) {

			if (e.key === 'Enter') {
	
				el.previousElementSibling.click();
			
			}
			
		});
		
		el.addEventListener('keydown', function (e) {

			if (e.key === 'ArrowDown') { // Focus on sub nav
				
				document.querySelectorAll('nav.drop input').forEach ( function (el) {
					
					el.removeEventListener('blur', blurEvent);
					
				});
	
				if (e.target.parentNode.querySelector('ul').querySelector('input')) {
					
					e.stopPropagation();
					e.target.parentNode.querySelector('ul').querySelector('input').focus();
				

				} else { // Focus on any child ul with a[href]
					
					
				}

				document.querySelectorAll('nav.drop input').forEach ( function (el) {
					
					el.addEventListener('blur', blurEvent);
					
				});

// 				e.target.parentNode.querySelector('ul').querySelector('input').focus();
				
			}
			
		});
		
	});
	
	document.querySelectorAll('nav.drop input, nav.drop a[href]').forEach ( function (el) {
		
/*
		if (el.nextElementSibling.type === 'radio') {
			
			el.setAttribute('tabindex', '-1');
			
		}
*/
		
		el.addEventListener('keyup', function (e) {

			if (e.key === 'Escape') {
				
				e.target.blur();
				document.querySelectorAll('nav.drop input[data-checked]').forEach ( function (el) {
				
					el.checked = false;
					el.removeAttribute('data-checked');

				});
				
			}

		});

	});

	document.querySelector('nav.drop li li:first-child > input').addEventListener('keydown', function (e) {
		
		if (e.key === 'ArrowUp') {

			e.stopPropagation();
			e.preventDefault();
			e.target.parentNode.parentNode.parentNode.querySelector('input').focus();
			return false;
		
		}
		
	});
	
	// When focused on a top-level item, bottom arrow key should move focus to its first child item

