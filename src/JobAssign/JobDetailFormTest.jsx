import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik, Field, Form } from "formik";

const JobDetailForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          assetGroup: "",
          assignBy: "",
          department: "",
          individual: "",
          task: "",
          name: "",
          approver: "",
          weekdays: "",
          excludeSatSun: false,
          excludeSunday: false,
          from: "",
          to: "",
          priority: "",
          tag: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormControl fullWidth>
              <InputLabel>Asset Group</InputLabel>
              <Field as={Select}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="group1">Group 1</MenuItem>
                <MenuItem value="group2">Group 2</MenuItem>
              </Field>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Assign By</InputLabel>
              <Field as={Select}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="userGroup">User Group</MenuItem>
                <MenuItem value="department">Department</MenuItem>
                <MenuItem value="individuals">Individuals</MenuItem>
              </Field>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Task</InputLabel>
              <Field as={Select}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="task1">Task 1</MenuItem>
                <MenuItem value="task2">Task 2</MenuItem>
              </Field>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                size="small"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="approver"
                label="Approver"
                variant="outlined"
                size="small"
              />
            </FormControl>
            <FormControl fullWidth>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Field as={Checkbox} type="checkbox" name="weekdays" />
                  }
                  label="Weekdays"
                />
                <FormControlLabel
                  control={
                    <Field as={Checkbox} type="checkbox" name="excludeSatSun" />
                  }
                  label="Exclude Sat-Sun"
                />
                <FormControlLabel
                  control={
                    <Field as={Checkbox} type="checkbox" name="excludeSunday" />
                  }
                  label="Exclude Sunday"
                />
              </FormGroup>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="from"
                label="From"
                variant="outlined"
                size="small"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="to"
                label="To"
                variant="outlined"
                size="small"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Field as={Select}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Field>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="tag"
                label="TAG"
                variant="outlined"
                size="small"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobDetailForm;
