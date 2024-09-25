import React from "react";
import fields from "@/Data/fields";
import Product from "@/Types/Product";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { t } from "i18next";

const Form = ({
  submitHandler,
  backHandler,
  categories,
  product,
  submitButtonText,
  isLoading,
  isError,
}: {
  submitHandler: SubmitHandler<Product>;
  backHandler: () => void;
  categories: string[] | undefined;
  product: Product | null;
  submitButtonText: string;
  isLoading: boolean;
  isError: boolean;
}) => {
  // "title" | "price" | "category" | "description" | "image" | "id"
  const schema: ZodType<Product> = z.object({
    title: z.string().min(4).max(30),
    price: z.preprocess(
      (val) => {
        const priceStr = String(val);
        return /^[0-9]+(\.[0-9]{1,2})?$/.test(priceStr) ? priceStr : null; // Return price as string if valid, else null
      },
      z.string().refine((val) => val !== null, {
        message: "Price must be a valid number",
      })
    ),
    category: z.string().min(4).max(30),
    description: z.string().min(4).max(30),
    image: z.string().min(4).max(30),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(schema),
  });
  const [visible, setVisible] = React.useState(true);

  const handleCheckboxChange = () => {
    setVisible(!visible);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Box>
          <Alert severity="error">{t("failedToFetchCategories")}</Alert>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={backHandler}
          >
            {t("back")}
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit(submitHandler)}
        >
          <Grid container spacing={2}>
            {fields.map((field) => {
              if (field.label.includes("category")) {
                return (
                  <Grid item container spacing={2} key={field.id}>
                    <Grid item xs={5}>
                      <Autocomplete
                        required={field.required}
                        defaultValue={product?.category}
                        disablePortal
                        options={categories as string[]}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("category")}
                            key={field.id}
                          />
                        )}
                        {...register("category")}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker label={t("datePicker")} />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                );
              }
              return (
                <Grid item xs={12} key={field.id}>
                  <TextField
                    fullWidth
                    id={field.id}
                    label={t(field.label)}
                    defaultValue={product?.[field.register]}
                    autoFocus={field.autoFocus}
                    {...register(field.register)}
                  />
                  {errors[field.register] && (
                    <span style={{ fontSize: "0.75rem", color: "red" }}>
                      {errors[field.register]?.message}
                    </span>
                  )}
                </Grid>
              );
            })}

            <Grid item xs={12}>
              <FormControlLabel
                label={t("checkboxText")}
                control={
                  <Checkbox
                    name="editCheckbox"
                    onChange={handleCheckboxChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3 }}
            disabled={visible}
          >
            {t(submitButtonText)}
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={backHandler}
          >
            {t("back")}
          </Button>
        </Box>
      )}
    </>
  );
};

export default Form;

// in TextField
// error={!!errors[field.register]}
// helperText={
//   errors[field.register]
//     ? errors[field.register]?.message
//     : ""
// }

// in resigiter
// , {
//   required: field.required
//     ? `${t(field.label)} is required`
//     : false,
//   minLength: field.minLength
//     ? {
//         value: field.minLength,
//         message: `${t(field.label)} must be at least ${
//           field.minLength
//         } characters`,
//       }
//     : undefined,
// }
