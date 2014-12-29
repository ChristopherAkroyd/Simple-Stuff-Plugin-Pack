/*
 * JSocial-Buttons
 * A small plugin used to animate a change in the background colour of a social media e.g. facebook or a contact button e.g. email, from a neutral colour(black/white)
 * to the background colour of the logo, for facebook this would be #3b5998. In order for the plugin to function correctly, each social media button
 * must have a class attribute for the name of the social media button, for instance a social media button for facebook must have "facebook" as a class name
 * in order for the transition colour to be matched correctly.
 * Currently implemented defaults: facebook, twitter, googlePlus, stackOverflow, linkedIn, youtube, github, skype,
 * groupon, imdb, kickstarter, payapl.
 * @author Christopher Akroyd
 * @version 1.0 25th November 2014
 */
(function ($) {
    "use strict";
    // Defaults and plugin name
    var pluginName = "Button Colour Scheme Inverter",
        defaults = {
            backgroundColour: "#12A5F4",
            startingColour: "#000000",
            socialSites: {
                facebook: "#3b5998",
                twitter: "#00ACED",
                googlePlus: "#d34836",
                stackOverflow: "#FF9900",
                linkedIn: "#4875B4",
                youtube: "#cd201f",
                github: "#563D7C",
                skype: "#12A5F4",
                groupon: "#82b548",
                imdb: "#f5de50",
                kickstarter: "#2bde73",
                paypal: "#179bd7"
            },
            time: 250
        };
    function ContactButton(element, options) {
        this.$element = $(element);
        defaults.startingColour = this.$element.css("background-color");
        this.options = $.extend({}, defaults, options);
        this.init();
    }
    ContactButton.prototype = {
        init: function () {
            var $el = this.$element, backgroundColour = this.getSocialColours(), options = this.options;
            $el.hover(function () {
                $el.stop(true).animate({ backgroundColor: backgroundColour }, options.time);
            }, function () {
                $el.stop(true).animate({ backgroundColor: options.startingColour }, options.time);
            });
        },
        getSocialColours: function () {
            var $el = this.$element,
                socialSites = this.options.socialSites,
                socialSitesKeys = Object.keys(socialSites);
            for (var i = 0; i < socialSitesKeys.length; i++) {
                if ($el.attr("class").search(socialSitesKeys[i]) != -1) {
                    var matchingKey = socialSitesKeys[i];
                    return socialSites[matchingKey];
                }
            }
            return this.options.backgroundColour;
        }
    };
    $.fn.contactButton = function (options) {
        return this.each(function () {
            new ContactButton(this, options);
        });
    };
    $.fn.contactButton.Constructor = ContactButton;
}(jQuery));
