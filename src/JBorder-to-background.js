/*
 * JButtonBorder-to-background
 * A simple plugin for animating buttons. When a button is hovered over while using
 * this plugin, the border colour is applied as the background for the button and switches the
 * colour of any text within the button to being the colour of the background before the
 * transition.
 * @author Christopher Akroyd
 * @version 1.0 9th December 2014
 */
; (function ($) {
    "use strict";
    var pluginName = "JBorder-to-background",
        defaults = {
            textColour: "#000000",
            borderColour: "#FFFFFF",
            backgroundColour: "rgba(0,0,0,0)",
            time: 200
        };
    function ButtonBorderToBackground(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, defaults, {
            textColour: this.$element.css("color"),
            borderColour: this.$element.css("border-top-color"),
            backgroundColour: this.$element.css("background-color")
        }, options);
        this.init();
    }
    ButtonBorderToBackground.prototype = {
        init: function () {
            var $el = this.$element,
                options = this.options;
            this.configureOptions(options);
            $el.hover(function () {
                $el.animate({ "background-color": options.borderColour, "color": options.backgroundColour }, options.time);
            }, function () {
                $el.animate({ "background-color": options.startingBackgroundColour, "color": options.startingColour }, options.time);
            });
        },
        configureOptions: function (options) {
            var optionsKeys = Object.keys(options);
            for (var i = 0; i < optionsKeys.length; i++) {
                var currentKey = optionsKeys[i],
                    currentValue = options[currentKey];
                if (currentValue === undefined || currentValue === "rgba(0, 0, 0, 0)") {
                    options[currentKey] = "rgba(0,0,0,1)";
                }
            }
            options.startingColour = this.$element.css("color");
            options.startingBackgroundColour = this.$element.css("background-color");
        },
    };
    $.fn.buttonBorderToBackground = function (options) {
        return this.each(function () {
            new ButtonBorderToBackground(this, options);
        });
    };
    $.fn.buttonBorderToBackground.Constructor = ButtonBorderToBackground;
}(jQuery));
