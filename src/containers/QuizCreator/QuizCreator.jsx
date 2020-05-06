import React, { Component } from "react";
import styles from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import {
  createFormControl,
  validateControl,
  validateForm,
} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import { createQuizQuestion, finishCreateQuiz, createQuizName } from "../../store/actions/createQuiz";

function createQuizNameControl() {
  return createFormControl(
    {
      label: "Введите название теста",
      errorMessage: "Название не может быть пустым",
    },
    { required: true }
  );
}

function createOptionControl(number) {
  return createFormControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Поле не может быть пустым",
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createFormControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends Component {
  state = {
    quizName: createQuizNameControl(),
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };
  
  addQuestionHandler = () => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };
    this.props.createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = () => {
    this.props.createQuizName(this.state.quizName.value)
    this.props.finishCreateQuiz()
    this.setState({
      quizName: createQuizNameControl(),
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
};

  submitHandler = (event) => {
    event.preventDefault();
  };
  onBlurQuizNameHandler = () => {
    const quizName = { ...this.state.quizName };
    quizName.touched = true;

    this.setState({ quizName });
  };

  onBlurHandler = (controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.touched = true;

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  changeQuizNameHandler = (value) => {
    const quizName = { ...this.state.quizName };
    quizName.touched = true;
    quizName.value = value;
    quizName.valid = validateControl(quizName.value, quizName.validation);

    this.setState({ quizName });
  };

  changeControlHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  changeSelectHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  renderQuizNameControl = () => {
    const control = this.state.quizName;
    return (
      <Input
        label={control.label}
        value={control.value}
        valid={control.valid}
        shouldValidate={!!control.validation}
        touched={control.touched}
        errorMessage={control.errorMessage}
        onChange={(event) => this.changeQuizNameHandler(event.target.value)}
        onBlur={() => this.onBlurQuizNameHandler()}
      />
    );
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeControlHandler(event.target.value, controlName)
            }
            onBlur={() => this.onBlurHandler(controlName)}
          />
          {index === 0 || index === 4 ? <hr /> : null}
        </React.Fragment>
      );
    });
  };

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.changeSelectHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );

    return (
      <div className={styles.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderQuizNameControl()}
            {this.renderControls()}

            {select}
            
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quiz: state.createQuiz.quiz
})

const mapDispatchToProps = dispatch => ({
  createQuizQuestion: item => dispatch(createQuizQuestion(item)),
  finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  createQuizName: (quizName) => dispatch(createQuizName(quizName)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)