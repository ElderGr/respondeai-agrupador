import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErros: Errors = {};

  err.inner.forEach((error: ValidationError) => {
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
