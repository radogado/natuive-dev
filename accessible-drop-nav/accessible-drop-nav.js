// The nav should be accessible by tab only, in addition to the arrow keys
// Home/End keys to jump to first/last item

// No-JS version works with clicking/tapping. Only JS version supports keyboard and doesn't need the inputs. So, delete them and process focusing and keyboard actions on the li element. Add aria-expanded to focused li's sub nav

// √ To do: support multiple nav.drop
// √ To do: hover
// √ To do: z-index when sub nav overlaps top-level li
// √ To do: arrows without PNG images
// To do: when focusin on a top-level item, hide its grandchildren

function closest(el, target) { // Thanks http://gomakethings.com/ditching-jquery/ – Accepts either a selector string or an actual element

    for ( ; el && el !== document; el = el.parentNode ) {

		if (typeof target === 'string' ? el.matches(target) : el === target) {
			
			return el;

		}

    }

    return false;

}

/* –––  */

function closeDropNavClickedOutside(e) { // Close the nav when clicking outside
	
	if (!closest(e.target, 'nav.drop li')) {

		document.querySelectorAll('nav.drop ul').forEach ( function (el) {
			
			el.removeAttribute('aria-expanded');
			
		});
		
	}
	
}

function initDropNav(el) {

	// Delete all trigger inputs, add tabindex=0 to each li
	
	el.querySelectorAll('input').forEach(function (el) {
		
		el.outerHTML = '';
		
	});
	
	el.querySelectorAll('li').forEach(function (el) {
		
		var anchor = el.querySelector('a');
		anchor.setAttribute('tabindex', 0);

		anchor.addEventListener('focus', function (e) {
	
			var el = e.target;
	
			el.parentNode.parentNode.setAttribute('aria-expanded', true);
			if (el.parentNode.querySelector('ul')) {
	
				el.parentNode.querySelector('ul').setAttribute('aria-expanded', 'true');
	
			}
			
			var current_item = e.target.parentNode;
	
			current_item.parentNode.parentNode.childNodes.forEach(function (el) {
	
				if (el !== current_item && el.nodeName === 'LI' && el.querySelector('ul')) {
	
					el.querySelector('ul').removeAttribute('aria-expanded');
				
				}
				
			});
			
		});
	
		el.addEventListener('keyup', function (e) {
			
/*
			if (e.key === 'Enter' && e.target.querySelector('a[href]')) {
				
				e.target.querySelector('a[href]').click();
				
			}
*/
			
		});
		
		if (el.querySelector('ul')) {
	
			el.setAttribute('aria-haspopup', true);
		
		}
	
	/*
		if (el.querySelector('a')) {
	
			el.querySelector('a').setAttribute('tabindex', -1);
		
		}
	*/
	
		el.addEventListener('click', function (e) {
			
			if (e.target.querySelector('a')) {

				e.target.querySelector('a').focus();
			
			}
		
		});

	// parent blurs, child focuses, script hides child
	
		anchor.addEventListener('blur', function (e) {

			var this_nav = closest(e.target, 'nav.drop');
			
			if (!closest(e.relatedTarget, this_nav)) { // if e.relatedTarget is not a child of this_nav, then the next focused item is elsewhere
	
				this_nav.querySelectorAll('ul').forEach ( function (el) {
					
					el.removeAttribute('aria-expanded');
					
				});
				return;
				
			}
	
			// Close neighboring parent nav's sub navs
			var el = e.target;
			var target_parent = closest(el, '[aria-haspopup]');
			target_parent.querySelectorAll('ul[aria-expanded]').forEach(function (el) { // Disable active grandchildren

				el.removeAttribute('aria-expanded');

			});

			var el = e.target.parentNode;
			if (!el.nextElementSibling && // last item
				el.parentNode.parentNode.nodeName === 'LI' && // of third-level nav
				!el.parentNode.parentNode.nextElementSibling) {
					
					console.log(el.parentNode.parentNode.parentNode.parentNode);
					el.parentNode.parentNode.parentNode.removeAttribute('aria-expanded');
			
			}

		});
		
	});
	
	if (!window.closeDropNavClickedOutsideEnabled) {
		
		window.addEventListener('click', closeDropNavClickedOutside);
		window.addEventListener('touchend', closeDropNavClickedOutside);
		window.closeDropNavClickedOutsideEnabled = true;
	
	}
	
	el.addEventListener('keyup', function (e) {
		
		// Check for sibling or children to expand on control keys Left/Right/etc
	
		if (e.key === 'Escape') {
			
			closest(e.target, 'nav.drop').querySelectorAll('ul').forEach ( function (el) {
				
				el.removeAttribute('aria-expanded');
				
			});
			
			document.querySelector(':focus').blur();
			
		}
		
	});
	
	closest(el, 'nav > ul').setAttribute('role', 'menubar');

}

document.querySelectorAll('nav.drop > ul:not([role])').forEach( function (el) {
	
	initDropNav(el);
	
});
