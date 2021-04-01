import React from 'react';
import {Redirect} from 'react-router-dom';


const LoginForm = (props) => {
  return(
    <div className="wrapper">
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 form-container col-centered">
              <p className="login_msg">You must first log in to access the data</p>
              <form onSubmit={props.getUser}>
                <input style={{ margin: "20px auto", display:"block"}} type="text" name="username" placeholder="Username..."/>
                <input style={{ margin: "20px auto", display:"block"}} type="password" name="password" placeholder="Password..."/>
                <button style={{ margin: "20px auto", display:"block"}}>Log in</button>
              </form>
              {
                props.error && <p className="login_msg">{props.error}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
