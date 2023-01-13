import * as Yup from "yup";

const addPostSchema = Yup.object({
  title: Yup.string().required("Please enter your title"),
  body: Yup.string().min(6).required("Please enter your body"),
});

export default addPostSchema;