import React, { useReducer } from 'react';

/** 
 * @author Vudang
 * @function  ContextCreator 
 * @param reducer -> Reducer of context 
 * @param actions -> List actions of context
 * @param initialState -> Initialize state of context
 */

export default (reducer, actions, initialState) => {
    // Create instance of context
    const Context = React.createContext();

    /**
         * @argument state -> reducer from param
         * @argument dispatch -> bindActionsCreator
         */
    // Create Provider (Passdown to children (consumers))
    const Provider = ({ children }) => {
        // useReducer 
        const [state, dispatch] = useReducer(reducer, initialState);
        // actions === {addBlogPost: (dispatch)=> { return () => {} } }
        const boundActions = {};
        for (let key in actions) {
            // High order function calling
            boundActions[key] = actions[key](dispatch);
        }

        // Pass our data and list actions (dispatch order class to child)
        return (
            <Context.Provider value={{state, actions : {...boundActions} }}>
                {children}
            </Context.Provider>
        );
    }

    return { Context, Provider };
};