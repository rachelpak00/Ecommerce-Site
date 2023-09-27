import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { deleteProduct } from "../../api";
import { deleteUser } from "../../api";

const DeleteUserOrProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const { userId } = values;
      console.log(userId);
      const response = await deleteUser(userId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit2 = async (values) => {
    try {
      const { productId } = values;
      console.log(productId);
      const response = await deleteProduct(productId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Box m="20px">
      <Header title="DELETE USER" subtitle="Delete an existing user" />

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
                label="UserId"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userId}
                name="userId"
                error={!!touched.userId && !!errors.userId}
                helperText={touched.userId && errors.userId}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Delete User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Header title="DELETE PRODUCT" subtitle="Delete an exisiting product" />

      <Formik
        onSubmit={handleFormSubmit2}
        initialValues={initialValuesForm2}
        validationSchema={checkoutSchemaForm2}
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
                label="ProductId"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.productId}
                name="productId"
                error={!!touched.productId && !!errors.productId}
                helperText={touched.productId && errors.productId}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Delete Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  userId: yup.string().required("required"),
});
const initialValues = {
  userId: "",
};
const checkoutSchemaForm2 = yup.object().shape({
  productId: yup.string().required("required"),
});
const initialValuesForm2 = {
  productId: "",
};

export default DeleteUserOrProduct;
