/**
 * JSimple-Slider
 * A lightweight simple slider(Also known as a carousel) which iterates through all
 * slider-item children, changing which one is active and visible in the slider after
 * the slideTime(defined in defaults) has expired. Working on lovely CSS transitons.
 * @author Christopher Akroyd
 * @version 1.0 9th December.
 */
 ; (function ($) {
   "use strict";
   var pluginName = "JSimple-Slider";
   var defaults = {
     slideTime: 2500
   };
   function SimpleSlider(element, options) {
     this.$element = $(element);
     this.options = $.extend({}, defaults, options);
     this.autoSlide();
   }
   SimpleSlider.prototype = {
     autoSlide: function () {
       this.interval = setInterval($.proxy(this.slide, this), this.options.slideTime);
     },
     slide: function () {
       var $el = this.$element;
       var $activeSlide = $(".active");
       var $nextSlide = $activeSlide.next();
       if($activeSlide.index() === $el.children().length - 1) {
         $nextSlide = $el.children(".slider-item").filter(":first");
       }
       $activeSlide.removeClass("active");
       $nextSlide.addClass("active");
       $activeSlide = $nextSlide;
     }
   }
   $.fn.simpleSlider = function (options) {
     return this.each(function () {
       new SimpleSlider(this, options);
     });
   };
   $.fn.simpleSlider.Constructor = SimpleSlider;
 }(jQuery));
