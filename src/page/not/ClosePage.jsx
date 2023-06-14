import { useFormik } from "formik";
import * as Yup from "yup";
const ClosePage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Không được để trống')
        .min(4, "Must be 4 characters or more"),

    }),
    onSubmit: (values) => {
      window.alert("Form submitted");
      console.log(values);
    },
  });

  return (
    <section>
      <h1>ClosePage</h1>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label> Your name </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter your name"
        />
        {formik.errors.name && (
          <p className="errorMsg"> {formik.errors.name} </p>
        )}
        <button type="submit"> Continue </button>
      </form>
    </section>
  );
};

export default ClosePage;
