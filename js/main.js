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
            'avgWidth': Math.ceil(width/fontSize)
        };
    };

    NS.isChanged = function() {
        var args = arguments[0];
        return function(e) {
            var return_val = false;

            // Checking if either of the values are not null and max-width is not greater than font-size.
            if ((args.fontSize > args.maxWidth) || (!!args.fontSize || !!args.maxWidth))
                return -1;

            // Only do something when there is content
            if (!!args.inputContentVal) {
                var fontProp = args.fontSize + ' ' + args.fontFamily,
                    values   = NS.averageCharacterWidth(args.inputContentVal,
                                                        fontProp,
                                                        args.fontSize);

                // Show the results container
                args.results.show();

                // Setup content so its renderable
                args.renderedContent
                    .css('font', fontProp)
                    .html(args.inputContentVal)
                    .width(args.maxWidth);
            }

            return return_val;
        }
    }

    $(function() {
        $('.btn-render').on(
            'click',
            NS.isChanged({
                "inputContentVal" : $('.input-content').val(),
                "fontSize"        : $('.fontSize').val() || "12",
                "fontFamily"      : $('.fontFamily').val() && $('.fontFamily').val().toLowerCase() || "sans",
                "results"         : $('.result'),
                "maxWidth"        : $('.maxWidth').val(),
                "renderedContent" : $('.rendered-content')
            })
        );
    });

})(this, this.document, this.jQuery, this.TextStats=this.TextStats || {});
