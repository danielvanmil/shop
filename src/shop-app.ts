declare module polymer {
    interface Polymer {
        RenderStatus: any;
        AppLayout: any;
    }
}
 
interface Navigator {
    serviceWorker: any;
}

@component("shop-app")

//window.performance && performance.mark && performance.mark('shop-app - before register');

class ShopApp extends polymer.Base
{
    @property({ type: String, reflectToAttribute: true, observer: '_pageChanged' })
    page: string;

    @property({ type: Number, value: 0 })
    numItems: number;
    
    @property({ computed: '_computeShouldShowTabs(page, smallScreen)' })
    _shouldShowTabs: boolean;
    
    @property({computed: '_computeShouldRenderTabs(_shouldShowTabs, loadComplete)'})
    _shouldRenderTabs: boolean;
    
    @property({computed: '_computeShouldRenderDrawer(smallScreen, loadComplete)'})
    _shouldRenderDrawer: boolean;
    
    // FIXME
    __loggedDomChange: boolean;
    _a11yLabel: "";
    _cartModal: any;
    _networkSnackbar: any;
    categoryName: string;
    drawerOpened: boolean;
    loadComplete: any;
    offline: boolean;
    
    created() {
        window.performance && performance.mark && performance.mark('shop-app.created');
        this.removeAttribute('unresolved');
    };
    
    ready() {
        Polymer.RenderStatus.afterNextRender(this, function () {
            this.listen(window, 'online', '_notifyNetworkStatus');
            this.listen(window, 'offline', '_notifyNetworkStatus');
        });
    };
    
    @observe("routeData.page")
    _routePageChanged(page) {
        this.page = page || 'home';
        Polymer.AppLayout.scroll({ top: 0, behavior: 'silent' });
        this.drawerOpened = false;
    };
    
    _pageChanged(page, oldPage) {
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
    
    _pageLoaded(shouldResetLayout) {
        this._ensureLazyLoaded();
        if (shouldResetLayout) {
            this.async(function () {
                this.$.header.resetLayout();
            }, 1);
        }
    };
    
    _ensureLazyLoaded() {
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
    
    _notifyNetworkStatus() {
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
    
    _toggleDrawer() {
        this.drawerOpened = !this.drawerOpened;
    };
    
    @listen('change-section')
    _onChangeSection(event) {
        var detail = event.detail;
        this.categoryName = detail.category || '';
        if (detail.title) {
            document.title = detail.title + ' - SHOP';
            this._announce(detail.title + ', loaded');
        }
    };
    
    @listen('add-cart-item')
    _onAddCartItem(event) {
        if (!this._cartModal) {
            this._cartModal = document.createElement('shop-cart-modal');
            Polymer.dom(this.root).appendChild(this._cartModal);
        }
        this.$.cart.addItem(event.detail);
        this._cartModal.open();
        this._announce('Item added to the cart');
    };
    
    @listen('set-cart-item')
    _onSetCartItem(event) {
        var detail = event.detail;
        this.$.cart.setItem(detail);
        if (detail.quantity === 0) {
            this._announce('Item deleted');
        }
        else {
            this._announce('Quantity changed to ' + detail.quantity);
        }
    };
    
    @listen('clear-cart')
    _onClearCart() {
        this.$.cart.clearCart();
        this._announce('Cart cleared');
    };
    
    @listen('announce')
    _onAnnounce(e) {
        this._announce(e.detail);
    };
    
    _announce(message) {
        this._a11yLabel = '';
        this.debounce('_a11yAnnouncer', function () {
            this._a11yLabel = message;
        }, 100);
    };
    
    @listen('dom-change')
    _domChange(e) {
        if (window.performance && performance.mark && !this.__loggedDomChange) {
            var target: any = Polymer.dom(e).rootTarget;
            if (target.domHost.is.match(this.page)) {
                this.__loggedDomChange = true;
                performance.mark(target.domHost.is + '.domChange');
            }
        }
    };
    
    _computeShouldShowTabs(page, smallScreen) {
        return (page === 'home' || page === 'list' || page === 'detail') && !smallScreen;
    };
    
    _computeShouldRenderTabs(_shouldShowTabs, loadComplete) {
        return _shouldShowTabs && loadComplete;
    };
    
    _computeShouldRenderDrawer(smallScreen, loadComplete) {
        return smallScreen && loadComplete;
    };
    
    _computePluralizedQuantity(quantity) {
        return quantity + ' ' + (quantity === 1 ? 'item' : 'items');
    };
};

ShopApp.register();