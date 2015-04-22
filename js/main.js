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
            longestlineWidth = 0,
            maxWidth = parseInt($('.maxWidth').val()),
            spaceWidth = parseFloat(module.textWidth(' ', fontProp)),

            wordWidthsWithSpace = renderText.map(function(el) {
                return parseFloat(module.textWidth(el, fontProp)) + spaceWidth;
            });


        if (Math.max.apply(null, wordWidthsWithSpace) > maxWidth) {
            return -1;
        }

        wordWidthsWithSpace.reduce(function(prev, current, index, arr) {
            var total = prev + current;
            console.log(
                total >= maxWidth || (index == arr.length - 1),
                total >= maxWidth,
                (index == arr.length - 1),
                index,
                arr.length
            );

            if (total >= maxWidth || (index == arr.length - 1)) {
                lines[lineNo++] = renderText.slice(lastIndex, (index == arr.length - 1) ? arr.length : index);
                lineWidth.push(prev);
                prev = 0;
                lastIndex = index;
            }
            return prev + current;
        });

        longestlineWidth = Math.max.apply(null, lineWidth);

        return {
            longestLineIndex: lineWidth.indexOf(longestlineWidth),
            longestLineWidth: longestlineWidth,
            lines: lines
        };
    };

    module.renderContent = function(lines, fontProp) {
        return lines.map(function(el, index) {
            return '<p class="lines l' + index + '" style="font: ' + fontProp + ';">' + el.join(' ') + '</p>';
        });
    };

    module.textWidth = function(text, fontProp) {
        var tag = $('.str-width'),
            result = false;

        if (tag.length < 1) {
            tag = $('<span>')
                .addClass('str-width')
                .css('left', '-100%')
                .css('position', 'absolute')
                .css('white-space', 'pre-wrap')
                .attr('dsisireplay', 'inline');
            $('body').append(tag);
        }

        tag.html(text).css('font', fontProp);
        result = tag.width();
        return result;
    };

    module.isChanged = function() {
        var args = arguments[0];
        return function() {
            var return_val = false,
                is_font_size_gt_max_width = (parseInt(args.fontSize.val()) > parseInt(args.maxWidth.val())),
                is_font_size_max_width_not_null = (!args.fontSize.val() || !args.maxWidth.val());
            // Checking if either of the values are not null and max-width is not greater than font-size.
            if (is_font_size_gt_max_width || is_font_size_max_width_not_null) {
                $('span.error')
                    .html('Some of the required values are empty or invalid')
                    .css('display', 'block');
                args.renderContent.hide();
                return -1;
            }

            // Only do something when there is content
            if (!!args.inputContentVal) {
                var fontProp = args.fontSize.val() + 'px ' + args.fontFamily.val(),
                    values = module.lineStats(
                        args.inputContentVal.val(),
                        fontProp,
                        args.fontSize.val()
                    );

                if (values < 0) {
                    args.errorValues.html('One of the entered word is longer than the max-width provided.<br />');
                    args.renderContent.hide();
                    return return_val;
                }

                // Show the results container
                args.results.show();

                // Setup content so its renderable
                args.renderedContent
                    .html(module.renderContent(values.lines, fontProp))
                    .width(args.maxWidth.val() + "px");


                // highlight the longest line
                $('.l' + values.longestLineIndex).css('background', 'orange');

                args.longestLine.html(values.longestLineWidth + "px");
                args.longestLineIndex.html(values.longestLineIndex + 1);
                args.totalLines.html(values.lines.length);
            }

            return return_val;
        };
    };

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
                "lines": $('.lines'),
                "longestLine": $('.longest-line'),
                "longestLineIndex": $('.longest-line-index'),
                "totalLines": $('.total-lines'),
                "numLines": $('.numLines'),
                "errorValues": $('span.error')
            })
        );
    });

})(this, this.document, this.jQuery, this.TextStats = this.TextStats || {});
