import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from './../../../actions/authActions';
import Nav from "../../NavBar/NavBar";
import './Register.css';


class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);

    }

    render() {
        const {errors} = this.state;

        return (
            <div>
                <Nav />
                <h2>Welcome to Bucket List. Create your account!</h2>
                <div className="registerContainer">
                <form onSubmit={this.onSubmit}>
                    {errors.name ? errors.name : null}
                    <input type="text" className="form-control text-style validate" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
                    {errors.email ? errors.email : null}
                    <input type="text" className="form-control text-style validate" placeholder="Email" name="email" value={this.state.email}  onChange={this.onChange} />
                    {errors.password ? errors.password : null}
                    <input type="text" className="form-control text-style validate" placeholder="Password" name="password" value={this.state.password}  onChange={this.onChange} />
                    {errors.password2 ? errors.password2 : null}
                    <input type="password" className="form-control text-style validate" placeholder="Confirm Password" name="password2" value={this.state.password2}  onChange={this.onChange} />
                    <input type="submit" className="btn" />
                </form>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));