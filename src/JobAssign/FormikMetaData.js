import * as Yup from "yup";

export const INITIAL_FORM_STATE = {
  assetGroup: "IN",
  selectedOption: "Department",
  task: "IN",
  name: "Azarul",
  approver: "IN",
  weekdays: "6",
  fromDate: "2024-03-29T16:17",
  toDate: "2024-03-29T16:17",
  priority: "Critical",
  tag: "Hello",
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const FORM_VALIDATION = Yup.object().shape({
  assetGroup: Yup.string().required("Required"),
  selectedOption: Yup.string().required("Required"),
  task: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  approver: Yup.string().required("Required"),
  weekdays: Yup.string().required("Required"),
  fromDate: Yup.date().required("Required"),
  toDate: Yup.date().required("Required"),
  priority: Yup.string().required("Required"),
  tag: Yup.string().required("Required"),
});
