import React from "react";
import styles from "./Drawer.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

const Drawer = (props) => {
  const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false}
  ]
  const classes = [styles.Drawer, !props.isOpen ? styles.close : null];

  const renderLinks = () => links.map((link, index) => {
        return (
          <li key={index} >
            <NavLink 
              to={link.to} 
              exact={link.exact}
              activeClassName={classes.active}
              onClick={props.onClose}
            >
              {link.label}
            </NavLink>
          </li>
        )
  })

  return (
    <>
      <nav className={classes.join(" ")}>
        <ul>
          {renderLinks()}
        </ul>
      </nav>
      {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
    </>
  );
};

export default Drawer;
