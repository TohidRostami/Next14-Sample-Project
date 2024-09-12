import FormFields from "../Types/FieldHeaders";
const fields: FormFields[] = [
  {
    register: "title",
    id: "title",
    label: "title",
    required: true,
    fullWidth: true,
    autoFocus: true,
  },
  {
    register: "price",
    id: "price",
    label: "price",
    required: true,
    fullWidth: true,
    autoFocus: false,
  },
  {
    register: "description",
    id: "description",
    label: "description",
    required: true,
    fullWidth: true,
    autoFocus: false,
  },
  {
    register: "category",
    id: "category",
    label: "category",
    required: true,
    fullWidth: true,
    autoFocus: false,
  },
  {
    register: "image",
    id: "image",
    label: "image",
    required: true,
    fullWidth: true,
    autoFocus: false,
  },
];
export default fields;

