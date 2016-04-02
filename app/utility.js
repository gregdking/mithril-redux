"use strict";

/*
 *  Utility
 */
var Utility = (function () {
    function dispatch(store, action, detail) {
        if (detail) {
            return store.dispatch(R.merge(detail, action));
        } else {
            return store.dispatch(action);
        }
    }

    function createDispatcher(store, action) {
        return function dispatcher(detail) {
            return dispatch.bind(null, store, action, detail);
        }
    }

    function startMithril(mountPoint, view, store, dispatchers) {
        var render = renderToMithril.bind(null, mountPoint, view, store, dispatchers);
        store.subscribe(render);
        render();
    }

    function renderToMithril(mountPoint, view, store, dispatchers) {
        m.render(mountPoint, view(store.getState(), dispatchers));
    }

    return {
        createDispatcher: createDispatcher,
        startMithril: startMithril
    };
}());