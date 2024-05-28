import React, {useState, createContext, useReducer, useRef} from "react"

//create context
export const GlobalContext = createContext()



//reducer function

function reducer(state,action){
    const empty = {
        fName: '',
        lName: '',
        email: '',
        occupation: '',
        city: '',
        bio: ''
    }
    switch(action.type){

        case 'LOAD_FIRST_PAGE':
            // console.log(action.payload)
            return {...state, ...action.payload}
            
        case 'LOAD_SECOND_PAGE':
            // console.log(action.payload)
            return {...state, ...action.payload}

        default:
            return state
    }
}



//create context provider
export const GlobalProvider = ({children})=>{

//creating counter
const [counts, setCounts] = useState(1)
const [update, setUpdate] = useState(1)



const [firstPageData, setFirstPageData] = useState({
    fName: '',
    lName: '',
    email: ''
})

const [secondPageData, setSecondPageData] = useState({
    occupation: '',
    city: '',
    bio: ''
})

// const buttonRef = useRef(null);


//useReducer
const [state, dispatch] = useReducer(reducer, {})

//Actions
    function loadFirstPage(firstPageData){
        dispatch({type: 'LOAD_FIRST_PAGE', payload: firstPageData})
    }

    function loadSecondPage(secondPageData){
        dispatch({type: 'LOAD_SECOND_PAGE', payload: secondPageData})
    }

    
        
        // console.log(state)

    return(<GlobalContext.Provider value={{state, update, setUpdate, counts, setCounts, loadFirstPage, secondPageData, setSecondPageData,  loadSecondPage, firstPageData, setFirstPageData }} >
            {children}
        </GlobalContext.Provider>)




}