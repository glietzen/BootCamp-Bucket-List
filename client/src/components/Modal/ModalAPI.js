import React from "react";
import { Modal, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import {logoutUser} from './../../actions/authActions';
import ApiForm from '../ApiForm/ApiForm';

class ModalAPI extends Component {
    render() {
        const {user} = this.props.auth;

        return (
            <Modal  
                header='Modal Header'
                trigger={<Button>Add Search</Button>}>
                <ApiForm />
                <p>{user.name}</p>
                <p>{user.id}</p>

            </Modal>
        )
    }
}

ModalAPI.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps, {logoutUser})(ModalAPI);