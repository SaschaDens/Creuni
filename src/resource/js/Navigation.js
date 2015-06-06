(function ($) {
    var isLocked = false;

    $('a[href*=#]:not([href=#])').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var mainNav = $('#main-navbar-header'),
                target = $(this.hash);

            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                var base = $('html, body');
                isLocked = true;

                mainNav.find('li').removeClass('active');
                $(this).parent().addClass('active');

                base.clearQueue()
                    .stop()
                    .animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        isLocked = false;
                    });

                if (history.pushState) {
                    history.pushState(null, null, this.hash);
                }

                return false;
            }
        }
    });

    $(window).on('scroll', function () {
        var mainNav = $('#main-navbar-header'),
            scrollPos = $(window).scrollTop();

        $('section.box').each(function (index) {
            if ($(this).position().top <= scrollPos + 120 && !isLocked) {
                mainNav.find('li').removeClass('active');
                mainNav.find('li').eq(index).addClass('active');
            }
        });
    });
})(jQuery);

(function ($) {
    var mainheader = $('.parallax-header-home'),
        mainNav = $('#main-navbar-header'),
        vm = this;

    this.init = function () {
        _handlers();
    };

    var _isOverFold = function () {
        var verticalPos = jQuery(this).scrollTop(),
            stickyHeight = mainheader.height();

        if (verticalPos > stickyHeight) {
            mainNav.addClass('navbar-fixed-top');
        } else {
            mainNav.removeClass('navbar-fixed-top');
        }
    }

    var _handlers = function () {
        $(window).on('scroll', _isOverFold);
    }

    vm.init();
})(jQuery);