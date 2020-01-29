import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Nav.css";

// DONE change this ID later
// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "1085650892312-g9vj8eqaif6iug3qu3863i47ebj2hg86.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. 
 * 
 * Props: from App.js
 * handleLogin: 
 * handleLogout: 
 * userId: user's ID
 */
class Nav extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <nav className="NavBar-container">
                <div className="NavBar-linkContainer">
                    <span className="NavBar-title">Melting Plot   </span>
                    <Link to="/" className="NavBar-link">
                        Home
                    </Link>
                    <Link to="/browse" className="NavBar-link">
                        Browse
                    </Link>
                    {this.props.userId && (
                        <Link to={`/profile/${this.props.userId}`} className="NavBar-link">
                        Profile
                        </Link>
                    )}
                    <div style={{marginLeft: 'auto',}}>
                        {this.props.userId ? (
                            <GoogleLogout
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            onLogoutSuccess={this.props.handleLogout}
                            onFailure={(err) => console.log(err)}
                            className="NavBar-link NavBar-login"
                            />
                        ) : (
                            <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={this.props.handleLogin}
                            onFailure={(err) => console.log(err)}
                            className="NavBar-link NavBar-login"
                            />
                        )}
                    </div>
                </div>
            </nav>
        );
    }

}

export default Nav;