import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createProduct } from "../../../../API";
import { tokens } from "../../theme";

const NewProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = async (values) => {
    console.log("Submit button clicked!");
    try {
      const {
        productName,
        description,
        gender,
        category,
        price,
        quantity,
        brand,
        sku,
        imageUrl,
        weight,
      } = values;

      const response = await createProduct(
        productName,
        description,
        gender,
        category,
        price,
        quantity,
        brand,
        sku,
        imageUrl,
        weight
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a new product" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productName}
                name="productName"
                error={touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
                sx={{ gridColumn: "span 2" }}
              />
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: "#2b3142", borderRadius: "5px" }}
              >
                <FormControl sx={{ textAlign: "center" }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gender"
                    row
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value="Female"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: colors.greenAccent[300],
                            },
                          }}
                        />
                      }
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: colors.greenAccent[300],
                            },
                          }}
                        />
                      }
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: "#2b3142", borderRadius: "5px" }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="category"
                    row
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value="Top"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: colors.greenAccent[300],
                            },
                          }}
                        />
                      }
                      label="Top"
                    />
                    <FormControlLabel
                      value="Bottom"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: colors.greenAccent[300],
                            },
                          }}
                        />
                      }
                      label="Bottom"
                    />
                    <FormControlLabel
                      value="Shoe"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: colors.greenAccent[300],
                            },
                          }}
                        />
                      }
                      label="Shoe"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Brand"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brand}
                name="brand"
                error={touched.brand && !!errors.brand}
                helperText={touched.brand && errors.brand}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Image Url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.imageUrl}
                name="imageUrl"
                error={touched.imageUrl && !!errors.imageUrl}
                helperText={touched.imageUrl && errors.imageUrl}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sku"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sku}
                name="sku"
                error={touched.sku && !!errors.sku}
                helperText={touched.sku && errors.sku}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Weight (lbs)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.weight}
                name="weight"
                error={touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  productName: yup.string().required("required"),
  gender: yup.string().required("required"),
  category: yup.string().required("required"),
  description: yup.string().required("required"),
  brand: yup.string().required("required"),
  imageUrl: yup.string().required("required"),
  price: yup.string().required("required"),
  sku: yup.string().required("required"),
  weight: yup.string().required("required"),
});
const initialValues = {
  productName: "",
  password: "",
  gender: "",
  category: "",
  description: "",
  brand: "",
  imageUrl: "",
  price: "",
  sku: "",
  weight: "",
};

export default NewProduct;
