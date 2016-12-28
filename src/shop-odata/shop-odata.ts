interface o {
    get: (Function) => string;
}

declare var o: any;

class ShopOData extends polymer.Base {

    is: string = 'shop-odata';

    properties;

    url: string;

    categories: Array<any>;

    beforeRegister() {

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
    }

    ready() {
        o(this.url + "Genres").take(5).skip(2).get(function(data) {
            this.categories = data.map(function(i) {
              console.log(i.Id);
              return { name: i.Id, title: i.Description }
            }.bind(this));
            console.log(this.categories );
        }.bind(this));
    }
}

Polymer(ShopOData);
