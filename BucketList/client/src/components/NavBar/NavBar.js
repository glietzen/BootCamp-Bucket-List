import React from "react";
import {Component} from 'react';
import Modalform from "../Modal/Modal"
import {Navbar, NavItem} from 'react-materialize';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from './../../actions/authActions';
import img from './bucket3.png';
import './NavBar.css';
import ModalAPI from "../Modal/ModalAPI";



class Nav extends Component {


    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();

    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <span className="nav-item">
                <NavItem href='get-started.html'>
                    <Modalform 
                        getUserList={this.props.getUserList}
                    />
                </NavItem>
                <NavItem href="#" onClick={this.onLogoutClick.bind(this)}>
                    Logout
                </NavItem>
                <NavItem className="nav-item userStyle">
                    {user.name}
                </NavItem>
            </span>
        );

        const guestLinks = (
            <span className="nav-item">
            <NavItem href="/register">
                Register
            </NavItem>
            <NavItem href="/login">
                Login
            </NavItem>
            </span>
        );

        return(
        <Navbar className="nav-bar teal lighten-2">
            <span className="title">BucketList<img className="logo" src={img} height="25px" width="25px" /></span>
            {isAuthenticated ? authLinks : guestLinks}
        </Navbar>
        )
    }
}

Nav.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Nav);