(function ($) {
    "use strict";
    var pluginName = "",
        defaults = {
            slideTimer: 350,
            direction: "next"
        };
    function Slider(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this.interval = "";
        this.firstRun = true;

        this.init();
    }
    Slider.prototype = {
        autoSlide: function () {
            clearInterval(this.interval);
            this.interval = 0;
            this.interval = setInterval($.proxy(this.next, this), 5000);
            return this;
        },
        next: function () {
            return this.slide("next");
        },
        prev: function () {
            return this.slide("prev");
        },
        slide: function (type) {
            var $el = this.$element,
                $active = $(".active"),
                direction = (type === "next") ? true : false,
                $nextSlide = {},
            //huffguff only needed for next/prev clicks
                huffguff = direction ? ":first" : ":last";
            if ((($active.index() === $el.children().length - 1) && direction) || (!direction && ($active.index() === 0))) {
                $active.removeClass("active");
                $active = $el.children(".slider-item").filter(huffguff);
                $active.addClass("active");
                $nextSlide = $active.next();
            }
            else if ((!this.firstRun)) {
                $nextSlide = direction ? $active.next() : $active.prev();
                $active.removeClass("active");
                $nextSlide.addClass("active");
                $active = $nextSlide;
                $nextSlide = $active.next();
            }
            this.firstRun = false;
            this.autoSlide();
            return this;
        },
        init: function () {
            var $slider = this;
            this.next();
            $(document).on("click", ".slide-control", function (e) {
                e.preventDefault();
                var $slideControl = $(this),
                    direction = ($slideControl.attr("data-slide") === "next") ? true : false;
                direction ? $slider.next() : $slider.prev();
            });
        }
    };
    $.fn.slider = function (options) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data("slider");
            if (!data) {$this.data("slider", (data = new Slider(this, options))); }
        });
    };
    $.fn.slider.Constructor = Slider;
}(jQuery));