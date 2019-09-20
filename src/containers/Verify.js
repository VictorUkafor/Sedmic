import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyToken, verifyCode, clearMessage } from '../actions/authActions';
import { validateCode } from '../libs/validations';
import Code from '../components/Field/Code';
import Form from '../components/Field/Form';
import Button from '../components/Field/Button';


const initialState = {
  verificationCode: '',
  error: '',
  isLoading: false,
};

class Verify extends Component {
  state = initialState;

  componentDidMount = () => {
    const {
      clearMessage: message,
    } = this.props;

    message();
    document.title = 'Sedmic - Verify Verification Code';
  }


  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  processCode = () => {
    const { verificationCode } = this.state;
    const { clearMessage: clear } = this.props;

    clear();

    const validation = validateCode(verificationCode.trim());
    const { message, status } = validation;
    this.setState({ error: message });

    return { status };
  }


  handleSubmit = (event) => {
    event.preventDefault();

    const {
      verifyCode: codeGet, history,
      clearMessage: clear,
    } = this.props;

    clear();

    const { verificationCode: code } = this.state;
    const { status } = this.processCode();

    if (status) {
      this.setState({ isLoading: true });
      codeGet(`S-${code}`, () => history.push('/account-activation'))
        .then(() => this.setState({ isLoading: false }));
    }
  }


  render() {
    const { setCode, errorMessage } = this.props;
    const { verificationCode, error, isLoading } = this.state;

    return (
      <Form
        title={setCode && 'Step 3 - Verify Verification Code'}
        handleSubmit={this.handleSubmit}
        errorMessage={errorMessage}
      >

        { setCode && (
          <Code
            placeholder="Enter verification code"
            name="verificationCode"
            value={verificationCode}
            error={error}
            onKey={this.processCode}
            handleChange={this.handleChange}
          />
        ) }


        {setCode && (
          <Button
            value={isLoading ? 'Loading . . .' : 'Verify Code'}
            disabled={isLoading}
            styleName="normal-button-2"
          />
        )}

      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    setCode: state.auth.setCode,
    tokenSent: state.auth.tokenSent,
    successMessage: state.auth.successMessage,
    errorMessage: state.auth.errorMessage,
  };
}

export default connect(mapStateToProps,
  {
    verifyToken, verifyCode, clearMessage,
  })(Verify);
