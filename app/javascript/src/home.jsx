// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      message: '',
      username: '',
      error: '',
      messages: []
    }
    this.fetchMessages = this.fetchMessages.bind(this);

    this.submitMessage = this.submitMessage.bind(this);
  }


  componentDidMount() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(res => {
      console.log(res);
      this.setState({
        authenticated: res.authenticated
      })
    })


  this.fetchMessages();

    this.submitMessage();
  }

  loginGuest = (e) => {

    const { username } = this.state;

    if (e) {
      e.preventDefault();
      this.setState({
        error: '',
      })
    }

    fetch('/api/sessions', safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
        }
      })
    }))
    .then(handleErrors)
    .then(res => {
      if (res.success) {
        const redirect_url = "/"
        window.location.href = redirect_url
      } else {
        console.log('fail')
      }
    })
  }

  fetchMessages = () => {
    fetch("/api/messages")
    .then(handleErrors)
    .then(res => {
      console.log(res.message)
      this.setState({
        messages: res.message
      })
    })
  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submitMessage = (e) => {

    const { message } = this.state;

    if (e) {
      e.preventDefault();
      this.setState({
        error: '',
      })
    }

    fetch('/api/message/create', safeCredentials({
      method: "POST",
      body: JSON.stringify({
        message: {
          message: this.state.message,
        }
      })
    }))
    .then(handleErrors)
    .then(res => {
      this.setState({
        message: res.userMessage.message
      })
      this.fetchMessages();
      console.log(res.userMessage)
    })

  }

  createGuest = (e) => {
    if (e) {
      e.preventDefault();
      this.setState({
        error: '',
      })
    }

    fetch('/api/users/create', safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: {
          username: this.state.username
        }
      })
    }))
    .then(handleErrors)
    .then(res => {
      if (res.success) {
        this.loginGuest();
      }
    })

  }
  handleChange = (e) => {
    this.setState({
      username: e.target.value,
    })
  }


  render() {
    const { authenticated, message, username, messages } = this.state;


    console.log(messages);

    if (!authenticated) {
      return (
        <Layout>
          <div className = "container">
            <div className = "row">
              <div className = "col-12">
                <form onSubmit = {this.createGuest}>
                  <label>Guest User</label>
                  <input type="text"value= {this.state.username} onChange = {this.handleChange} className = "mr-2" required/>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      )
    }


    return(
      <Layout>
        <div className = "container">
          <div className = "row d-flex">
            <div className = "col-12">
              <div>
                {messages.map((item, i) => {
                  return <li key = {item.id}>{item.message}</li>
                })}
              </div>
            </div>
            <form onSubmit = {this.submitMessage}>
              <input type="text" name="message" value= {message} onChange = {this.onChange} />
              <button type="submit" className = "btn btn-primary btn-sm" onClick = {this.submitMessage}>send message</button>
              <button type="button" onClick = {setTimeout(this.fetchMessages, 3000)}>test</button>
            </form>
          </div>
        </div>
      </Layout>
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
