import React, {useState, createContext, useReducer, useRef} from "react"

//create context
export const GlobalContext = createContext()

//reducer function

function reducer(state,action){
    switch(action.type){

        case 'LOAD_FIRST_PAGE':
            return {...state, ...action.payload}
            
        case 'LOAD_SECOND_PAGE':
            return {...state, ...action.payload}

        default:
            return state
    }
}


//create context provider
export const GlobalProvider = ({children})=>{

//creating counter
const [counts, setCounts] = useState(1)
const [targetId, setTargetId] = useState()
let updateFlag = useRef(false)

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


//useReducer
const [state, dispatch] = useReducer(reducer, {})

//Actions
    function loadFirstPage(firstPageData){
        dispatch({type: 'LOAD_FIRST_PAGE', payload: firstPageData})
    }

    function loadSecondPage(secondPageData){
        dispatch({type: 'LOAD_SECOND_PAGE', payload: secondPageData})
    }


    return(<GlobalContext.Provider value={{updateFlag ,state,targetId,setTargetId, counts, setCounts, loadFirstPage, secondPageData, setSecondPageData,  loadSecondPage, firstPageData, setFirstPageData }} >
            {children}
        </GlobalContext.Provider>)




}