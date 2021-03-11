import React from "react";
import {Route,Switch,Redirect} from 'react-router-dom'
import Admin from "./containers/Admin/Admin";
import Login from './containers/Login/Login'

function App() {
  return (
    <>

        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/admin' component={Admin}/>
        {/*    这里直接定位到admin页面，，免得每次进来页面都要输入个login，因为我们是7天免登陆，所以定位到admin里面*/}
            <Redirect to='/admin'/>
        </Switch>
    </>
  );
}

export default App;
