import React from 'react'
import contacts from './contact'
import { Card, Button } from "react-bootstrap";
import './index.css'

const cardContatcs = () => {
    const listCon = contacts.map((item) => {
        
        return (
        <React.Fragment>
        <Card className='card' style={{ width: '18rem' }, {float:'left'}}>
        <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
                {item.email}
            </Card.Text>
            <Card.Text>
                {item.mobile}
            </Card.Text>
            <Button variant="primary">Edit</Button>{' '}
            <Button variant="danger">Delete</Button>{' '}
        </Card.Body>
        </Card>
        </React.Fragment>
        )
    })
    return (
        <div>{listCon}</div>
    )
}

export default cardContatcs