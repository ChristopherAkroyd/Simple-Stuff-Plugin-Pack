/**
 * JSmooth-scroll
 * A small plugin used to animate the transition to a element when an internal link is
 * clicked rather than immediatly jumping to the element on the page.
 * Optionally the developer can specify how long they want the transition to take and the
 * Jquery easing engine to be used. If the plugin is called on a non-href containing element,
 * an error is thrown to alert the developer of their mistake.
 * @author Christopher Akroyd
 * @version 1.0 8th December 2014
 */
(function ($) {
    "use strict";
    var pluginName = "Smooth Scroll",
        defaults = {
            time: 600,
            easing: "swing"
        };
    function SmoothScroll(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this.scroll();
    }
    SmoothScroll.prototype = {
        scroll: function () {
            var $linkTarget = $(this.$element.attr("href")),
                options = this.options;
            if (this.$element.attr("href") !== undefined) {
                this.$element.click(function (e) {
                    e.preventDefault();
                    $("html, body").stop().animate({ scrollTop: $linkTarget.offset().top }, options.time, options.easing);
                });
            }
            else {
                throw "JSmooth-Scroll Error, element must contain a href attribute.";
            }
        }
    };
    $.fn.smoothScroll = function (options) {
        return this.each(function () {
            new SmoothScroll(this, options);
        });
    };
    $.fn.smoothScroll.Constructor = SmoothScroll;
}(jQuery));
