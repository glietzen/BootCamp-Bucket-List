import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from './../../../actions/authActions';
import Nav from "../../NavBar/NavBar";
import './Login.css';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/home')
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <Nav />
                
                <h2>Login to your account!</h2>
                <div className="loginContainer">
                <form onSubmit={this.onSubmit}>
                    {errors.email ? errors.email : null}
                    <input type="text" className="form-control text-style" placeholder="Email" name="email" value={this.state.email}  onChange={this.onChange} />
                    {errors.password ? errors.password : null}
                    <input type="text" className="form-control text-style" placeholder="Password" name="password" value={this.state.password}  onChange={this.onChange} />
                    <input type="submit" className="btn" />
                </form>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);