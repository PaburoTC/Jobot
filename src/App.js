import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "./components/Main/Main";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";


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
