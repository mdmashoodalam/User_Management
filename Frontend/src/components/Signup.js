import Card from "./UI/Card/Card"; // Importing Card component
import classes from "./Login/Login.module.css"; // Importing CSS styles
import Button from "./UI/Button/Button"; // Importing Button component
import Input from "./UI/Input/Input"; // Importing Input component
import useInput from "./../hooks/use-input"; // Custom hook for input handling

const Signup = (props) => {
  // Input handling for email
  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailInputHandler,
    reset: resetEmail,
  } = useInput((value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  );

  // Input handling for password
  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordInputHandler,
    reset: resetPassword,
  } = useInput((value) => value.length > 7);

  // Input handling for name
  const {
    value: enteredName,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameInputHandler,
    reset: resetName,
  } = useInput((value) => value.length > 3);

  // Form submission handler
  const submitHandler = (event) => {
    event.preventDefault();
    props.addUser({
      name: enteredName,
      email: enteredEmail.toLowerCase(),
      password: enteredPassword,
    });
    resetEmail();
    resetPassword();
    resetName();
  };

  // Check if the form is valid
  const formIsValid = emailIsValid && passwordIsValid && nameIsValid;

  return (
    <Card className={classes.login}> {/* Card for layout */}
      <form onSubmit={submitHandler}>
        <Input
          id="name"
          label="Name"
          type="text"
          onChange={nameInputHandler}
          isValid={!nameHasError} // Validity state for styling
        />
        <Input
          id="email"
          label="E-mail"
          type="email"
          onChange={emailInputHandler}
          isValid={!emailHasError} // Validity state for styling
        />
        <Input
          id="password"
          label="Password"
          type="password"
          onChange={passwordInputHandler}
          isValid={!passwordHasError} // Validity state for styling
        />
        <h6 className={classes.error}>{props.error}</h6> {/* Error message display */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Sign Up
          </Button> {/* Sign Up button, disabled if form is invalid */}
        </div>
      </form>
    </Card>
  );
};

export default Signup; // Exporting the Signup component
