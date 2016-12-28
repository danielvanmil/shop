// FIXME: move to global
declare var fixture;

suite('shop-odata', function() {

  test('instantiating the element works', function() {
    var element = fixture('basic');
    chai.assert.equal(element.is, 'shop-odata');
  });

});
