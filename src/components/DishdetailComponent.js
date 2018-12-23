import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

  function RenderDish({dish}){
      if(dish!=null){
          return (
              <div className="col-12 col-md-5 m-1">
                  <Card>
                      <CardImg width="100%" src={dish.image} alt={dish.name} />
                      <CardBody>
                          <CardTitle>{ dish.name }</CardTitle>
                          <CardText>{ dish.description }</CardText>
                      </CardBody>
                  </Card>
              </div>
          );
      }
      else {
        return(<div></div>)
      }
    }


  function RenderComments({comments}){
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
            <div className="col-12 col-md-5 mt-2 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
            {comment}
            </ul>
            </div>
        );
      }else
      return(<div></div>);
    }

    const DishDetail = (props) => {
      console.log('DIshdetail Component render invoked');

         const dish = props.dish;
         if(dish==null){
            return(<div></div>)
        }

        return(
          <div className="container">
            <div className="row">
              <RenderDish dish={props.dish} />
              <RenderComments comments={props.dish.comments} />

            </div>
          </div>
        );
    }


export default DishDetail;
