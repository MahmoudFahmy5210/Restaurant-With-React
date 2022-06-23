import * as ActionTypes from  "./ActionTypes";


export const Comments =( state ={
        errMess:null,
        comments:[]
    } , action)=>{
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {...state , isLoading : false , errMess : null , comments: action.payload }
        case ActionTypes.COMMENTS_FAILED:
            return {...state , isLoading : false , errMess : action.payload , comments:[] }
        // in case adding comment
        case ActionTypes.ADD_COMMENT :
            //pass the content of the action to variable called comment
            var comment = action.payload;
        //comment.id=state.comments.length; we remoce this because the server we give the new id for the comment
        //comment.date=new Date().toISOString();we also remove this because we do it in the action creator
            //concate is immutable so it will not change state but it will create a new object contain 
            // a copy of the prev state and the new one concatenated together
            return {...state, comments:state.comments.concat(comment)};
        default:
            return state;
    }
}