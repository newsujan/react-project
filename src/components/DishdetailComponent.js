import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Button,
  Modal, ModalHeader, ModalBody, Form, FormGroup, Input,
  Label, Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

  function RenderDish({dish}){
      if(dish!=null){
          return (
                  <Card>
                      <CardImg width="100%" src={dish.image} alt={dish.name} />
                      <CardBody>
                          <CardTitle>{ dish.name }</CardTitle>
                          <CardText>{ dish.description }</CardText>
                      </CardBody>
                  </Card>

          );
      }
      else {
        return(<div></div>)
      }
  }

  class CommentForm extends Component{
    constructor(props){
      super(props);
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
        isModalOpen: false
      };
    }

    toggleModal(){
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

    handleSubmit(values){
      this.toggleModal();
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
      return(
        <div>
          <Button outline onClick={this.toggleModal}><span className="fa fa-pencil" /> Submit Comment</Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal }>
            <ModalHeader toggle={this.state.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" id="rating" name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="yourname">Your Name</Label>
                  <Control.text model=".yourname" id="yourname" name="yourname"
                    className="form-control"
                    placeholder="Your Name"
                    validators= {{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".yourname"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                   />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="comment">Comment</Label>
                    <Control.textarea model=".comment" id="comment" name="comment"
                      placeholder="Your Comment" rows="6"
                      className="form-control"/>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Submit</Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }


  function RenderComments({comments, addComment, dishId}){
        if(comments!=null){

        const comment = comments.map((comment)=>{
           return(
              <div key={comment.id}>
                  <ul className="list-unstyled">
                      <li>{comment.comment}</li>
                      <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                  </ul>
              </div>
           );
        });
        return(
            <div className="col-12 mt-2 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
            {comment}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
      }else
      return(<div></div>);
    }

    const DishDetail = (props) => {
      if (props.isLoading) {
        return(
          <div className="container">
            <div className="row">
              <Loading />
            </div>
          </div>
        );
      }
      else if(props.errMess){
        return(
          <div className="container">
            <div className="row">
              <h4>{props.errMess}</h4>
            </div>
          </div>
        );
      }
      else if (props.dish !=null)
        return(
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to='/mebu'>Menu</Link></BreadcrumbItem>
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
                  dishId={props.dish.id} />

              </div>
            </div>
          </div>
        );
        else
          return(
            <div></div>
          );
    }


export { DishDetail, CommentForm };
