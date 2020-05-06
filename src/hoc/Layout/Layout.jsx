import React from "react";
import styles from "./Layout.module.scss";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { connect } from "react-redux";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false
    }
  }

  onToggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  onCloseHandler = () => {
    this.setState({
      menu: false
    })
  }
  
  render() {
    return (
      <div className={styles.Layout}>
        <Drawer 
          isOpen={this.state.menu}
          onClose={this.onCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
          />

        <MenuToggle
          isOpen={this.state.menu}
          onToggleMenu={this.onToggleMenuHandler}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps)(Layout);
