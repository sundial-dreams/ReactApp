import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./test.scss";
class Test extends Component{
  constructor(props){
    super(props);
    this.el = null;
  }
  animate(){
    let n = 0,t,elem = this.el;
    t = requestAnimationFrame(function _animate() {
      elem.style.transform = `translateX(${n}px)`;
      n ++;
      console.log("it is run",n);
      if (n === 200){
        cancelAnimationFrame(t);
        return
      }
      t = requestAnimationFrame(_animate);
    });
  }
  render() {
    let style = this.props.swc ? {background:`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`} : {};
    this.props.swc && this.animate();
    return (
      <div className={styles.test} style={style} ref={el => this.el = el}>
         Test
      </div>
    );
  }
}
Test.propTypes = {
  swc : PropTypes.bool
};
export default Test