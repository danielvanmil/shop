// FIXME: move to global
declare var fixture;

suite('my-element', function() {

  test('instantiating the element works', function() {
    var element = fixture('basic');
    chai.assert.equal(element.is, 'my-element');
  });

});
