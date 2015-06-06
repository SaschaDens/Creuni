(function($) {
    var $items = $('.input-count');

    $items.each(function (){
        var $item = $(this),
            target = $item.data('target'),
            $target = $(target),
            maxChars = $target.attr('maxlength');

        $target.on('keydown change', function () {
            var fieldLength = $(this).val().length,
                charsLeft = maxChars - fieldLength;

            if (charsLeft >= 0) {
                $item.text('' + charsLeft);
            } else {
                $item.text('0');
            }
        });
    });
})(jQuery);