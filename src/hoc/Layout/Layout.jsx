import React from "react";
import styles from "./Layout.module.scss";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

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

export default Layout;
