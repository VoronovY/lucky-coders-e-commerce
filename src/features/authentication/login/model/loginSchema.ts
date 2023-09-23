import { object } from 'yup';

import emailValidation from '../../../../shared/validation/model/emailValidation';
import passwordValidation from '../../../../shared/validation/model/passwordValidation';

const signInSchema = object().shape({ email: emailValidation, password: passwordValidation });

export default signInSchema;
