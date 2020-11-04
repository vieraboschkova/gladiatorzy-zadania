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
    actions:{
        changeText:(state, action)=>{}
    }
})

// ACTION TYPE
const TEXT_CHANGED= 'TEXT_CHANGED';

//ACTION
const actions = {
    changeText:(state, action)=>({
        type: TEXT_CHANGED,
        payload: action
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

const Provider = ({children, onLoad, onChange}) => {
    const context = useContext(ctx)
    // tutaj łączymy context i actions i wrzucamy je do providera
    // prop onLoad powinien wywołać się na wczytaniu komponentu
    // prop onChange powinien wywołać się na zmianie stanu
    // return ...

    const [text, dispatchText] = useReducer(reducer, initialState)
    
    return (
        <context.Provider value={[text, dispatchText]}>
            {children}
        </context.Provider>
    )
}

const useContextState = ({stateNames=['text']})=>{
    // jeśli stateNames jest pusty to zwraca cały state
    // jeśli stateNames nie jest pusty to zwraca podane w arrayu klucze i wartości w formie nowego obiektu
    // return ...
    const context = useContext(ctx)

    if (stateNames === null) { return context.state }
    return { ...context.state, stateNames }
}

const useContextActions = ({actions=["changeText"]})=>{
    // jeśli actions jest pusty to zwraca wszystkie akcje
    // jeśli actions nie jest pusty to zwraca akcje wskazane po nazwie w arryu actions
    // return ...
}

const useContextActionsAndState = ({actions=["changeText"], stateNames=['text']})=>{
    // suma logiki powyżej
    // return ...

    useContextActions(); 
    useContextState();

}