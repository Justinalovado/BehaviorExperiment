import React from "react";
import './LoginForm.css'

function LoginForm({showLogin, setShowLogin}) {
    const handleClose = () => {
        setShowLogin(!showLogin)
    }
		const handleSubmit = () => {
			console.log("make user login");
		}
    return (
      <div className={`overlay-${showLogin?"show":"hide"}`}>
          <form className="form-container">
							<label for="email">Email:</label>
							<input type="text" name="email" id="email"/>
							<label for="psw">Password:</label>
							<input type="password" name="psw" id="psw"/>
							<input type="submit" className='login-submit-btn' name="Login" value="Login" onClick={handleSubmit}/>
              <input type="button" className='close-btn' name="Close" value="Cancel" onClick={handleClose}/>
          </form>
      </div>
    )
  
}

export default LoginForm;