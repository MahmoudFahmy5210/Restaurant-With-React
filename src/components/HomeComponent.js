import React from "react";
import { Card,CardBody,CardImg,CardText,CardTitle,CardSubtitle } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from 'react-animation-components';

/* this comp receive three props(we now that props is object) */
function RenderCard({item,isLoading,errMess}) {
    //isLoading may be true or false
    //if true return Loading component which we import
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if(errMess){
        return(
            <h4>{errMess}</h4>
        );
    }
    else
        return(
            <FadeTransform in transformProps={{
                exitTransform:'scale(0.5) translateY(-50%)'
            }}>
                <Card key={item.id}>
                    <CardImg src={baseUrl +item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> :null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}
//_________________________Home component
function Home(props) {
    /* Home component return a container contain three diffrent parts
    each of them in an equal size , each one contian the same component
    with the same props but diffrent values */
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promosLoading} errMess={props.promosErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leadersLoading} errMess={props.leadersErrMess} />
                </div>
            </div>
        </div>
    );
    
}

export default Home;