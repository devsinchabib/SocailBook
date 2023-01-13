import * as Yup from "yup";

const addCommentSchema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  body: Yup.string().min(6).required("Please enter your body"),
});

export default addCommentSchema;