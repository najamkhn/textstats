describe('Tests', function(){
    it('If fontSize is bigger than maxWidth', function(){
        TextStats.isChanged({
            "inputContentVal": "hello",
            "fontFamily": "sans",
            "fontSize": "12",
            "maxWidth": "11",
            "results": $('.result'),
            "renderedContent": $('.rendered-content')
        })().should.equal(-1);
    });

    it('If fontSize is empty or zero', function(){
        TextStats.isChanged({
            "inputContentVal": "hello",
            "fontFamily": "sans",
            "fontSize": "0",
            "maxWidth": "11",
            "results": $('.result'),
            "renderedContent": $('.rendered-content')
        })().should.equal(-1);
    });

    it('If fontSize is less than zero', function(){
        TextStats.isChanged({
            "inputContentVal": "hello",
            "fontFamily": "sans",
            "fontSize": "-1",
            "maxWidth": "11",
            "results": $('.result'),
            "renderedContent": $('.rendered-content')
        })().should.equal(-1);
    });

    it('If maxWidth is empty or zero', function(){
        TextStats.isChanged({
            "inputContentVal": "hello",
            "fontFamily": "sans",
            "fontSize": "10",
            "maxWidth": "0",
            "results": $('.result'),
            "renderedContent": $('.rendered-content')
        })().should.equal(-1);
    });

    it('If maxWidth is less than zero', function(){
        TextStats.isChanged({
            "inputContentVal": "hello",
            "fontFamily": "sans",
            "fontSize": "10",
            "maxWidth": "-1",
            "results": $('.result'),
            "renderedContent": $('.rendered-content')
        })().should.equal(-1);
    });

    it('textWidth should return zero when value is not present', function(){
        TextStats.textWidth('', '').should.equal(0);
    });

    it('textWidth should return non-zero when value is present', function(){
        TextStats.textWidth('hello world', '12px sans').should.not.equal(0);
    });

});

