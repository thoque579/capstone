// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import Cookies from 'universal-cookie';

let defaultGuestUser = "newGuest"

let cookie = new Cookies();
cookie.get('guestUser');
if (typeof cookie.get('guestUser') === "undefined") {

} else {
  defaultGuestUser = cookie.get('guestUser');
}


class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      message: '',
      guestUser: defaultGuestUser,
      newUser: '',
      error: '',
      messages: []
    }
    this.fetchMessages = this.fetchMessages.bind(this);
  }


  componentDidMount() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(res => {
      this.setState({
        authenticated: res.authenticated
      })
    })


  this.fetchMessages();


  const cookies = new Cookies();


  console.log(cookies.get('guestUser')); // Pacman


  }


  loginGuest = (e) => {

    const { newUser } = this.state;

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
          username: newUser,
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

      this.setState({
        messages: res.message,
        username: this.state.guestUser
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
          username: this.state.guestUser
        }
      })
    }))
    .then(handleErrors)
    .then(res => {
      this.setState({
        message: '',
      })
      this.fetchMessages();
      const cookies = new Cookies();
      cookies.set('guestUser', this.state.guestUser, { path: '/' });
      console.log(cookies.get('guestUser'));
      console.log('here');
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
          username: this.state.newUser
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
      guestUser: e.target.value,
    })
  }

  render() {
    const { authenticated, message, guestUser, messages, newUser } = this.state;


    {/*if (!authenticated) {
      return (
        <Layout>

        </Layout>
      )
    }*/}

    return(
      <Layout>
        <div className = "container">
          <div className = "row">
            <div className = "col-12">
              <form onSubmit = {this.createGuest}>
                <label>Guest User</label>
                <input type="text" value = {guestUser} onChange = {this.handleChange} className = "mr-2" required/>
              </form>
            </div>
          </div>
        </div>
        <div className = "container">
          <div className = "row d-flex">
            <div className = "col-12">
              <div>
                {messages.length === 0? <div>you have no messages</div> : messages.map((item, i) => {
                  return <li key = {item.id}>{item.username}: {item.message} </li>
                })
                }
              </div>
            </div>
            <form onSubmit = {this.submitMessage}>
              <input type="text" name="message" value= {message} onChange = {this.onChange} id = "message-input" />
              <button type="submit" className = "btn btn-primary btn-sm" onClick = {this.submitMessage}>send message</button>
              {/*<div hidden>{setTimeout(this.fetchMessages, 3000)}</div>*/}
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
