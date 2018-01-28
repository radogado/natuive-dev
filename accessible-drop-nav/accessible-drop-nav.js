// The nav should be accessible by tab only, in addition to the arrow keys
// Home/End keys to jump to first/last item

// No-JS version works with clicking/tapping. Only JS version supports keyboard and doesn't need the inputs. So, delete them and process focusing and keyboard actions on the li element. Add aria-expanded to focused li's sub nav

// √ To do: support multiple nav.drop
// √ To do: hover
// √ To do: z-index when sub nav overlaps top-level li
// √ To do: arrows without PNG images
// √ To do: when focusin on a top-level item, hide its grandchildren
// Note: Safari needs alt+Tab in order to cycle through all the nav items

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

function closest(el, target) { // Thanks http://gomakethings.com/ditching-jquery/ – Accepts either a selector string or an actual element

    for ( ; el && el !== document; el = el.parentNode ) {

		if (typeof target === 'string' ? el.matches(target) : el === target) {
			
			return el;

		}

    }

    return false;

}

function forEach(selector, fn) { // Accepts both an array and a selector

    var elements = (typeof selector === 'string') ? document.querySelectorAll(selector) : selector;
	if (elements.length > 0) {

	    for (var i = 0; i < elements.length; i++) {
	
	        fn(elements[i], i);
	
	    }
	    
    }

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

		forEach ('nav ul', function (el) {
			
			el.removeAttribute('aria-expanded');
			
		});
		
		if (document.querySelector('nav :focus')) {

			document.querySelector('nav :focus').blur();
		
		}
		
	}
	
}

function dropNavBlur(e) {

	var this_nav = closest(e.target, 'nav');
	
	if (!closest(e.relatedTarget, this_nav)) { // if e.relatedTarget is not a child of this_nav, then the next focused item is elsewhere
		
		forEach ( this_nav.querySelectorAll('ul'), function (el) {

			el.removeAttribute('aria-expanded');
			
		});
		return;
		
	}
	// Close neighboring parent nav's sub navs.
	var el = e.target;
	var target_parent = closest(el, '[aria-haspopup]');
	forEach(target_parent.querySelectorAll('ul[aria-expanded]'), function (el) { // Disable active grandchildren

		el.removeAttribute('aria-expanded');

	});

	el = e.target.parentNode;
	if (!el.nextElementSibling && // last item
		el.parentNode.parentNode.nodeName === 'LI' && // of third-level nav
		!el.parentNode.parentNode.nextElementSibling) {
			
			el.parentNode.parentNode.parentNode.removeAttribute('aria-expanded');
	
	}
	
}
		
function dropNavFocus(e) {

	// Close focused third level child when focus moves to another top-level item
	
	var el = closest(e.target, 'nav > ul > li');
	
	forEach(el.parentNode.childNodes, function (a) {

		if (a.nodeName === 'LI' && a !== el) {
		
			forEach(a.querySelectorAll('[aria-expanded]'), function (el) {
				
				el.removeAttribute('aria-expanded');
				
			});
		
		}
		
	});
	
	el = e.target;

	el.parentNode.parentNode.setAttribute('aria-expanded', true);
	if (el.parentNode.querySelector('ul')) {

		el.parentNode.querySelector('ul').setAttribute('aria-expanded', 'true');

	}
	
	var current_item = e.target.parentNode;

	forEach(current_item.parentNode.parentNode.childNodes, function (el) {

		if (el !== current_item && el.nodeName === 'LI' && el.querySelector('ul')) {

			el.querySelector('ul').removeAttribute('aria-expanded');
		
		}
		
	});
	
}

function initNav(el) {
	
	// Delete all trigger inputs, add tabindex=0 to each li
	
	forEach(el.querySelectorAll('input'), function (el) {
		
		el.outerHTML = '';
		
	});
	
	el.setAttribute('role', 'menubar');

	forEach(el.querySelectorAll('li'), function (el) {
		
		el.querySelector('a').setAttribute('tabindex', 0);

	});

	if (!closest(el, 'nav.drop')) { // The rest is for drop nav only
		
		return;

	}

	if (!window.closeDropNavClickedOutsideEnabled) {
		
		window.addEventListener('touchend', closeDropNavClickedOutside);
		window.closeDropNavClickedOutsideEnabled = true;
	
	}
	
	el.addEventListener('keyup', function (e) {
		
		// Check for sibling or children to expand on control keys Left/Right/etc
	
		if (e.key === 'Escape') {
			
			forEach (closest(e.target, 'nav').querySelectorAll('ul'), function (el) {
				
				el.removeAttribute('aria-expanded');
				
			});
			
			document.querySelector(':focus').blur();
			
		}
		
	});
	
	forEach(el.querySelectorAll('li'), function (el) {
		
		if (el.querySelector('ul')) {
	
			el.setAttribute('aria-haspopup', true);
		
		}
	
		el.addEventListener('touchend', function (e) {

			e.preventDefault();
			e.stopPropagation();
			
			var el = e.target;
			
			if (el.nodeName === 'LI') {
				
				el = el.querySelector('a');
				
			}
			
			if (el === document.activeElement) {

				el.blur();

			} else {
			
				el.focus();
			
			}
				
		});

		var anchor = el.querySelector('a');

		anchor.addEventListener('focus', dropNavFocus);
	
		anchor.addEventListener('blur', dropNavBlur);
		
	});

}

forEach('nav > ul:not([role])', function (el) {
	
	initNav(el);
	
});
