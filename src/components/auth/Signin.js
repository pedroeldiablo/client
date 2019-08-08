import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
    onSubmit = formProps => {
        console.log(formProps);
        this.props.signin(formProps, () => {
            this.props.history.push('/feature');
        });
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                    ></Field>
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="none"
                    ></Field>
                </fieldset>
                <div>
                    {this.props.errorMessage}
                </div>
                <button>Sign In!</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}


//compose allows us to apply in multiple higher order components 
//to a single component that will be applied in series 
//to whatever component we pass in at the last call
//avoids the need for multiple parantheses
export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signin);
