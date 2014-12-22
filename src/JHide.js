/*
 * Dynamic Hiding Plugin
 * A plugin which hides elements when they are a certin distance from the top of the users 
 * viewport
 */
(function ($) {
    "use strict";
    var pluginName = "JHide",
        defaults = {
            distanceMax: 150,
            timeToHide: 150,
            opacityMin: 0,
            opacityMax: 1
        };
    function JHide(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this.hide();
    }
    JHide.prototype = {
        hide: function () {
            var $el = this.$element,
                options = this.options;
            $(document).scroll(function () {
                $el.stop();
                if (options.distanceMax > $el.offset().top - $(window).scrollTop()) {
                    $el.animate({ opacity: options.opacityMin }, options.timeToHide);
                }
                else {
                    $el.animate({ opacity: options.opacityMax }, options.timeToHide);
                }
            });
        }
    };
    $.fn.jHide = function (options) {
        return this.each(function () {
            new JHide(this, options);
        });
    };
    $.fn.jHide.Constructor = JHide;
}(jQuery));