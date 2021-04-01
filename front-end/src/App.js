import React from "react";
import { BrowserRouter, Route,
  Switch, Link,
  Redirect, withRouter } from 'react-router-dom';
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";

const fakeAuth = {
  isAuthenticated: false,
  token: undefined
}

class LogIn extends React.Component{

  state = {
    error: undefined,
    redirectToReferrer: undefined
  }

  getUser = async (e) => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    const myPost = {
      Username: user,
      Password: password
    };

    var formBody = [];
    for (var property in myPost) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(myPost[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody);

    const options = {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    if (user && password){
      const api_call = await fetch(`https://localhost:8765/energy/api/Login`, options);
      const res = await api_call.json();
      console.log(res);

      if(res.token){
        fakeAuth.token = res.token;
        fakeAuth.isAuthenticated = true;
        console.log(fakeAuth.token);
        console.log(fakeAuth.isAuthenticated);

        this.setState({
          error: undefined,
          redirectToReferrer: true
        });

      }

      else if (res.Message){
        this.setState({
          error: "Try Again",
          redirectToReferrer: false
        });
        fakeAuth.token = undefined;
        fakeAuth.isAuthenticated = false;
        console.log(this.state.error)
      }
    }
    else return;
  }

  render() {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      console.log("no so fast")
      return <Redirect to="/home" />
    }
    console.log(this.state.error)


    return (
      <div>
        <LoginForm getUser={this.getUser} error={this.state.error}/>
      </div>
    );
  }
};

class App extends React.Component{

  render() {
    return (
      <BrowserRouter>
        <div>
        <Route path="/" component={LogIn} exact/>
        <Route path="/home" render={(props) => <Home {...props} token={fakeAuth.token} />} exact/>
      </div>
      </BrowserRouter>
    );
  }
};

export default App;
