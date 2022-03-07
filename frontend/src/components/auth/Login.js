import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { login, register } from "../../Action/User";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false)

  const dispatch = useDispatch();

  

  const handleControlUser = (e) => {
    e.preventDefault()
    if(user){
      registerSignIn(e)
    } else {
      handleSignIn(e)
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(login(email, password));
    }
  };

  const registerSignIn = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(register(email, password));
    } else {
      alert("fill out all details");
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img
            src="https://nasilsilerim.com/wp-content/uploads/delete-quora-account.png"
            alt=""
          />
        </div>
       
        <div className="login__auth">
          <div className="login__authOptions">
            
            
            <div className="login__authDesc">
              <p>
                
              Quora (/ˈkwɔːrə/) is an American social question-and-answer website based in Mountain View, California. It was founded on June 25, 2009, and made available to the public on June 21, 2010. Users can collaborate by editing questions and commenting on answers that have been submitted by other users.
               <p><b> Made By Devanshi  </b> </p>
                .
              </p>
            </div>
          </div>
          <div className="login__emailPass">
            <h4>Authetication</h4>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button onClick={handleControlUser}>{user ? 'Register' : 'Login'}</button>
            </div>
            <p style ={{
              fontSize: "13px",
              color: "#777",
              cursor: "pointer"
            }} onClick = {() => setUser(!user)}>{!user ? 'New user | Register' : 'Already registered | Login'}</p>
            
          </div>
       
      </div>
      </div>
    </div>
  );
}

export default Login;
