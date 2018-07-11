import React, { Component } from 'react';
import { Row, Input, Button} from 'react-materialize';

export default class ApiForm extends Component {
  render() {
    return (
      <div>
        <Row>
            <Input s={6} label="Place" />
            <Input s={6} label="Key Word" />
            <Button waves='light'>Submit</Button>
        </Row>
      </div>
    )
  }
}
