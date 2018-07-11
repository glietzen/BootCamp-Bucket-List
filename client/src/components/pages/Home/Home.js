import React from "react";
import Nav from "../../NavBar/NavBar";
import Cardlist from "../../Cardlist/Cardlist";
import {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Row} from 'react-materialize';
import './Home.css';
import Axios from "axios";
import {logoutUser} from './../../../actions/authActions';
import API from '../../../utils/API';

class Home extends Component {
    
    state = {
        itemsArray: [],
        title: '',
        location: '',
        description: ''
    }
    

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/home')
            
            this.props.auth.user.list ? this.getUserList(this.props.auth.user.list) : null;

        }
    }
    getUserList = (userID) => {
        Axios.get(`/api/lists/${userID}`)
            .then((res) => {
               if(res.data.items.length > 0) {
                    this.setState({
                        itemsArray: res.data.items
                    });
               };
            })
            .catch(err => console.log(err));        
    };

    handleNewItemSubmit = event => {
        event.preventDefault();
        if (!this.state.title || !this.state.location || !this.state.description) {
            API.saveItem({
                title: this.state.title,
                location: this.state.location,
                description: this.state.description
            })
                .then(res => this.getUserList(this.props.auth.user.list))
                .catch(err => console.log(err));
        }
    };


    render() {
    

        const {isAuthenticated} = this.props.auth;

        const authContent = (
            <div className="container">
                <Cardlist 
                    itemsArray={this.state.itemsArray}
                /> 
            </div>
        )

        const guestContent = (
            <div className="notLoggedContainer">
                <p>You must be logged in to see your bucket list!</p>
            </div>
        )

        return (
            <div className="background-color">
                <Nav 
                    getUserList={this.getUserList} 
                     
                />
                    <Row>
                {isAuthenticated ? authContent : guestContent}
                    </Row>
            </div>
        )
    }
}

Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
    
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Home);