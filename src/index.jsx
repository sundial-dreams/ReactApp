import React, {Component} from "react";
import ReactDOM from "react-dom";
import {hot} from "react-hot-loader";
import {createStore} from "redux";
import styles from "./index.scss";
import Home from "pages/home/home";
import {ClickAct} from "reduxs/actions/actions";
import {ClickReducer} from "reduxs/reducer/reducer";

const store = createStore(ClickReducer);

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {swc} = store.getState();
    return (
      <div className={styles.app}>
        <Home dispatchClick={() => store.dispatch(ClickAct(!swc))} swc={store.getState().swc}/>
      </div>
    );
  }
}

const Apps = hot(module)(App);
const Render = () => ReactDOM.render(<Apps/>, document.getElementById("app"));
Render();
store.subscribe(Render);