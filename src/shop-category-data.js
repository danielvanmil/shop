var ShopCategoryData = (function () {
    function ShopCategoryData() {
    }
    ShopCategoryData.prototype.beforeRegister = function () {
        this.categoryList = [
            {
                name: 'mens_outerwear',
                title: 'Men\'s Outerwear',
                image: '/images/mens_outerwear.jpg',
                placeholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAADAA4DASIAAhEBAxEB/8QAXAABAQEAAAAAAAAAAAAAAAAAAAIEAQEAAAAAAAAAAAAAAAAAAAACEAAAAwYHAQAAAAAAAAAAAAAAERMBAhIyYhQhkaEDIwUVNREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3dkr5e8tfpwuneJITOzIcmQpit037Bw4mnCVNOpAAQv/2Q=='
            },
            {
                name: 'ladies_outerwear',
                title: 'Ladies Outerwear',
                image: '/images/ladies_outerwear.jpg',
                placeholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAADAA4DASIAAhEBAxEB/8QAWQABAQAAAAAAAAAAAAAAAAAAAAEBAQEAAAAAAAAAAAAAAAAAAAIDEAABAwMFAQAAAAAAAAAAAAARAAEygRIDIlITMwUVEQEBAAAAAAAAAAAAAAAAAAAAQf/aAAwDAQACEQMRAD8Avqn5meQ0kwk1UyclmLtNj7L4PQoioFf/2Q=='
            },
            {
                name: 'mens_tshirts',
                title: 'Men\'s T-Shirts',
                image: '/images/mens_tshirts.jpg',
                placeholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAADAA4DASIAAhEBAxEB/8QAWwABAQEAAAAAAAAAAAAAAAAAAAMEAQEAAAAAAAAAAAAAAAAAAAAAEAABAwEJAAAAAAAAAAAAAAARAAESEyFhodEygjMUBREAAwAAAAAAAAAAAAAAAAAAAEFC/9oADAMBAAIRAxEAPwDb7kupZU1MTGnvOCgxpvzEXTyRElCmf//Z'
            },
            {
                name: 'ladies_tshirts',
                title: 'Ladies T-Shirts',
                image: '/images/ladies_tshirts.jpg',
                placeholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAADAA4DASIAAhEBAxEB/8QAXwABAQEAAAAAAAAAAAAAAAAAAAMFAQEBAAAAAAAAAAAAAAAAAAABAhAAAQIDCQAAAAAAAAAAAAAAEQABITETYZECEjJCAzMVEQACAwAAAAAAAAAAAAAAAAAAATFBgf/aAAwDAQACEQMRAD8AzeADAZiFc5J7BC9Scek3VrtooilSNaf/2Q=='
            }
        ];
        this.properties = {
            categoryName: String,
            itemName: String,
            categories: {
                type: Array,
                value: this.categoryList,
                readOnly: true,
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
        this.categories = this.categoryList;
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
        this._getResource({
            url: '/data/' + category.name + '.json',
            onLoad: function (e) {
                this.set('category.items', JSON.parse(e.target.responseText));
            },
            onError: function (e) {
                this._setFailure(true);
            }
        }, attempts);
    };
    ;
    ShopCategoryData.prototype._getResource = function (rq, attempts) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', rq.onLoad.bind(this));
        xhr.addEventListener('error', function (e) {
            if (attempts > 1) {
                this.debounce('_getResource', this._getResource.bind(this, rq, attempts - 1), 200);
            }
            else {
                rq.onError.call(this, e);
            }
        }.bind(this));
        xhr.open('GET', rq.url);
        xhr.send();
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