/*
*   main.js
*
*   Created by Najam K.
*   --
*
*   Contains functions to display text statistics
*
*/

(function(window, document, $, NS, undefined) {

    NS.longestLine = function(text, fontProp) {
        var renderEl = $('.rendered-content').clone(),
            maxWidth = parseInt($('.maxWidth').val()),
            lineNo = 0, lineContent = [], lineWidth = 0;

        renderEl.addClass('rendered-content-clone');
        renderEl.css('width', $('.maxWidth').val());

        $('body').append(renderEl);

        textList = text.split(' ');

        textList.forEach(function(el, index) {
            lineNo = (parseInt(renderEl.html(textList.slice(0, index).join(' ')).height()) / parseInt(renderEl.css('line-height')) - 1)
            if (!lineContent[lineNo]) {
                lineContent[lineNo] = []
                if (lineContent[lineNo - 1]) {
                    console.log(
                        lineNo,
                        parseInt(renderEl.html(textList.slice(0, index).join(' ')).height()),
                        parseInt(renderEl.css('line-height')),
                        lineContent[lineNo - 1].join(' '),
                        NS.textWidth(lineContent[lineNo - 1].join(' '), fontProp)
                    );
                }
            }
            lineContent[lineNo].push(el);
        });

        renderEl.remove();
    }


    // Get set width via the DOM way
    NS.textWidth = function(text, fontProp) {

        var tag = document.createElement("span"),
            result = false;

        tag.style.position   = "absolute";
        tag.style.left       = "-100%";
        tag.style.whiteSpace = "nowrap";
        tag.style.font       = fontProp;
        tag.innerHTML        = text;

        document.body.appendChild(tag);
        result = tag.clientWidth;
        document.body.removeChild(tag);
        return result;
    };

    NS.averageCharacterWidth = function(text, fontProp, fontSize) {
        var width = NS.textWidth(text, fontProp);
        return {
            'width': width,
            'avgWidth': Math.ceil(width/parseFloat(fontSize))
        };
    };

    NS.isChanged = function() {
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
                var fontProp = args.fontSize.val() + ' ' + args.fontFamily.val().toLowerCase(),
                    values   = NS.averageCharacterWidth(args.inputContentVal.val(),
                                                        fontProp,
                                                        args.fontSize.val());

                // Show the results container
                args.results.show();

                // Setup content so its renderable
                args.renderedContent
                    .css('font', fontProp)
                    .css('line-height', 'inherit')
                    .html(args.inputContentVal.val())
                    .width(args.maxWidth.val());

                args.totalStrWidth.html(values.width);
                args.totalChrs.html(args.inputContentVal.val().length);
                args.numLines.html(
                    args.renderedContent.height() / parseInt(args.renderedContent.css('line-height'))
                );

            }

            return return_val;
        }
    }

    $(function() {
        $('.btn-render').on(
            'click',
            NS.isChanged({
                "inputContentVal" : $('.input-content'),
                "fontSize"        : $('.fontSize'),
                "fontFamily"      : $('.fontFamily'),
                "results"         : $('.result'),
                "maxWidth"        : $('.maxWidth'),
                "renderedContent" : $('.rendered-content'),
                "totalStrWidth"   : $('.totalStrWidth'),
                "totalChrs"       : $('.totalChrs'),
                "numLines"        : $('.numLines')
            })
        );
    });

})(this, this.document, this.jQuery, this.TextStats=this.TextStats || {});
