var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JaydataElement = (function (_super) {
    __extends(JaydataElement, _super);
    function JaydataElement() {
        _super.apply(this, arguments);
    }
    JaydataElement.prototype.ready = function () {
        console.log(this['is'], "ready!");
    };
    JaydataElement.prototype.created = function () { };
    JaydataElement.prototype.attached = function () {
        require([
            "../src/jaydata-element/jquery-3.1.0.min",
            "../src/jaydata-element/datajs-1.0.3.min",
            "../src/jaydata-element/jaydata-1.3.6/jaydata.js",
        ], function () {
            require(["http://jaydata.org/examples/scripts/vendor/Northwind.js"], function (x) {
                var northwind = new JayDataExamples.NorthwindDB.NorthwindEntities({ name: 'oData', oDataServiceHost: 'http://jaydata.org/examples/Northwind.svc' });
                northwind.onReady(function () {
                    northwind.Categories.forEach(function (category) {
                        console.log(category);
                    });
                });
            });
        });
    };
    ;
    JaydataElement.prototype.detached = function () { };
    JaydataElement = __decorate([
        component('jaydata-element')
    ], JaydataElement);
    return JaydataElement;
}(polymer.Base));
JaydataElement.register();
//# sourceMappingURL=jaydata-element.js.map