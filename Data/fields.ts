import Product from "@/Types/Product";
import FormFields from "../Types/FieldHeaders";
const fields: FormFields<Product>[] = [
  {
    register: "title",
    id: "title",
    label: "title",
    required: true,
    fullWidth: true,
    autoFocus: true,
    minLength: 4,
  },
  {
    register: "price",
    id: "price",
    label: "price",
    required: true,
    fullWidth: true,
    autoFocus: false,
    minLength: 2,
  },
  {
    register: "description",
    id: "description",
    label: "description",
    required: true,
    fullWidth: true,
    autoFocus: false,
    minLength: 4,
  },
  {
    register: "category",
    id: "category",
    label: "category",
    required: true,
    fullWidth: true,
    autoFocus: false,
    minLength: 4,
  },
  {
    register: "image",
    id: "image",
    label: "image",
    required: true,
    fullWidth: true,
    autoFocus: false,
    minLength: 5,
  },
];
export default fields;
