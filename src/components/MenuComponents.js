import React from 'react';
import {Card,CardImg,CardImgOverlay,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
     
function RenderMenuItem({dish}) 
{
    return(
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="50%" src={ baseUrl+ dish.image} alt={dish.name} />
                <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>       
                </CardImgOverlay>
            </Link>
        </Card>
    );    
} 
//___________________________________________Menu Component
const Menu =(props) =>
{
    //simple variable that carries each map in spacific size
    const menu=props.dishes.dishes.map( (dish) => 
    {
        return(
            <div  className="col-12 col-md-6 my-1" key={dish.id} >
                <RenderMenuItem dish={dish} />           
            </div>
        );
    })
    if(props.dishes.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.dishes.errMess){
        return( 
            <div className="container">
                <div className="row">
                   <h3> {props.dishes.errMess }</h3>
                </div>
            </div>
        );
    }
    else
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem active> Menu </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12 ">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
}
export default Menu;