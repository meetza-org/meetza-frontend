import React, { Component } from 'react';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom'

const LoginStyle = styled.div`
    padding: 25px 20px;
    width: 400px !important;
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

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isError: false,
            errorMsg: '',
        }
    }

    handleChange = ({target: {name, value}}) => this.setState({[name]: value});

    login = e => {
        e.preventDefault();
        this.setState({isError: false, errorMsg: ''});
        const {email, password} = this.state;
        this.props.login({email: email, password: password})
        .then(response => {
            if(!response.error){
                debugger;
                const { token } = response.payload;
                localStorage.setItem('token',token);
                localStorage.setItem('userData', JSON.stringify(response.payload));
                const {state} = this.props.location;
                if(state){
                    this.props.history.push(state.from.pathname);
                }
                else{
                    this.props.history.push("/");
                }
                
            }
            else{
                this.setState({
                    isError: true,
                    errorMsg: response.payload.response.message,
                });
            }
        })
    }

    render(){
        return(
            <LoginStyle className="container">
                <form method="post" onSubmit={this.login}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="text" name="email" onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password" onChange={this.handleChange} className="form-control" id="exampleInputPassword1" required /> 
                    </div>
                    {this.state.isError ? (
                        <ErrorStyle className="form-group">
                            <label>{this.state.errorMsg}</label>
                        </ErrorStyle>
                    ): null}
                    <div className="form-group">
                        <Link to="/register">Create Account?</Link>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>    
            </LoginStyle>
        )
    }
}

export default withRouter(Login);