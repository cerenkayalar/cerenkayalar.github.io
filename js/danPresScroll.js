$(document).ready(function () {
    "use strict";
    var cbpFixedScrollLayout = (function () {

	// cache and initialize some values
	        var config = {
		// the cbp-fbscroller's sections
                $sections : $('body > section'),
		// the navigation links
                $navlinks : $('body > nav:first > a'),
		// index of current link / section
		        currentLink : 0,
		// the body element
		        $body : $('html, body'),
		// the body animation speed
                animspeed : 650,
		// the body animation easing (jquery easing)
		        animeasing : 'easeInOutExpo'
            };

	        function init() {

		// click on a navigation link: the body is scrolled to the position of the respective section
		        config.$navlinks.on('click', function () {
			        scrollAnim(config.$sections.eq($(this).index()).offset().top);
			        return false;
                });

		// 2 waypoints defined:
		// First one when we scroll down: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
		// Second one when we scroll up: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
		        config.$sections.waypoint(function (direction) {
                    if (direction === 'down') { changeNav($(this)); }
                }, {offset: '30%' }).waypoint(function (direction) {
                    if (direction === 'up') { changeNav($(this)); }
                }, { offset: '-30%' });

		// on window resize: the body is scrolled to the position of the current section
                $(window).on('debouncedresize', function () {
                    scrollAnim(config.$sections.eq(config.currentLink).offset().top);
                });
                
                /*$(window).mousedown(function(){
                  $(window).on('scroll', function () {
			     scrollAnim(config.$sections.eq(config.currentLink).offset().top);
		          });
                                
            });*/
            }

	// update the current navigation link
            function changeNav($section) {
                config.$navlinks.eq(config.currentLink).removeClass('current');
                config.currentLink = $section.index('section');
                config.$navlinks.eq(config.currentLink).addClass('current');
            }

	// function to scroll / animate the body
            function scrollAnim(top) {
                config.$body.stop().animate({ scrollTop : top }, config.animspeed, config.animeasing);
            }

            return { init : init };

        }());
    cbpFixedScrollLayout.init();
});

Element.prototype.hasClass = function (className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

var mySlidelist = document.getElementsByTagName("section");
     
for (var i = 0; i < mySlidelist.length; i++) {
    var index = i;
    if (i < 10) {index = "0" + i;}
    
    var node = document.createElement("a");
    node.href = "#s"+index;
    node.setAttribute("data-panel", index);
    
    if(i==0) {node.className ="current";}
    var textnode = document.createTextNode("Section "+i);
    node.appendChild(textnode);
    document.getElementsByTagName("nav")[0].appendChild(node);

    mySlidelist[i].setAttribute("id", "s" + index);
    mySlidelist[i].setAttribute("data-panel", index);

    if (mySlidelist[i].hasClass("collapsible")) {
                  var closure = document.createElement("div");
                  closure.setAttribute("class", "x");
                  var aclosure = document.createElement("a");         // Create a text node
                  aclosure.href = "javascript:void(0)";
                  aclosure.onclick = function(){toggle_visibility(this.id);};
                  aclosure.setAttribute("id", "xa" + index);
                  var textclosure = document.createTextNode("X");
                  aclosure.appendChild(textclosure);
                  closure.appendChild(aclosure);
                  mySlidelist[i].appendChild(closure);
        
                  mySlidelist[i].getElementsByClassName("text")[0].setAttribute("id", "xt" + index);
        
                 }
};



function toggle_visibility(id) {
    "use strict";
    var str1 = "xt",
        str2 = id.substring(2),
        obby = str1.concat(str2),
        e = document.getElementById(obby);
    e.style.visibility = ((e.style.visibility !== 'hidden') ? 'hidden' : 'visible');
};
