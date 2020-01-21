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
            //TODO style these guys with CSS
            <nav /*className="NavBar-container"*/>
            <div /*className="NavBar-title u-inlineBlock"*/>Melting Plot</div>
            <div /*className="NavBar-linkContainer u-inlineBlock"*/>
            <Link to="/" /*className="NavBar-link"*/>
                Skeleton
            </Link>
            <Link to="/browse" /*className="NavBar-link"*/>
                Browse
            </Link>
            {this.props.userId && (
                <Link to={`/profile/${this.props.userId}`}>
                Profile
                </Link>
            )}
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
            </nav>
        );
    }

}

export default Nav;