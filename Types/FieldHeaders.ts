export default interface FormFields {
  register: "title" | "price" | "category" | "description" | "image" | "id";
  id: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
  autoFocus: boolean;
  minLength: number;
}
