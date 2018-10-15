import React ,{Component} from "react";
import PropTypes from "prop-types";
import styles from "./home.scss";
import Button from "components/Button1/button";
import Test from "components/Test1/test";


class Home extends Component{
  constructor(props){
    super(props)
  }

  render() {
    let {dispatchClick,swc} = this.props;
    return (
      <div className={styles.home}>
        <div className={styles.button_layout}>
          <Button text="click me" onClick={dispatchClick}/>
        </div>
        <div className={styles.test_layout}>
          <Test swc={swc}/>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  dispatchClick:PropTypes.func,
  swc:PropTypes.bool
};
export default Home