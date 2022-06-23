import React ,{Component} from 'react';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Contact from './ContactComponent';
import DishDetails from './DishdetailComponent';
import About from './AboutUsComponent';
import { postComment , fetchDishes ,fetchComments,fetchPromos,fetchLeaders, fetchForm } from "../redux/ActionCreators";
import { Switch, Route,Redirect,withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { TransitionGroup,CSSTransition } from "react-transition-group";
// this is the decleration of the mapStateToProps
const mapStateToProps = state => {
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}
//this func map the dispatch to props so we set an object with property called addComment
//and pass for it a func take these parameter , and in the body it will dispatch addComment 
//which we import above
const mapDispatchToProps = dispatch =>({
  postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
  resetFeedbackForm: ()=> {dispatch(actions.reset("feedback"))},

  fetchDishes:  () => { dispatch( fetchDishes() ) },
  fetchPromos:  () => { dispatch( fetchPromos()   ) },
  fetchComments:()=>{ dispatch( fetchComments() ) },
  fetchLeaders: ()=> { dispatch( fetchLeaders()  ) },
  fetchForm:(firstname,lastname,telnum,email,message,contactType,agree)=>dispatch(fetchForm(firstname,lastname,telnum,email,message,contactType,agree))
});
//now Main component contains props called addComment
// & also contain props called fetchDishes...etc
class Main extends Component {

//component did mount called directly after component is mounted
//it will fetch the resorce from the server after mounted directly
  componentDidMount(){
    // when my component mounted the next line is executed 
    this.props.fetchDishes(); 
    /*this line result to call dispatch(fetchDishes())
    then fetchDishes will do it's job which is set isLoading to true and dispatch(addDishes())
    which will set payload to Dishes and then loaded it to redux store 
    */ 
   this.props.fetchPromos();
   this.props.fetchComments();
   this.props.fetchLeaders();
  }

  render()
  {
  //_____________________________________Preparing Home comp_______ 
  const HomePage =()=>
  {
    //console.log( "Dish features filter"+this.state.dishes.filter((dish) => dish.featured))
    /* in Home component , we send to it many props (dish,dishLoading,dishErrMess,..etc)
    for first one (dish):we send only the dishes which features property is true , but if there are more than one
    that featured is true , we will display the first element of the array
     */
    return(
      <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess} 
      />
    );
  }
//___________________________________________Prepare dishdetails comp_________________________________
  const DishWithId =({match})=>{
    /*match is object comes from react-router-dom ,
    the library passes in a prop called match into every route that is rendered. Match carrry property 
    called params that carry all matching paramters.
    so in the first props we filter the dishes and take a spacific dish then ,
    compare between it's id and and id which in the route,and the same for the comments */
    return(
      <DishDetails
        dish={this.props.dishes.dishes.filter( (dish) => dish.id === parseInt(match.params.dishId,10) )[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
    );
    /* note that we rander dishDetails in menu */
  }

  
  return(
    <div>
      
      <Header />
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={() =><Contact resetFeedbackForm={this.props.resetFeedbackForm} formData={this.props.fetchForm} />} />
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders.leaders} />} />
            <Redirect to="/home" />
          </Switch>  
        </CSSTransition>  
      </TransitionGroup>
      <Footer />
    </div>
    );
  }
}
//now with this line we connected mainComponent to redux store and use withRouter to connect
//our component to react router 
//this will pass the state of the redux to the props of mainComponent
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
