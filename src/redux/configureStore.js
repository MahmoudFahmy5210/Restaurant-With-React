import { createStore,combineReducers,applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import { InitialFeedback } from "./forms";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { Dishes } from "./dishes";
import thunk from "redux-thunk";
import logger from "redux-logger";

// when someone call configureStore it will configure the store and return it
export const ConfigureStore= () => {
    //pass the combineReducer parameters like these to set the state with the property well 
    //these will return single reducer with it's intial state
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions,
            ...createForms({
              feedback:InitialFeedback  
            })
        }),//create store take enhancer as a second argument , since applyMiddleWare return enhancer we use it
        applyMiddleware(thunk,logger)
    );
    return store;
}
/*Now ConfigureStore returns a store,the store contain :-
-function called createStore which responsible for creating store , it should given reducer function(s) that 
mapped to properties
    *dishes(property) : contains Dishes which is a file in redux folder , contains reducer function  
    *comments(property) : contains Comments which is afile in redux folder , contains reducer function
     ....
*/
