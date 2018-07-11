import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';
import Button from 'react-materialize/lib/Button';

export default class FormCustom extends Component {
  render() {
    return (
        <div>
            <Row>
                <Input s={6} label="Title" />
                <Input s={6} label="Location" />
                <Input type="textarea" s={12} label='Description' />
                
                <Button waves='light'>Submit</Button>
                
            </Row>
        </div>
    )
  }
}
