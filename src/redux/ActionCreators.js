import * as ActionTypes from  "./ActionTypes";

import { baseUrl } from "../shared/baseUrl";

/*here these action return function and this will used always
the payload carried in the data which we need to give it to the reducer
send these for the store*/
//__________________________________________________ Send Comment_____________________________________________
export const addComment = (comment) =>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
});
/*this func recives the comment properties from the User,then it send it to the server by using fetch with 
Post method to put the comment in the comments array json , then receivce the response with the new data 
and dispatch it to the store , from the store we can view it on the user interface  */
export const postComment=(dishId , rating, author,comment) => (dispatch) => {
    const newComment={
    dishId:dishId,
    rating:rating,
    author:author,
    comment:comment   
    }
    // add property called date
    newComment.date=new Date().toISOString();
    return fetch(baseUrl + 'comments',{
        method:"POST",
        body:JSON.stringify(newComment),
        headers:{
            "Content-Type":"application/json"
        },
        credentials: "same-origin"
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error code'+response.status+' Error Text '+response.statusText)
            error.response=response;
            throw error;
        }
    }, error =>{
        var errormess=new Error(error.message);
        throw errormess;
    })
    .then(response=>response.json)
    .then(response=>dispatch(addComment(response)))
    .catch(error=>{console.log('post comment',error.message ); alert('Your comment could not be posted\nError: '+error.message);})  
}

//__________________________________________________ Dishes_____________________________________________
//func used to fetch dishes form the server
//return a function which is an action creator
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    //baseUrl+dishes , dishes here refer to the array which in the server db.json
    return fetch(baseUrl+'dishes')
        .then(response => 
            {
            if (response.ok)
                return response;
            else{//this error will done if there are error in the response of the server
                var error =new Error('Error Code: ' + response.status +'Error Text: '+response.statusText);
                error.response=response;
                throw error;
                }
            },
            //this error done if there is no any response from the server
            error=>{
                var errmess=new Error(error.message);
                throw errmess;
            }
            )
        //convert dishes to json format to make it avilable for me to do operation on it
        .then(response => response.json())
        //dispatch mean send to the store , so we will send addDishes to the store when fetchDishes called
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
};
export const dishesLoading =()=> ({
    type:ActionTypes.DISHES_LOADING
});
export const dishesFailed  =(errmess) =>({
    type:ActionTypes.DISHES_FAILED,
    payload:errmess
});
export const addDishes =(dishes) => ({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
});
//__________________________________________________ Comments_____________________________________________
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl+'comments')
        .then(response => 
            {
            if (response.ok)
                return response;
            else{//this error will done if there are error in the response of the server
                var error =new Error('Error Code: ' + response.status +'Error Text: '+response.statusText);
                error.response=response;
                throw error;
                }
            },
            //this error done if there is no any response from the server
            error =>{
                var errmess=new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
};
export const commentsFailed  =(errmess) =>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmess
});
export const addComments =(comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});
//__________________________________________________ Promotions_____________________________________________
export const fetchPromos = () => (dispatch) => {
    return fetch(baseUrl+'promotions')
        .then(response => 
            {
            if (response.ok)
                return response;
            else{//this error will done if there are error in the response of the server
                var error =new Error('Error Code: ' + response.status +'Error Text: '+response.statusText);
                error.response=response;
                throw error;
                }
            },
            //this error done if there is no any response from the server
            error=>{
                var errmess=new Error(error.message);
                throw errmess;
            }
            )
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
};
export const promosLoading =()=> ({
    type:ActionTypes.PROMOS_LOADING
});
export const promosFailed  =(errmess) =>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errmess
});
export const addPromos =(promos) => ({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
});
//__________________________________________________ Leaders_____________________________________________
export const fetchLeaders = () => (dispatch) => {
    return fetch(baseUrl+'leaders')
        .then(response => 
            {
            if (response.ok)
                return response;
            else{//this error will done if there are error in the response of the server
                var error =new Error('Error Code: ' + response.status +' Error Text: '+response.statusText);
                error.response=response;
                throw error;
                }
            },
            //this error done if there is no any response from the server
            error=>{
                var errmess=new Error(error.message);
                throw errmess;
            }
            )
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
};
export const leadersLoading =()=> ({
    type:ActionTypes.LEADERS_LOADING
});
export const leadersFailed  =(errmess) =>({
    type:ActionTypes.LEADERS_FAILED,
    payload:errmess
});
export const addLeaders =(leaders) => ({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
});
//__________________________________________________ FORM_____________________________________________
export const formSubmit=(data) =>({
    type:ActionTypes.SUBMIT_FORM,
    payload:data
})
export const fetchForm=(firstname,lastname,telnum,email,message,contactType,agree)=>(dispatch)=>{
    const formData={
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        message:message,
        contactType:contactType,
        agree:agree
    }
    formData.date=new Date().toISOString();
    return fetch(baseUrl+"feedback",{
        method:"POST" ,
        body:JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error code'+response.status+' Error Text '+response.statusText)
                error.response=response;
                throw error;
            }
        }, error =>{
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(response=> response.json)
        .then(response=>dispatch(formSubmit(response)))
        .then(alertResponse())
        .catch(error=>{console.log('Send Feedback',error.message ); alert('Your feedback could not be sent\nError: '+error.message);})  

}
const alertResponse=(data)=>{
    
    alert("this is all the data you have been submited" + JSON.stringify(data));
}