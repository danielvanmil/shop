var ShopCategoryData = (function () {
    function ShopCategoryData() {
    }
    ShopCategoryData.prototype.beforeRegister = function () {
        this.properties = {
            categoryName: String,
            itemName: String,
            categories: {
                type: Array,
                value: [],
                readOnly: false,
                notify: true
            },
            category: {
                type: Object,
                computed: '_computeCategory(categoryName)',
                notify: true
            },
            item: {
                type: Object,
                computed: '_computeItem(category.items, itemName)',
                notify: true
            },
            failure: {
                type: Boolean,
                notify: true,
                readOnly: true
            }
        };
    };
    ;
    ShopCategoryData.prototype._setFailure = function (state) {
        console.log("FIXME");
    };
    ;
    ShopCategoryData.prototype._getCategoryObject = function (categoryName) {
        for (var i = 0, c; c = this.categories[i]; ++i) {
            if (c.name === categoryName) {
                return c;
            }
        }
        return null;
    };
    ;
    ShopCategoryData.prototype._computeCategory = function (categoryName) {
        var categoryObj = this._getCategoryObject(categoryName);
        this._fetchItems(categoryObj, 1);
        return categoryObj;
    };
    ;
    ShopCategoryData.prototype._computeItem = function (items, itemName) {
        for (var i = 0, item; item = items[i]; ++i) {
            if (item.name === itemName) {
                return item;
            }
        }
    };
    ;
    ShopCategoryData.prototype._fetchItems = function (category, attempts) {
        this._setFailure(false);
        if (!category || category.items) {
            return;
        }
        console.log("_fetchItems", category);
    };
    ;
    ShopCategoryData.prototype.refresh = function () {
        if (this.categoryName) {
            this._fetchItems(this._getCategoryObject(this.categoryName), 3);
        }
    };
    return ShopCategoryData;
}());
;
Polymer(ShopCategoryData);
//# sourceMappingURL=shop-category-data.js.map