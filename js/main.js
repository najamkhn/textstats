/*
 *   main.js
 *
 *   Created by Najam K.
 *   --
 *
 *   Contains functions to display text statistics
 *
 */

(function(window, document, $, module, undefined) {

    module.lineStats = function(text, fontProp, fontSize) {
        var renderText = text.split(' '),
            lines = [],
            lineWidth = [],
            lineNo = 0,
            lastIndex = 0,
            maxWidth = parseInt($('.maxWidth').val()),
            spaceWidth = parseFloat(module.textWidth(' ', fontProp)),
            wordWidths = {};

        wordWidthsWithSpace = renderText.map(function(el, index) {
            return parseFloat(module.textWidth(el, fontProp)) + spaceWidth;
        });

        if (Math.max.apply(null, wordWidthsWithSpace) > maxWidth) {
            throw Error("ERR:TOO_LONG");
        }

        wordWidthsWithSpace.reduce(function(prev, current, index, arr) {
            var total = prev + current;

            if (total >= maxWidth || (index == arr.length - 1)) {
                lines[lineNo++] = renderText.slice(lastIndex, (index == arr.length - 1) ? arr.length : index);
                lineWidth.push(prev);
                prev = 0;
                lastIndex = index;
            }
            return prev + current;
        });

        return {
            longestLineWidth: Math.max.apply(null, lineWidth),
            lines: lines
        };
    }

    module.renderContent = function(lines) {
        return lines.map(function(el, index) {
            return '<p class="l' + index + '">' + el.join(' ') + '</p>';
        });
    }

    module.textWidth = function(text, fontProp) {
        var tag = $('.str-width'),
            result = false;

        if (tag.length < 1) {
            tag = $('<span class="str-width">')
            tag = $('<span>')
                .addClass('str-width')
                .css('left', '-100%')
                .css('position', 'absolute')
                .css('white-space', 'pre-wrap')
                .attr('display', 'inline');
            $('body').append(tag);
        }

        tag.html(text).css('font', fontProp);
        result = tag.width();
        return result;
    };

    module.isChanged = function() {
        var args = arguments[0];
        return function(e) {
            var return_val = false;

            // Checking if either of the values are not null and max-width is not greater than font-size.
            if ((parseInt(args.fontSize.val()) > parseInt(args.maxWidth.val())) || (!args.fontSize.val() || !args.maxWidth.val())) {
                $('span.error').html('Some of the required values are empty or invalid').css('display', 'block');
                return -1;
            }

            // Only do something when there is content
            if (!!args.inputContentVal) {
                var fontProp = args.fontSize.val() + ' ' + args.fontFamily.val(),
                    values = module.lineStats(
                        args.inputContentVal.val(),
                        fontProp,
                        args.fontSize.val()
                    );

                // Show the results container
                args.results.show();

                // Setup content so its renderable
                $('body').append(module.renderContent(values.lines));
                console.log(values.longestLineWidth);
            }

            return return_val;
        }
    }

    $(function() {
        $('.btn-render').on(
            'click',
            module.isChanged({
                "inputContentVal": $('.input-content'),
                "fontSize": $('.fontSize'),
                "fontFamily": $('.fontFamily'),
                "results": $('.result'),
                "maxWidth": $('.maxWidth'),
                "renderedContent": $('.rendered-content'),
                "totalStrWidth": $('.totalStrWidth'),
                "totalChrs": $('.totalChrs'),
                "numLines": $('.numLines')
            })
        );
    });

})(this, this.document, this.jQuery, this.TextStats = this.TextStats || {});
