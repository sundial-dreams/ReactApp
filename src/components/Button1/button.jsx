import React,{Component} from "react";
import PropTypes from "prop-types";
import styles from "./button.scss";


class Button extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let {onClick} = this.props;
    return (
      <button className={styles.button} onClick={onClick}>
        {this.props.text}
      </button>
    )
  }
}
Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};
export default Button