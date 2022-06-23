import React ,{Component}  from 'react';
import {Badge,Card,Label,Button,CardBody,CardImg,CardTitle,CardText,BreadcrumbItem,Breadcrumb,Modal,ModalBody,ModalHeader,Toast,ToastHeader} from 'reactstrap';
import {LocalForm,Control,Errors} from "react-redux-form"
import { Link } from "react-router-dom";
import { Loading }  from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform,Fade ,Stagger } from 'react-animation-components';

const maxLength= (len) => (val) => !(val) || (val.length <= len);
const minLength=(len)=>(val)=> (val) && (val.length >= len);

//___________________________________________Comment Form
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalShow: false
        }
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal() {
        //this func access to state and toggle the value of isModalShow
        this.setState({isModalShow: !this.state.isModalShow});
    }
    handleSubmit(values){
    this.toggleModal();
    /* call this function when the modal is submited , the function take these parameters
     and dispatch them to the redux store */
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
    return (
        <div>
            <Button
             onClick={this.toggleModal} size="lg" outline>
                <span className="fa fa-pencil mr-1"> Submit Comment</span>
            </Button>
            {/*  isOpen : boolean to control the state of the popover (pass boolean for it) 
                 toggle : callback for toggling isOpen in the controlling component(pass func to it)

            */}
            <Modal isOpen={this.state.isModalShow} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)} >
                        <div className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </div   >
                        <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" id="author" name="author" className="form-control" 
                             validators={{
                                minLength : minLength(2) , maxLength : maxLength(15)
                             }}/>
                             <Errors 
                            model=".author"
                            show="touched"
                            className="text-danger"
                            messages={{
                                minLength:"Must be greater then 2 letter",
                                maxLength:"Must not be less then 15 letter",
                            }}/>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment"
                             className="form-control" rows='6' />
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary">Submit</Button>
                        </div>                                       
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    );
}

}

    //_________________________________________Render the Dish_________________________    
    function RenderDish({dish}){
        return(
    <div className="col-12 col-md-6 my-1">
        <FadeTransform in transformProps={{
            exitTransform:'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg top src={baseUrl+dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    </div> 
            );
        
    }
    
    //_________________________________________Render the Comments_________________________
    function RenderComment({comments,postComment,dishId})
    {
        if (comments !=null){
        return(
            <>
            <div className="col-12 col-md-6 my-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                <Stagger in>
                {comments.map( comment =>( 
                    <Fade in>        
                    <li key={comment.id}>
                        <p><Badge color="secondary">{comment.comment}</Badge></p>
                        <p><Badge color="light">{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</Badge></p>
                    </li>
                   </Fade>
                ))} 
                </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />   
            </div>
            
            </>

            
            );
        }
    }
    //____________________________________Dishdetails Comp        
    const DishDetails =(props) => 
    {         
        //destructure object                
        //const {dish} =props ;
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            ); 
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        } 
        else if (props.dish !=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem>
                            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3 className="text-center">{props.dish.name}</h3>
                            <hr />  
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish}/>
                        <RenderComment comments= {props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                    </div>
                </div>
            );
        }
        else
            return(<div></div>);
    }




export default DishDetails;
