class ShopCategoryData {

    properties: any;

    categories: Array<any>;

    categoryName: string;

    categoryList: Array<any>;

    is: 'shop-category-data';

    beforeRegister() {
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
    
    _setFailure(state: boolean) {
        console.log("FIXME");
    };

    _getCategoryObject(categoryName) {
        for (var i = 0, c; c = this.categories[i]; ++i) {
            if (c.name === categoryName) {
                return c;
            }
        }
        return null;
    };

    _computeCategory(categoryName) {
        // Fetch the items of the category. Note that the fetch is asynchronous,
        // which means `category.items` may not be set initially (but that path
        // will be notified when the fetch completes).
        var categoryObj = this._getCategoryObject(categoryName);
        this._fetchItems(categoryObj, 1);
        return categoryObj;
    };

    _computeItem(items, itemName) {
        for (var i = 0, item; item = items[i]; ++i) {
            if (item.name === itemName) {
                return item;
            }
        }
    };

    _fetchItems(category, attempts) {
        this._setFailure(false);
        // Only fetch the items of a category if it has not been previously set.
        if (!category || category.items) {
            return;
        }
        
        console.log("_fetchItems", category);
        
        /*
        this._getResource({
            url: '/data/' + category.name + '.json',
            onLoad(e) {
                this.set('category.items', JSON.parse(e.target.responseText));
            },
            onError(e) {
                this._setFailure(true);
            }
        }, attempts);
        */
    };

/*
    _getResource(rq, attempts) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', rq.onLoad.bind(this));
        xhr.addEventListener('error', function(e) {
            // Flaky connections might fail fetching resources
            if (attempts > 1) {
                this.debounce('_getResource', this._getResource.bind(this, rq, attempts - 1), 200);
            } else {
                rq.onError.call(this, e);
            }
        }.bind(this));

        xhr.open('GET', rq.url);
        xhr.send();
    };
    */

    refresh() {
        if (this.categoryName) {
            // Try at most 3 times to get the items.
            this._fetchItems(this._getCategoryObject(this.categoryName), 3);
        }
    }
};

Polymer(ShopCategoryData);
