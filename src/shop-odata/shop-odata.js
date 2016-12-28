var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopOData = (function (_super) {
    __extends(ShopOData, _super);
    function ShopOData() {
        var _this = _super.apply(this, arguments) || this;
        _this.is = 'shop-odata';
        return _this;
    }
    ShopOData.prototype.beforeRegister = function () {
        this.properties = {
            url: {
                type: String,
                value: ''
            },
            categories: {
                type: Array,
                value: [],
                notify: true
            }
        };
    };
    ShopOData.prototype.ready = function () {
        o(this.url + "Genres").take(5).skip(2).get(function (data) {
            this.categories = data.map(function (i) {
                console.log(i.Id);
                return { name: i.Id, title: i.Description };
            }.bind(this));
            console.log(this.categories);
        }.bind(this));
    };
    return ShopOData;
}(polymer.Base));
Polymer(ShopOData);
//# sourceMappingURL=shop-odata.js.map