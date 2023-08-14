import { object } from 'yup';

import emailSchema from '../../../../shared/validation/model/emailSchema';
import passwordSchema from '../../../../shared/validation/model/passwordSchema';

const userSchema = object().shape({ ...emailSchema.fields, ...passwordSchema.fields });

export default userSchema;
