// The nav should be accessible by tab only, in addition to the arrow keys
// Home/End keys to jump to first/last item

// No-JS version works with clicking/tapping. Only JS version supports keyboard and doesn't need the inputs. So, delete them and process focusing and keyboard actions on the li element. Add aria-expanded to focused li's sub nav

// To do: support multiple nav.drop
// √ To do: hover
// To do: z-index when sub nav overlaps top-level li

function closest(el, selector) { // Thanks http://gomakethings.com/ditching-jquery/

    for ( ; el && el !== document; el = el.parentNode ) {

		if (el.matches(selector)) {
			
			return el;

		}

    }

    return false;

}

// Delete all trigger inputs, add tabindex=0 to each li

document.querySelectorAll('nav.drop input').forEach(function (el) {
	
	el.outerHTML = '';
	
});

document.querySelectorAll('nav.drop li').forEach(function (el) {
	
	el.setAttribute('tabindex', 0);

	el.addEventListener('focus', function (e) {
		
		var el = e.target;
		el.parentNode.setAttribute('aria-expanded', true);
		if (el.querySelector('ul')) {

			el.querySelector('ul').setAttribute('aria-expanded', 'true');

		}
		
		var current_item = e.target;

		current_item.parentNode.childNodes.forEach(function (el) {

			if (el !== current_item && el.nodeName === 'LI' && el.querySelector('ul')) {

				el.querySelector('ul').removeAttribute('aria-expanded');
			
			}
			
		});

	});

	el.addEventListener('keyup', function (e) {
		
		if (e.key === 'Enter' && e.target.querySelector('a[href]')) {
			
			e.target.querySelector('a[href]').click();
			
		}
		
	});
	
	if (el.querySelector('ul')) {

		el.setAttribute('aria-haspopup', true);
	
	}

/*
	if (el.querySelector('a')) {

		el.querySelector('a').setAttribute('tabindex', -1);
	
	}
*/

// parent blurs, child focuses, script hides child

	el.addEventListener('blur', function (e) {
	
		// if previously focused element is this one's parent li, enable this child's parent ul
		if (!closest(e.relatedTarget, 'nav.drop')) {
			console.log(closest(e.relatedTarget, 'nav.drop'));	
			
			document.querySelectorAll('nav.drop ul').forEach ( function (el) {
				
				el.removeAttribute('aria-expanded');
				
			});
			return;
			
		}

		var current_item = e.target;

		current_item.parentNode.childNodes.forEach(function (el) {

			if (el === current_item && el.nodeName === 'LI' && el.querySelector('ul')) {
	
				el.querySelector('ul').removeAttribute('aria-expanded');
			
			}
			
		});

	});
	
});

window.addEventListener('click', function (e) { // Close the nav when clicking outside
	
	if (!closest(e.target, 'nav.drop li')) {

		document.querySelectorAll('nav.drop ul').forEach ( function (el) {
			
			el.removeAttribute('aria-expanded');
			
		});
		
	}
	
});

window.addEventListener('touchend', function (e) { // Close the nav when clicking outside

	if (!closest(e.target, 'nav.drop li')) {

		document.querySelectorAll('nav.drop ul').forEach ( function (el) {
			
			el.removeAttribute('aria-expanded');
			
		});
		
	}
	
});

document.querySelector('nav.drop').addEventListener('click', function (e) {
	
// 	console.log(e.target);
	
});

document.querySelector('nav.drop').addEventListener('keyup', function (e) {
	
/*
	console.log(e.target);
	console.log(e.key);
*/
	
	// Check for sibling or children to expand on control keys Left/Right/etc

	if (e.key === 'Escape') {
console.log(e);
		
		document.querySelectorAll('nav.drop ul').forEach ( function (el) {
			
			el.removeAttribute('aria-expanded');
			
		});
		
		document.querySelector(':focus').blur();
		
	}
	
});

