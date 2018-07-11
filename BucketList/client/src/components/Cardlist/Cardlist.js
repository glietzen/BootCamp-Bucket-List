import React from "react";
import {Card, CardTitle, Col} from 'react-materialize';
import './Cardlist.css';
import img from './image.jpeg';



const Cardlist = props => (
    <div>
        {props.itemsArray ? props.itemsArray.map(result => (
            <Col s={6} m={6} l={4}>
                <Card className='card' key={result._id} header={<CardTitle reveal image={img} className='places' waves='light'/>}
                    
                    title={result.title}
                    reveal={<p>{result.description ? result.description : "No description"}</p>}>
                    <p><a href="">link to activity</a></p>
                </Card>
            </Col>
        )): 
        <Card className='card' header={<CardTitle reveal image={img} className='places' waves='light'/>}
                
            title="title"
            reveal={<p>description</p>}>
            <p><a href="">link to activity</a></p>
        </Card>
        }
    </div>
);

export default Cardlist