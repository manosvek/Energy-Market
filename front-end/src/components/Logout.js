import React from "react";
import {Redirect} from 'react-router-dom';


class Logout extends React.Component{
  state = {
    logout: undefined,
    error: undefined
  }
  logUserOut = async (e) => {
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: {
          'X-OBSERVATORY-AUTH': this.props.token
      }
    }
    const api_call = await fetch(`https://localhost:8765/energy/api/Logout`, config);
    console.log(this.props.token);
    if (this.props.token){
      this.setState({
        logout: true
      });
    }
    else {
      const res =  api_call.json();
      console.log(res);
      this.setState({
        error: res
      });
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.logUserOut}>Log Out</button>
        {this.state.logout && <Redirect to="/" />}
        {this.state.error && <Redirect to="/" />}
      </div>
    );
  }
};

export default Logout;
