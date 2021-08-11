
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Collapse,  Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
                       isModalOpen: false
          };
          this.toggleModal = this.toggleModal.bind(this);

    }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
 
    }

    render() {
   
        return(
        <>
      
         <Button outline onClick={this.toggleModal}><span className="fa fa-pencil" ></span> Submit Comment</Button>
                      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                                
                    <div className="col-12 col-md-9">
                        
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
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
                                <Label htmlFor="nameof" md={4}>Your name</Label>
                                <Col md={8}>
                                    <Control.text model=".nameof" id="nameof" name="nameof"
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".nameof"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={8}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
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
}
export default CommentForm;