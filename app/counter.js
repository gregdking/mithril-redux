"use strict";

/*
 *  Model
 */
var Model = 0;

/*
 *  Actions
 */
var INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT';

function increment() {
    return { type: INCREMENT };
}

function decrement() {
    return { type: DECREMENT };
}

/*
 *  Reducer
 */

//  reducer :: (Model -> Action) -> Model
function reducer(state, action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
}

/*
 *  View
 */

var div = m.bind(m, 'div'),
    span = m.bind(m, 'span');

//  view :: (Model, (Action -> (* -> Action))) -> m.VirtualElement
function view(state, dispatch) {
    return div([
        button('-', dispatch(decrement())),
        span(state),
        button('+', dispatch(increment()))
    ]);
}

//  button :: (String, (* -> *)) -> m.VirtualElement
function button(text, onclick) {
    return m('button', { onclick: onclick }, text);
}

/*
 *  App Startup
 */

var store = Redux.createStore(reducer, Model);

Utility.startMithril(document.getElementById('root'), view, store);
