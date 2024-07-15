import React from "react";
import { Routes, Route, Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash"

import FakerPage from "./faker/FakerPage"
import Login from "./mlm/Login"

import { update_profile as updateProfile, logout } from "./redux/actions/auth";
import { checkRole, getHeaders, handlerErrorApollo, showToast, setCookie, getCookie, removeCookie} from "./util";
import * as Constants from "./constants"

const ProtectedAuthenticatedRoute = ({ user, redirectPath = '/' }) => {
  switch(checkRole(user)){
    case Constants.AUTHENTICATED:
      return <Outlet />;
    default:
      return <Navigate to={redirectPath} replace />;
  }
};

const ProtectedAdministratorRoute = ({ user, redirectPath = '/' }) => {
  switch(checkRole(user)){
    case Constants.AMDINISTRATOR:
      return <Outlet />;
    default:
      return <Navigate to={redirectPath} replace />;
  }
};

const Home = (props) => {
  const navigate = useNavigate();

  let { user, logout } = props

  if(!_.isEmpty(user)){
    return (
      <div>
        <h2>Home</h2>
        <div>
          <h4>Display name :{ user?.current?.displayName }</h4>
        </div>
        <div>
          <h4>Emai :{ user?.current?.email }</h4>
        </div>
        <div>
        <button onClick={()=>{ logout() }}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div><button onClick={()=>{
      navigate('/login')
    }}>Login first</button></div>
  );
    
};

const NoMatch = () => {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
};
  
const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">หน้าหลัก</Link>
          </li>
          {/* <li>
            <Link to="/auto">auto</Link>
          </li>
          <li>
            <Link to="/">Page 2</Link>
          </li>
          <li>
            <Link to="/">Page 3</Link>
          </li> */}
        </ul>
      </nav>
      <hr />
      {/* <BreadcsComp /> */}
      <Outlet />
    </div>
  );
};

const App = (props) => {

    let { user } = props
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home {...props} />} />
          <Route path="login" element={<Login {...props} />} />
          {/* <Route path="phoy-detail/:id" element={<PhoyDetail />} />
          <Route path="settings" element={<Settings />} />
          <Route path="limit-number-page" element={<LimitNumberPage />} /> */}
          <Route element={<ProtectedAdministratorRoute user={user} />}>
            <Route path="faker" element={<FakerPage />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    );
};

// export default App;
const mapStateToProps = (state, ownProps) => {
  return { 
          user:state.auth.user, 
          ws: state.ws,
          conversations: state.auth.conversations, 
        }
}

const mapDispatchToProps = {
  // editedUserBalace,
  // editedUserBalaceBook,
  updateProfile,
  logout,

  // deletedConversation,

  // addedConversations,
  // addedConversation
}

export default connect( mapStateToProps, mapDispatchToProps )(App)