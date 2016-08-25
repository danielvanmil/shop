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
var ShopApp = (function (_super) {
    __extends(ShopApp, _super);
    function ShopApp() {
        _super.apply(this, arguments);
    }
    ShopApp.prototype.created = function () {
        window.performance && performance.mark && performance.mark('shop-app.created');
        this.removeAttribute('unresolved');
    };
    ;
    ShopApp.prototype.ready = function () {
        Polymer.RenderStatus.afterNextRender(this, function () {
            this.listen(window, 'online', '_notifyNetworkStatus');
            this.listen(window, 'offline', '_notifyNetworkStatus');
        });
    };
    ;
    ShopApp.prototype._routePageChanged = function (page) {
        this.page = page || 'home';
        Polymer.AppLayout.scroll({ top: 0, behavior: 'silent' });
        this.drawerOpened = false;
    };
    ;
    ShopApp.prototype._pageChanged = function (page, oldPage) {
        if (page != null) {
            if (page == 'home') {
                this._pageLoaded(Boolean(oldPage));
            }
            else {
                this.importHref(this.resolveUrl('shop-' + page + '.html'), function () {
                    this._pageLoaded(Boolean(oldPage));
                }, null, true);
            }
        }
    };
    ;
    ShopApp.prototype._pageLoaded = function (shouldResetLayout) {
        this._ensureLazyLoaded();
        if (shouldResetLayout) {
            this.async(function () {
                this.$.header.resetLayout();
            }, 1);
        }
    };
    ;
    ShopApp.prototype._ensureLazyLoaded = function () {
        if (!this.loadComplete) {
            Polymer.RenderStatus.afterNextRender(this, function () {
                this.importHref(this.resolveUrl('lazy-resources.html'), function () {
                    if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.register('/service-worker.js');
                    }
                    this._notifyNetworkStatus();
                    this.loadComplete = true;
                });
            });
        }
    };
    ;
    ShopApp.prototype._notifyNetworkStatus = function () {
        var oldOffline = this.offline;
        this.offline = !navigator.onLine;
        if (this.offline || (!this.offline && oldOffline === true)) {
            if (!this._networkSnackbar) {
                this._networkSnackbar = document.createElement('shop-snackbar');
                Polymer.dom(this.root).appendChild(this._networkSnackbar);
            }
            Polymer.dom(this._networkSnackbar).innerHTML = this.offline ?
                'You are offline' : 'You are online';
            this._networkSnackbar.open();
        }
    };
    ;
    ShopApp.prototype._toggleDrawer = function () {
        this.drawerOpened = !this.drawerOpened;
    };
    ;
    ShopApp.prototype._onChangeSection = function (event) {
        var detail = event.detail;
        this.categoryName = detail.category || '';
        if (detail.title) {
            document.title = detail.title + ' - SHOP';
            this._announce(detail.title + ', loaded');
        }
    };
    ;
    ShopApp.prototype._onAddCartItem = function (event) {
        if (!this._cartModal) {
            this._cartModal = document.createElement('shop-cart-modal');
            Polymer.dom(this.root).appendChild(this._cartModal);
        }
        this.$.cart.addItem(event.detail);
        this._cartModal.open();
        this._announce('Item added to the cart');
    };
    ;
    ShopApp.prototype._onSetCartItem = function (event) {
        var detail = event.detail;
        this.$.cart.setItem(detail);
        if (detail.quantity === 0) {
            this._announce('Item deleted');
        }
        else {
            this._announce('Quantity changed to ' + detail.quantity);
        }
    };
    ;
    ShopApp.prototype._onClearCart = function () {
        this.$.cart.clearCart();
        this._announce('Cart cleared');
    };
    ;
    ShopApp.prototype._onAnnounce = function (e) {
        this._announce(e.detail);
    };
    ;
    ShopApp.prototype._announce = function (message) {
        this._a11yLabel = '';
        this.debounce('_a11yAnnouncer', function () {
            this._a11yLabel = message;
        }, 100);
    };
    ;
    ShopApp.prototype._domChange = function (e) {
        if (window.performance && performance.mark && !this.__loggedDomChange) {
            var target = Polymer.dom(e).rootTarget;
            if (target.domHost.is.match(this.page)) {
                this.__loggedDomChange = true;
                performance.mark(target.domHost.is + '.domChange');
            }
        }
    };
    ;
    ShopApp.prototype._computeShouldShowTabs = function (page, smallScreen) {
        return (page === 'home' || page === 'list' || page === 'detail') && !smallScreen;
    };
    ;
    ShopApp.prototype._computeShouldRenderTabs = function (_shouldShowTabs, loadComplete) {
        return _shouldShowTabs && loadComplete;
    };
    ;
    ShopApp.prototype._computeShouldRenderDrawer = function (smallScreen, loadComplete) {
        return smallScreen && loadComplete;
    };
    ;
    ShopApp.prototype._computePluralizedQuantity = function (quantity) {
        return quantity + ' ' + (quantity === 1 ? 'item' : 'items');
    };
    ;
    __decorate([
        property({ type: String, reflectToAttribute: true, observer: '_pageChanged' })
    ], ShopApp.prototype, "page", void 0);
    __decorate([
        property({ type: Number, value: 0 })
    ], ShopApp.prototype, "numItems", void 0);
    __decorate([
        property({ computed: '_computeShouldShowTabs(page, smallScreen)' })
    ], ShopApp.prototype, "_shouldShowTabs", void 0);
    __decorate([
        property({ computed: '_computeShouldRenderTabs(_shouldShowTabs, loadComplete)' })
    ], ShopApp.prototype, "_shouldRenderTabs", void 0);
    __decorate([
        property({ computed: '_computeShouldRenderDrawer(smallScreen, loadComplete)' })
    ], ShopApp.prototype, "_shouldRenderDrawer", void 0);
    __decorate([
        observe("routeData.page")
    ], ShopApp.prototype, "_routePageChanged", null);
    __decorate([
        listen('change-section')
    ], ShopApp.prototype, "_onChangeSection", null);
    __decorate([
        listen('add-cart-item')
    ], ShopApp.prototype, "_onAddCartItem", null);
    __decorate([
        listen('set-cart-item')
    ], ShopApp.prototype, "_onSetCartItem", null);
    __decorate([
        listen('clear-cart')
    ], ShopApp.prototype, "_onClearCart", null);
    __decorate([
        listen('announce')
    ], ShopApp.prototype, "_onAnnounce", null);
    __decorate([
        listen('dom-change')
    ], ShopApp.prototype, "_domChange", null);
    ShopApp = __decorate([
        component("shop-app")
    ], ShopApp);
    return ShopApp;
}(polymer.Base));
;
ShopApp.register();
//# sourceMappingURL=shop-app.js.map