// types
import { FieldError } from '~/types/generated';

type mapErrors = (errors: FieldError[]) => { field: any; message: string };

const mapError: mapErrors = (errors) => ({
  field: errors[0].field,
  message: errors[0].message
});

export default mapError;
