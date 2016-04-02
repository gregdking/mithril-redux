"use strict";

/*
 *  Model
 */
var Model = 0;

/*
 *  Update
 */
var Actions = {
    increment: { type: 'INCREMENT' },
    decrement: { type: 'DECREMENT' }
};

//  update :: Model -> Actions -> Model -> Action -> Model
var update = R.curry(function update(initialState, actions, state, action) {
    state = R.defaultTo(initialState, state);
    switch (action.type) {
        case actions.increment.type:
            return state + 1;
        case actions.decrement.type:
            return state - 1;
        default:
            return state;
    }
});

/*
 *  View
 */

var div = m.bind(m, 'div'),
    span = m.bind(m, 'span');

//  view :: (Model, Dispatchers) -> m.VirtualElement
//      Dispatchers = { increment: Dispatcher, decrement: Dispatcher }
//      Dispatcher = * -> (* -> Action)
function view(state, dispatch) {
    return div([
        button('-', dispatch.decrement),
        span(state),
        button('+', dispatch.increment)
    ]);
}

//  button :: (String, Dispatcher) -> m.VirtualElement
//      Dispatcher = * -> (* -> Action)
function button(text, dispatcher) {
    return m('button', { onclick: dispatcher() }, text);
}

/*
 *  App Startup
 */

var store = Redux.createStore(update(Model, Actions));

var dispatchers = {
    increment: Utility.createDispatcher(store, Actions.increment),
    decrement: Utility.createDispatcher(store, Actions.decrement)
};

Utility.startMithril(document.getElementById('root'), view, store, dispatchers);
