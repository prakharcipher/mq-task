import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../actions';
import Dialog from 'material-ui/Dialog';
import Webcam from 'react-webcam';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      name: '',
      mail: '',
      phone: '',
      errName: '',
      errMail: '',
      errPhone: ''
    };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ image: imageSrc });
  };

  handleClose = () => {
    this.props.onSubmit(false);
  };

  handleSubmit = () => {
    if (this.state.name === '') {
      this.setState({ errName: 'Please provide a Name' });
      return null;
    } else this.setState({ errName: '' });
    if (this.state.mail === '') {
      this.setState({ errMail: 'Please provide an E-mail' });
      return null;
    } else this.setState({ errMail: '' });
    if (this.state.phone === '') {
      this.setState({ errPhone: 'Please provide a Phone No.' });
      return null;
    } else this.setState({ errPhone: '' });

    if (re.test(this.state.mail) === false) {
      this.setState({ errMail: 'Invalid E-mail address' });
      return null;
    } else this.setState({ errMail: '' });
    if (this.state.phone.length !== 10) {
      this.setState({ errPhone: 'Invalid Phone No.' });
      return null;
    } else this.setState({ errPhone: '' });

    this.props.addContact(
      this.state.image,
      this.state.name,
      this.state.mail,
      this.state.phone
    );
    this.props.onSubmit(false);
  };
  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />
    ];

    return (
      <Dialog
        title="Contact Details"
        actions={actions}
        modal={false}
        bodyStyle={{ backgroundColor: '#f0f8ff' }}
        titleStyle={{ textAlign: 'center' }}
        open={this.props.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
        <div
          style={{
            width: '260px',
            height: '550px',
            overflowY: 'none',
            margin: 'auto'
          }}
        >
          <TextField
            errorText={this.state.errName}
            floatingLabelText="Full-Name"
            onChange={event => this.setState({ name: event.target.value })}
          />
          <br />
          <TextField
            errorText={this.state.errMail}
            floatingLabelText="E-mail"
            onChange={event => this.setState({ mail: event.target.value })}
          />
          <br />
          <TextField
            errorText={this.state.errPhone}
            floatingLabelText="Contact No."
            onChange={event => this.setState({ phone: event.target.value })}
          />
          <br />
          <Webcam
            audio={false}
            height={260}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={260}
          />
          <RaisedButton
            label="Upload Picture"
            primary={true}
            onClick={this.capture}
          />
        </div>
      </Dialog>
    );
  }
}

export default connect(null, { addContact })(Form);
