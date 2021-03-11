import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const RegisterStyle = styled.div`
    padding: 25px 20px;
    margin-top: 30px;
`;

const ErrorStyle = styled.div`
    border-radius: 3px;
    border: 1px solid #ff9393;
    background-color: #ffdcdc;
    text-align: center;
    padding: 2px;

    label {
        margin: auto;
        font-size: 15px;
        color: #f13e3e;
    }
`;

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            password: '',
            email: '',
            firstName: '',
            isError: false,
            errorMsg: '',
        }
    }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value});

    register = e => {
        e.preventDefault();
        this.setState({isError: false, errorMsg: ''});
        const {email, firstName, password} = this.state;
        this.props.register({email: email, firstName: firstName, password: password})
        .then(response => {
            if(!response.error){
                this.props.history.push('/login');
            }
            else{
                this.setState({
                    isError: true,
                    errorMsg: response.payload.response.message,
                });
            }
        });
    }

    render(){
        return(
            <RegisterStyle className="container">
                <form method="post" onSubmit={this.register}>
                    <div className="row form-group">
                        <div className="col-12 col-sm-9">
                            <label>Email address</label>
                        </div>
                        <div className="col-12 col-sm-4">
                            <input type="email" name="email" onChange={this.handleChange} className="form-control" required />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-12 col-sm-9">
                            <label>Name</label>
                        </div>
                        <div className="col-12 col-sm-4">
                            <input type="text" name="firstName" onChange={this.handleChange} className="form-control" required />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-12 col-sm-9">
                            <label>Password</label>
                        </div>
                        <div className="col-12 col-sm-4">
                            <input type="password" name="password" onChange={this.handleChange} className="form-control" required /> 
                        </div>
                    </div>
                    {this.state.isError ? (
                        <ErrorStyle className="row form-group">
                            <label>{this.state.errorMsg}</label>
                        </ErrorStyle>
                    ): null}
                    <div className="form-group">
                        <Link to="/login">Already have an account?</Link>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </RegisterStyle>
        )
    }
}