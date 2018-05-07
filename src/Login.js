import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
              <h3>Email Address:
              <input type="text" name="emailaddress" /></h3>
              <h3>Password:
              <input type="text" name="password" /></h3>
          </label>
          <div className ="button">
            <h3><input type="submit" value="Submit" /></h3>
          </div>
        </form>

      </div>
    );
  }
}

export default Login;
