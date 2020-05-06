import React, { Component } from "react";
import styles from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { validateControl, createFormControl, validateForm } from "../../form/formFramework";
import axios from 'axios'

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      formControls: {
        email: createFormControl(
          {
            type: "email",
            label: "Email",
            errorMessage: "Введите корректный email",
          },
          { 
            required: true,
            email: true

          }
        ),
        password: createFormControl(
          {
            type: "password",
            label: "Пароль",
            errorMessage: "Пароль должен состоять минимум из 6 символов",
          },
          {
            required: true,
            minLength: 6
          }
        )
      },
    };
  }

  loginHandler = async () => {
    try {
      const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true
      }
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDoHK8CptIwDtauqOudPPDI83CJGw4adqE', authData)
      console.log(response)
    } catch(e) {
      console.log(e)
    }
  };

  registerHandler = async () => {
    try {
      const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true
      }
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDoHK8CptIwDtauqOudPPDI83CJGw4adqE', authData)
      console.log(response)
    } catch(e) {
      console.log(e)
    }

  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  onBlurHandler = (controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName]}
    control.touched = true
    formControls[controlName] = control
    this.setState({
      formControls
    })
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.touched = true;
    
    control.value = event.target.value;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
          onBlur={() => this.onBlurHandler(controlName)}
        />
      );
    });
  };

  render() {
    return (
      <div className={styles.Auth}>
        <div className={styles.Auth__wrapper}>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={styles.Authform}>
            {this.renderInputs()}
            <div>
              <Button
                type="success"
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Войти
              </Button>
              <Button
                type="primary"
                onClick={this.registerHandler}
                disabled={!this.state.isFormValid}
              >
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
