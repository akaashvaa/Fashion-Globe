import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignInContainer, BtnFlex } from './sign-in-form.styles.jsx';

import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormHelper from '../form-helper/form-helper.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // console.log(formFields);

  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    // console.log("reset formfield");
  };

  const signInWithGoogle = async () => dispatch(googleSignInStart());

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      resetFormFields();
      dispatch(emailSignInStart(email, password));
      // console.log("sign in with email and pass -> ", user);

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert("Paaword doesn't match ! try again :)");
          break;
        case 'auth/user-not-found':
          alert('User Not Found');
          break;
        default:
          console.log(err);
      }
      console.log('user creation encountered an error', err);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Sign IN </h2>
      <form onSubmit={handleSubmit}>
        <FormHelper
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormHelper
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <BtnFlex>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign-In
          </Button>
        </BtnFlex>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
