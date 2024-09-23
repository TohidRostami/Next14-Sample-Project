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
import { t } from "i18next";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Product>();
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
                    {...register(field.register, {
                      required: field.required
                        ? `${t(field.label)} is required`
                        : false,
                      minLength: field.minLength
                        ? {
                            value: field.minLength,
                            message: `${t(field.label)} must be at least ${
                              field.minLength
                            } characters`,
                          }
                        : undefined,
                    })}
                    error={!!errors[field.register]}
                    helperText={
                      errors[field.register]
                        ? errors[field.register]?.message
                        : ""
                    }
                  />
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
