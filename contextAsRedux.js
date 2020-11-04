import React, { useContext, useReducer } from "react";
// Logika Reduxa w React składa się z 5 prostych elementów:
// - struktury danych - tzn store/state - komórka pamięci z aktualnym stanem wszystkich danych
// - reducera, który agreguje akcje i zmienia wg nich aktualny stan store
// - akcji z dodatkowymi danymi wykonywanych na reducerze do modyfikacji store
// - Providera - który określa zakres działania Reduxa
// - HOCa connect - High Order Component, który tworzy Consumera stanu z danego komponentu

// Za pomocą:
// - React ContextApi
// - useContext hook
// - useReducer hook
// - oraz odrobiny znajomości JS 

// na podstawie poniższego kodu
// odtwórz Reduxa w React ContextApi

const initialState = {
    text:'treść'
}

//REACT CONTEXT - 'STORE'
const ctx = React.createContext({
    state: initialState,
    actions: actions,
})

// ACTION TYPE
const TEXT_CHANGED= 'TEXT_CHANGED';

//ACTION CREATED
const actions = {
    changeText:(text)=>({
        type: TEXT_CHANGED,
        payload: text,
    })
}

//REDUCER
function reducer(state = initialState, action){
    switch (action.type) {
        case TEXT_CHANGED:
            return {
                ...state,
                text: action.payload
            }
        default:
            return state;
    }
}

// PROVIDER
const Provider = ({children, onLoad, onChange}) => {
    const context = useContext(ctx);
    // tutaj łączymy context i actions i wrzucamy je do providera
    // prop onLoad powinien wywołać się na wczytaniu komponentu
    // prop onChange powinien wywołać się na zmianie stanu
    // return ...

    const contextValue = useReducer(reducer, initialState);
    
    return (
        <context.Provider value={contextValue} onLoad={onLoad} onChange={onChange}>
            {children}
        </context.Provider>
    )
}

// HOOKS
const useContextState = ({stateNames=['text']}) => {
    // jeśli stateNames jest pusty to zwraca cały state
    // jeśli stateNames nie jest pusty to zwraca podane w arrayu klucze i wartości w formie nowego obiektu
    // return ...
    const hasNoArguments = stateNames.length === 0;
    
    if (hasNoArguments || !stateNames) { return context.state }

    const context = useContext(ctx);
    const allStates = {...context.state};
    const filteredStates = {};
    const contextStateKeys = Object.keys(allStates);
    const isInQueriedStates = (key) => stateNames.includes(key);
    
    contextStateKeys.forEach((key) => { // or for ... in loop
            if (isInQueriedStates) {
                filteredStates[key] = allStates[key];
            }
        })

    return filteredStates;
}

const useContextActions = ({actions=["changeText"]})=>{
    // jeśli actions jest pusty to zwraca wszystkie akcje
    // jeśli actions nie jest pusty to zwraca akcje wskazane po nazwie w arryu actions
    // return ...
    const hasNoArguments = actions.length === 0;

    if (hasNoArguments || !actions) { return context.actions }

    const context = useContext(ctx);
    const allActions = {...context.actions};
    const filteredActions = {};
    const contextActionsKeys = Object.keys(allActions);
    const isInQueriedActions = (key) => actions.includes(key); //actions.indexOf(key) !== -1
    
    contextActionsKeys.forEach((key) => { // or for ... in loop
            if (isInQueriedActions) {
                filteredActions[key] = allActions[key];
            }
        })
    
    return filteredActions;
}

const useContextActionsAndStore = ({actions=["changeText"], stateNames=['text']})=>{
    // suma logiki powyżej
    // return ...
    const queriedActions = useContextActions(actions); 
    const queriedStates = useContextState(stateNames);
    const queriedStatesAndActions = {...queriedActions, ...queriedStates}
    return queriedStatesAndActions;
}

// CONSUMER 

const ContextConsumer = ctx.Consumer;
