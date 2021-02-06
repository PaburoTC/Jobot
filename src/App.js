import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "./components/main/Main";
import Register from "./components/register/Register";
import Login from "./components/login/Login";


function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/register" component={Register} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/" component={Main}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
