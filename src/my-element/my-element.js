var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyElement = (function (_super) {
    __extends(MyElement, _super);
    function MyElement() {
        var _this = _super.apply(this, arguments) || this;
        _this.is = 'my-element';
        return _this;
    }
    MyElement.prototype.beforeRegister = function () {
        this.properties = {
            prop1: {
                type: String,
                value: 'my-element'
            }
        };
    };
    return MyElement;
}(polymer.Base));
Polymer(MyElement);
//# sourceMappingURL=my-element.js.map