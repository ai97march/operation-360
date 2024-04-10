import React, { useEffect, useState } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

// const INITIAL_FORM_STATE = {
//   assetGroup: "",
//   selectedOption: "",
//   task: "IN",
//   name: "Azarul",
//   approver: "IN",
//   weekdays: "6",
//   fromDate: "",
//   toDate: "",
//   priority: "Critical",
//   tag: "Hello",
// };

// const FORM_VALIDATION = Yup.object().shape({
//   assetGroup: Yup.string().required("Required"),
//   selectedOption: Yup.string().required("Required"),
//   task: Yup.string().required("Required"),
//   name: Yup.string().required("Required"),
//   approver: Yup.string().required("Required"),
//   weekdays: Yup.string().required("Required"),
//   fromDate: Yup.date().required("Required"),
//   toDate: Yup.date().required("Required"),
//   priority: Yup.string().required("Required"),
//   tag: Yup.string().required("Required"),
// });
// const JobDetailForm = ({ setActiveStep }) => {
const JobDetailForm = () => {
  return (
    // <Grid container>
    //   <Grid item xs={12}>
    //     <Container maxWidth="md">
    //       <Formik
    //         initialValues={{
    //           ...INITIAL_FORM_STATE,
    //         }}
    //         validationSchema={FORM_VALIDATION}
    //         onSubmit={(values, actions) =>
    //           _handleSubmit(values, actions, setActiveStep)
    //         }
    //       >
    //         <Form>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Your details</Typography>
      </Grid>

      <Grid item xs={12}>
        <SelectWrapper
          name="assetGroup"
          label="Asset Group"
          options={countries}
        />
      </Grid>

      <Grid item xs={12}>
        <RadioWrapperAssignBy
          name="selectedOption"
          label="Assign By"
          options={[
            { label: "User Group", value: "UserGroup" },
            { label: "Department", value: "Department" },
            { label: "Individuals", value: "Individuals" },
          ]}
        />
      </Grid>

      <Grid item xs={12}>
        <SelectWrapperForTask name="task" label="Task" options={countries} />
      </Grid>

      <Grid item xs={12}>
        <TextfieldWrapper name="name" label="Name" />
      </Grid>

      <Grid item xs={12}>
        <SelectWrapper name="approver" label="Approver" options={countries} />
      </Grid>

      <Grid item xs={12}>
        <RadioWrapper
          name="weekdays"
          label="Weekdays"
          options={[
            { label: "Exclude Sat-Sun", value: 5 },
            { label: "Exclude Sunday", value: 6 },
            { label: "All", value: 7 },
          ]}
        />
      </Grid>

      <Grid item xs={6}>
        <DateTime name="fromDate" label="From Date" />
      </Grid>

      <Grid item xs={6}>
        <DateTime name="toDate" label="To Date" />
      </Grid>

      <Grid item xs={12}>
        <SelectWrapper
          name="priority"
          label="Priority"
          options={{
            Critical: "Critical",
            Normal: "Normal",
            Low: "Low",
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextfieldWrapper name="tag" label="TAG" />
      </Grid>

      {/* <Grid item xs={12}>
        <ButtonWrapper>Submit Form</ButtonWrapper>
      </Grid> */}
    </Grid>
    //          </Form>
    //       </Formik>
    //     </Container>
    //   </Grid>
    // </Grid>
  );
};

export default JobDetailForm;

function _handleSubmit(values, actions, setActiveStep) {
  console.log("values", values);
  actions.setTouched({});
  actions.setSubmitting(false);
  setActiveStep();
}

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

  return <TextField {...configTextfield} />;
};

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    // fullWidth: true,
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{children}</Button>;
};

const CheckboxWrapper = ({ name, label, legend, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

const DateTime = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: "datetime-local",
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};

const SelectWrapperForTask = ({ name, options, ...otherProps }) => {
  const { values, touched, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  useEffect(() => {}, [
    values.selectedOption,
    touched.selectedOption,
    setFieldValue,
    name,
  ]);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

const SelectWrapper = ({ name, options, ...otherProps }) => {
  const { values, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

const RadioWrapperAssignBy = ({ name, label, options, ...otherProps }) => {
  const { values, touched, setFieldValue } = useFormikContext();
  const [disabled, setDisabled] = useState(true);
  const [field, meta] = useField(name);

  useEffect(() => {
    if (values.assetGroup) {
      setDisabled(false);
    }
  }, [values.assetGroup, touched.assetGroup, setFieldValue, name]);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configRadio = {
    ...field,
    ...otherProps,
    type: "radio",
    inputProps: { "aria-label": label },
    disabled: disabled,
    onChange: handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl component="fieldset" {...configFormControl}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Radio {...configRadio} value={option.value} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const RadioWrapper = ({ name, label, options, ...otherProps }) => {
  const { values, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configRadio = {
    ...field,
    ...otherProps,
    type: "radio",
    inputProps: { "aria-label": label },
    onChange: handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl component="fieldset" {...configFormControl}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Radio {...configRadio} value={option.value} />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const countries = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia, Plurinational State of",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Democratic Republic of the Congo",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Côte d'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curaçao",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  PF: "French Polynesia",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  HT: "Haiti",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Republic of Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  MX: "Mexico",
  FM: "Micronesia, Federated States of",
  MD: "Republic of Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RO: "Romania",
  RU: "Russian",
  RW: "Rwanda",
  KN: "Saint Kitts and Nevis",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syria",
  TW: "Taiwan, Province of China",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela, Bolivarian Republic of",
  VN: "Viet Nam",
  VI: "Virgin Islands",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};
