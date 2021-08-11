import {  Modal, ModalHeader, ModalBody, Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import React, { useState } from 'react';
import { Loading } from './LoadingComponent';

function RenderDish({dish}){
    if (dish != null) {
return( 
 
<div   className="col-12 col-md-5 m-1">
<Card>
<CardBody>
    <CardImg top src={dish.image} alt={dish.name} />
      <CardTitle>{dish.name}</CardTitle>
      <CardText>{dish.description}</CardText>
    </CardBody>
</Card>
</div>
)

    }else {
        return(
            <div>

                
            </div>
        )
    }

}
function CommentForm({dishId, addComment }){
    const [isModalOpen, toggleModal]=useState(false);
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
     
    const  handleSubmit= (values) =>{
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        addComment(dishId, values.rating, values.author, values.comment);
 
 
    }
    return(
        <>
      
         <Button outline onClick={()=>toggleModal(!isModalOpen)}><span className="fa fa-pencil" ></span> Submit Comment</Button>
                      <Modal isOpen={isModalOpen} toggle={()=>toggleModal(!isModalOpen)}>
                    <ModalHeader toggle={()=>toggleModal(!isModalOpen)}>Submit Comment</ModalHeader>
                    <ModalBody>
                                
                    <div className="col-12 col-md-9">
                        
                    <LocalForm  onSubmit={(values) =>handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={8}>
            <Control.select model=".rating" id="rating" name="rating"  className="form-control">
            <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
    </Control.select>
                               
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your name</Label>
                                <Col md={8}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{
    minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".nameof"
                                        show="touched"
                                        messages={{
                                       
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={8}>
                                    <Control.textarea rows="6" model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        
                                         />
                                    
                                </Col>
                            </Row>
                           
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                    </ModalBody>
                </Modal>
                </>
    
        )
}
function RenderComments({comments, addComment, dishId}){


    if(comments !=null ){
        const cs=comments.map((comment)=>{
return(
    <div>
    <ul className="list-unstyled">
      <li>{comment.rating}: {comment.comment} </li>  
      <li>-- {comment.author}<br/> {new Intl.DateTimeFormat('en-US',{ date:'2-digit', month:'short', year:'numeric'}).format(new Date(Date.parse( comment.date))) }</li>
    </ul>
    </div>
)
        })
        return( 
 
<div   className="col-12 col-md-5 m-1">
    <h4>Comments</h4>
{cs}
<CommentForm dishId={dishId} addComment={addComment} />
</div>
)

    }else {
        return(
            <div>
           <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    }

}
const  DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
     return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
               
                
            </div>
   
        </div>
       
        </div>
    );
     }
 }

 export default DishDetail;