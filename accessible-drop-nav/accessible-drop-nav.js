// The nav should be accessible by tab only, in addition to the arrow keys
// Home/End keys to jump to first/last item

// No-JS version works with clicking/tapping. Only JS version supports keyboard and doesn't need the inputs. So, delete them and process focusing and keyboard actions on the li element. Add aria-expanded to focused li's sub nav

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

document.querySelector('nav.drop').addEventListener('blur', function (e) {
	
	console.log('blur');
	
});

document.querySelectorAll('nav.drop li').forEach(function (el) {
	
	el.setAttribute('tabindex', 0);

	el.addEventListener('focus', function (e) {
		
		if (e.target.querySelector('ul')) {

			e.target.querySelector('ul').setAttribute('aria-expanded', 'true');

		}
		
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

	el.addEventListener('blur', function (e) {
		
		
	});
	
});

window.addEventListener('click', function (e) { // Close the nav when clicking outside
	
	if (!closest(e.target, 'nav.drop li')) {

		document.querySelectorAll('nav.drop ul').forEach ( function (el) {
			
			el.removeAttribute('aria-expanded');
			
		});
		
	}
	
});

document.querySelector('nav.drop').addEventListener('click', function (e) {
	
	console.log(e.target);
	
});

document.querySelector('nav.drop').addEventListener('keyup', function (e) {
	
	console.log(e.target);
	console.log(e.key);
	
	// Check for sibling or children to expand on control keys Left/Right/etc
	
});

