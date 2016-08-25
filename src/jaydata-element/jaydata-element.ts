@component( 'jaydata-element' )
class JaydataElement extends polymer.Base {
    
    // lifecycle methods
    ready() {
        console.log( this['is'], "ready!" )
    }

    created() { }

    attached() {

        require( [
            "../src/jaydata-element/jquery-3.1.0.min",
            "../src/jaydata-element/datajs-1.0.3.min",
            "../src/jaydata-element/jaydata-1.3.6/jaydata.js",
        ], function() {
            require( ["http://jaydata.org/examples/scripts/vendor/Northwind.js"], function( x ) {

                var northwind = new JayDataExamples.NorthwindDB.NorthwindEntities( { name: 'oData', oDataServiceHost: 'http://jaydata.org/examples/Northwind.svc' });
                northwind.onReady( function() {

                    northwind.Categories.forEach( function( category ) {
                        console.log( category );
                    });
                })
            });
        });
    };

    detached() { }

}

JaydataElement.register();
