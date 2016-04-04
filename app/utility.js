"use strict";

/*
 *  Utility
 */
var Utility = (function () {
    function startMithril(mountPoint, view, store) {
        var render = renderToMithril.bind(null, mountPoint, view, store);
        store.subscribe(render);
        render();
    }

    function renderToMithril(mountPoint, view, store) {
        m.render(mountPoint, view(store.getState(), createDispatch(store)));
    }

    var createDispatch = R.curry(function createDispatch(store, action) {
        return function dispatch() {
            store.dispatch(action);
        }
    });

    return {
        startMithril: startMithril
    };
}());