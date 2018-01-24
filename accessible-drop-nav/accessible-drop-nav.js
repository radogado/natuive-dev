// The nav should be accessible by tab only, in addition to the arrow keys
// Home/End keys to jump to first/last item

// No-JS version works with clicking/tapping. Only JS version supports keyboard and doesn't need the inputs. So, delete them and process focusing and keyboard actions on the li element. Add aria-expanded to focused li's sub nav

// √ To do: support multiple nav.drop
// √ To do: hover
// √ To do: z-index when sub nav overlaps top-level li
// √ To do: arrows without PNG images
// √ To do: when focusin on a top-level item, hide its grandchildren
// Note: Safari needs alt+Tab in order to cycle through all the nav items

function closest(el, target) { // Thanks http://gomakethings.com/ditching-jquery/ – Accepts either a selector string or an actual element

    for ( ; el && el !== document; el = el.parentNode ) {

		if (typeof target === 'string' ? el.matches(target) : el === target) {
			
			return el;

		}

    }

    return false;

}

// Real time touch detection to support devices with both touch and mouse. http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml

;(function(){

    var isTouch = false; //var to indicate current input type (is touch versus no touch) 
    var isTouchTimer;
    var curRootClass = ''; //var indicating current document root class ("can-touch" or "")
     
    function addtouchclass(e) {

        clearTimeout(isTouchTimer);
        isTouch = true;
        if (curRootClass != 'can-touch') { //add "can-touch' class if it's not already present

            curRootClass = 'can-touch';
            document.querySelector('html').classList.add(curRootClass);

        }

        isTouchTimer = setTimeout(function(){isTouch = false}, 500); //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event

    }
     
    function removetouchclass(e){

        if (!isTouch && curRootClass === 'can-touch'){ //remove 'can-touch' class if not triggered by a touch event and class is present

            isTouch = false;
            curRootClass = '';
            document.querySelector('html').classList.remove(curRootClass);

        }

    }
     
    document.addEventListener('mouseover', removetouchclass, false); //this event gets called when input type is everything from touch to mouse/ trackpad
    document.addEventListener('touchstart', addtouchclass, false); //this event only gets called when input type is touch

})();

/* –––  */

function closeDropNavClickedOutside(e) { // Close the nav when clicking outside

	if (!closest(e.target, 'nav li')) {

		document.querySelectorAll('nav ul').forEach ( function (el) {
			
			el.removeAttribute('aria-expanded');
			
		});
		
		if (document.querySelector('nav :focus')) {

			document.querySelector('nav :focus').blur();
		
		}
		
	}
	
}

function initNav(el) {

	// Delete all trigger inputs, add tabindex=0 to each li
	
	el.querySelectorAll('input').forEach(function (el) {
		
		el.outerHTML = '';
		
	});
	
	el.setAttribute('role', 'menubar');

	el.querySelectorAll('li').forEach(function (el) {
		
		el.querySelector('a').setAttribute('tabindex', 0);

	});

	if (!closest(el, 'nav.drop')) { // The rest is for drop nav only
		
		return;

	}

	el.querySelectorAll('li').forEach(function (el) {
		
		var anchor = el.querySelector('a');

		anchor.addEventListener('focus', function (e) {

			var el = e.target;
	
			// If a main item is focused, hide all sub items from the other main items. To do: fix error when there's no open sub nav

/*
			if (el.parentNode.parentNode.getAttribute('role')) {
				
				closest(el, 'nav').querySelector('ul[aria-expanded]').removeAttribute('aria-expanded');
				
			}
*/

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
	
		if (el.querySelector('ul')) {
	
			el.setAttribute('aria-haspopup', true);
		
		}
	
		el.addEventListener('touchend', function (e) {

			if (e.target.querySelector('a')) {

				e.target.querySelector('a').focus();
			
			}
		
		});

	// parent blurs, child focuses, script hides child
	
		anchor.addEventListener('blur', function (e) {

			var this_nav = closest(e.target, 'nav');
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

			el = e.target.parentNode;
			if (!el.nextElementSibling && // last item
				el.parentNode.parentNode.nodeName === 'LI' && // of third-level nav
				!el.parentNode.parentNode.nextElementSibling) {
					
					el.parentNode.parentNode.parentNode.removeAttribute('aria-expanded');
			
			}
			
		});
		
	});

	if (!window.closeDropNavClickedOutsideEnabled) {
		
		window.addEventListener('touchend', closeDropNavClickedOutside);
		window.closeDropNavClickedOutsideEnabled = true;
	
	}
	
	el.addEventListener('keyup', function (e) {
		
		// Check for sibling or children to expand on control keys Left/Right/etc
	
		if (e.key === 'Escape') {
			
			closest(e.target, 'nav').querySelectorAll('ul').forEach ( function (el) {
				
				el.removeAttribute('aria-expanded');
				
			});
			
			document.querySelector(':focus').blur();
			
		}
		
	});
	
}

document.querySelectorAll('nav > ul:not([role])').forEach( function (el) {
	
	initNav(el);
	
});
