import React from "react";
import {Modal, Button, Icon, Input, Row} from 'react-materialize';
import './Modal.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import {logoutUser} from './../../actions/authActions';
import FormCustom from '../CustomForm/FormCustom';
import Axios from "axios";

class ModalForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            listId: '',
            location: ''
        }
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit (e) {
        e.preventDefault();
        const itemData = {
            title: this.state.title,
            description: this.state.description,
            listId: this.props.auth.user.list
        }
        Axios.post('api/items', itemData)
            .then(res => console.log(res))
            .then(() => this.props.getUserList(this.props.auth.user.list))
            .then(this.setState({
                title: '',
                description: '',
                location: ''
            }))
            .catch(err => console.log(err));
    }


    render() {       


        const {user} = this.props.auth;

        

        return (
            <Modal
                header='Modal Header'
                trigger={<Button><Icon className='addIcon' medium>add</Icon></Button>}>
                <Row>    
                    <form onSubmit={this.onSubmit}>
                        <Input s={6} label='Title' type="text" name="title" onChange={this.onChange} value={this.state.title}/>
                        <Input s={6} label='Location' type="text" onChange={this.onChange} name="location" value={this.state.location}/>
                        <Input s={12} label='Description' type="textarea" onChange={this.onChange} name="description" value={this.state.description}/>
                        <Input type="hidden" name="listId" value={user.list} />
                        <Button type="submit">Submit</Button>
                    </form>
                </Row>
 

            </Modal>
        )
    }

}


ModalForm.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps, {logoutUser})(ModalForm);