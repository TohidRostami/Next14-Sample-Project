import fields from "@/Data/fields";
import Product from "@/Types/Product";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
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
}: {
  submitHandler: SubmitHandler<Product>;
  backHandler: () => void;
  categories: string[] | undefined;
  product: Product | null;
  submitButtonText: string;
}) => {
  const { handleSubmit, register } = useForm<Product>();
  const [visible, setVisible] = React.useState(true);

  const handleCheckboxChange = () => {
    setVisible(!visible);
  };

  return (
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
              <Grid item container spacing={2} key={field.id} sx={{}}>
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    options={categories as string[]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("category")}
                        key={field.id}
                      />
                    )}
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
                required={field.required}
                fullWidth
                id={field.id}
                label={t(field.label)}
                defaultValue={product?.[field.register]}
                autoFocus={field.autoFocus}
                {...register(field.register)}
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
  );
};

export default Form;
