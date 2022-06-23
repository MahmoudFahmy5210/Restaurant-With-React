import * as ActionTypes from  "./ActionTypes";

// this is the reducer function of the dishes 
//the reducer is a function that take two arguments which is the state and the action 
export const Dishes = ( state = {
    isLoading:true,
    errMess:null,
    dishes:[]
    } , action) =>
    {
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state , isLoading : false , errMess : null , dishes: action.payload }
        case ActionTypes.DISHES_LOADING:
            return {...state , isLoading : true , errMess : null , dishes:[] }
        case ActionTypes.DISHES_FAILED:
            return {...state , isLoading : false , errMess : action.payload , dishes:[] }
        default:
            return state;
    }
}