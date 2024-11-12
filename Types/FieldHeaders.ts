export default interface FormFields<T> {
  register: keyof T;
  id: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
  autoFocus: boolean;
  minLength: number;
}
