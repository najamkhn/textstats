describe('Tests', function(){
    it('If fontSize is bigger than maxWidth', function(){
        TextStats.isChanged({
            "fontSize": $('foo').val('12'),
            "maxWidth": $('bar').val('11'),
        })().should.equal(-1);
    });

    it('If fontSize is empty or zero', function(){
        TextStats.isChanged({
            "fontSize": $('foo').val('0'),
            "maxWidth": $('bar').val('11'),
        })().should.equal(-1);
    });

    it('If fontSize is less than zero', function(){
        TextStats.isChanged({
            "fontSize": $('foo').val('-1'),
            "maxWidth": $('bar').val('11'),
        })().should.equal(-1);
    });

    it('If maxWidth is empty or zero', function(){
        TextStats.isChanged({
            "fontSize": $('foo').val('10'),
            "maxWidth": $('bar').val(''),
        })().should.equal(-1);
    });

    it('If maxWidth is less than zero', function(){
        TextStats.isChanged({
            "fontSize": $('foo').val('10'),
            "maxWidth": $('bar').val('-1'),
        })().should.equal(-1);
    });

    it('textWidth should return zero when value is not present', function(){
        TextStats.textWidth('', '').should.equal(0);
    });

    it('textWidth should return non-zero when value is present', function(){
        TextStats.textWidth('hello world', '12px sans').should.not.equal(0);
    });

});

