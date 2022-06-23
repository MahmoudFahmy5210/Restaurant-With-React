export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};
/*
export const Dishes = ( state = InitialFeedback , action) =>
    {
    switch(action.type){
        case ActionTypes.SUBMIT_FORM:
            return {...state , isLoading : false , errMess : null , dishes: action.payload }
        case ActionTypes.DISHES_LOADING:
            return {...state , isLoading : true , errMess : null , dishes:[] }
        case ActionTypes.DISHES_FAILED:
            return {...state , isLoading : false , errMess : action.payload , dishes:[] }
        default:
            return state;
    }
}*/