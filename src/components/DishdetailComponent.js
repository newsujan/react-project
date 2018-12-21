import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  renderComments(comments){
        if(comments==null){
            return(<div></div>);
        }
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
        )
    }
    renderDish(dish){
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
            )
           } else {
               return(<div></div>)
           }

    }

    render(){
         const dish = this.props.dish;
         if(dish==null){
            return(<div></div>)
        }
        const dishItem = this.renderDish(dish);
        const commentItem = this.renderComments(dish.comments);
        return(
            <div className="row">
                {dishItem}
                {commentItem}

            </div>
        );
    }
}

export default DishDetail;
