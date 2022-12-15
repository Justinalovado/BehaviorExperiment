import React from "react";
import './LoginForm.css'

function LoginForm({showLogin, setShowLogin}) {
    const handleClose = () => {
        setShowLogin(!showLogin)
    }
    return (
      <div className={`overlay-${showLogin?"show":"hide"}`}>
          <form className="form-container">
              <input type="button" name="Close"onClick={handleClose}/>
          </form>
      </div>
    )
  
}

export default LoginForm;