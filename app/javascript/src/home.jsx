// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import Cookies from 'universal-cookie';
import './home.scss'

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
    this.boxRef = React.createRef()
    this.state = {
      message: '',
      guestUser: defaultGuestUser,
      newUser: '',
      error: '',
      messages: [],
      groupChatName: ''
    }
    this.fetchMessages = this.fetchMessages.bind(this);
  }


  componentDidMount() {
    this.fetchGroup();
    this.fetchMessages();

    // let test = setInterval(() => {
    //   this.fetchMessages();
    //
    // }, 3000)
    const cookies = new Cookies();



  }


scrollToBottom = () => {
  this.boxRef.current.scrollTop = this.boxRef.current.scrollHeight - this.boxRef.current.clientHeight;
}

componentDidUpdate = () => {
     this.scrollToBottom()
 }

  loginGuest = (e) => {

    const { newUser } = this.state;

    if (e) {
      e.preventDefault();
      this.setState({
        error: '',
      })
    }
  }

  fetchMessages = () => {
    fetch("/api/messages")
    .then(handleErrors)
    .then(res => {
      console.log('here');
      this.setState({
        messages: res.message,
        username: this.state.guestUser
      })
    })
  }

  fetchGroup = () => {
    fetch('/api/group')
    .then(handleErrors)
    .then(res => {
      console.log(res);
      this.setState({
        groupChatName: res.group[0].groupName
      })
    })
  }

  updateGroup = (e) => {

    if (e) {
      e.preventDefault();
      this.setState({
        error: '',
      })
    }

    const { groupChatName } = this.state;

    fetch('/api/group/update', safeCredentials({
      method: "PUT",
      body: JSON.stringify({
        group: {
          id: '1',
          groupName: groupChatName,
        }
      })
    }))
    .then(handleErrors)
    .then(res => {
      console.log(res.group.groupName);
      console.log(res.group);
      this.fetchGroup()
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
          username: this.state.guestUser,
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
      let chatWindow = document.getElementById('container-ul');
      this.scrollButton(chatWindow);

    })

  }

  scrollButton = (id) => {
    id.scrollTop = id.scrollHeight - id.clientHeight;
  }
  createGuest = (e) => {
    if (e) {
      e.preventDefault();
      this.setState({
        error: '',
      })
    }

    fetch('/api/users/update', safeCredentials({
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
    const { authenticated, message, guestUser, messages, newUser, groupChatName } = this.state;

    return(


      <Layout>
        <div className = "container">
          <div className = "row">
            <div className = "col-12">
              <form onSubmit = {this.updateGroup}>
                <label className = "mr-2">Name of group chat</label>
                <input type="text" name="groupChatName" className = "mr-2" value={groupChatName} onChange = {this.onChange}/>
                <button type="submit" className = "btn btn-success">update</button>
              </form>
                <label className = "mr-2">Guest User</label>
                <input type="text" value = {guestUser} onChange = {this.handleChange} className = "mr-2" required/>
            </div>
          </div>
        </div>
        <div className = "container">
          <div className = "row d-flex">
            <div className = "col-12 mb-3 border border-dark">
              <div style = {{display: "flex", flexDirection: "column-reverse", overflow: "auto", height: "calc(100vh - 300px)", maxHeight: "800px"}} id = "container-ul">
                <ul id = "message-list" ref = {this.boxRef} style = {{display: "block", position: "relative"}}>
                  {messages.length === 0? <div>you have no messages</div> : messages.map((item, i) => {
                    return <li id = "message" key = {item.id}>{item.username}: {item.message} </li>
                  })
                  }
                </ul>
              </div>
            </div>
            <form onSubmit = {this.submitMessage}>
              <input type="text" name="message" value= {message} onChange = {this.onChange} id = "message-input" placeholder = "send a message" required/>
              <button type="submit" className = "btn btn-primary btn-sm mb-1 ml-2">send message</button>
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
