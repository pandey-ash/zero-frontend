import React, { Component } from "react";
import { connect } from 'react-redux';
import { firstNameChanged, lastNameChanged, zipcodeChanged, gettingZipcodeDetails } from '../actions';
import InputText from '../components/InputText'
import Button from "../components/Button";
import './login.css'
import Spinner from "../components/Spinner";

class LoginScreen extends Component {

    firstNameChanged = (event) => {
        console.log(event);
        this.props.firstNameChanged(event.target.value);
    }

    lastNameChanged = (event) => {
        this.props.lastNameChanged(event.target.value);
    }

    zipcodeChanged = (event) => {
        this.props.zipcodeChanged(event.target.value);
    }

    buttonClick = (event) => {
        console.log('Clickeeeeeeeeeeeeeeeeeeed')
        const { firstName, lastName, zipcode } = this.props;
        this.props.gettingZipcodeDetails(firstName, lastName, zipcode);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('You clicked submit.');
      }

    renderButton = () => {
        if(this.props.isLoading)
            return <Spinner />
        return (
            <Button className={"w-100 btn btn-lg btn-primary"} onClick={this.buttonClick}>
                Get detail
            </Button>
        )
    }

    renderResponse = () => {
        if(this.props.processedString) {
            return (
                <div className={"alert alert-success"} role="alert">
                    {this.props.processedString}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="text-center main-body">
                <main className="form-signin">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 fw-normal">Please provide your detail</h1>
                        <div className="form-floating">
                            <InputText 
                                type={"text"} 
                                className={"form-control"} 
                                placeholder={"First Name"} 
                                value={this.props.firstName}
                                onChange={this.firstNameChanged}
                            />
                            <label htmlFor="floatingInput">First Name</label>
                        </div>
                        <br/>
                        <div className="form-floating">
                            <InputText 
                                type={"text"} 
                                className={"form-control"} 
                                placeholder={"Last Name"}
                                value={this.props.lastName}
                                onChange={this.lastNameChanged}
                            />
                            <label htmlFor="floatingPassword">Last Name</label>
                        </div>
                        <br/>
                        <div className="form-floating">
                            <InputText 
                                type={"number"} 
                                className={"form-control"} 
                                placeholder={"Zipcode"}
                                value={this.props.zipcode}
                                onChange={this.zipcodeChanged}
                            />
                            <label htmlFor="floatingPassword">Zipcode</label>
                        </div>
                        <div className="checkbox mb-3">
                            <label className={"text-danger"}>
                                {this.props.error}
                            </label>
                        </div>
                        { this.renderButton() }
                    </form>
                    <br/>
                    {this.renderResponse()}
                </main>
            </div>
        );
    }
}

const mapStateToProps = ({ zipcodeReducer }) => {
    const { firstName, lastName, zipcode, error, processedString, isLoading } = zipcodeReducer;
    return { firstName, lastName, zipcode, error, processedString, isLoading };
}

export default connect(mapStateToProps, { firstNameChanged, lastNameChanged, zipcodeChanged, gettingZipcodeDetails })(LoginScreen);
