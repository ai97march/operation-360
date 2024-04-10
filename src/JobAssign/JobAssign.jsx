import React from "react";
import { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import JobDetailForm from "./JobDetailForm";
import { Form, Formik, useField } from "formik";
import { FORM_VALIDATION, INITIAL_FORM_STATE } from "./FormikMetaData";
import ActivityDetails from "./ActivityDetails";
import { CheckBox } from "@mui/icons-material";
import JobDetailForModal from "./JobDetailsForModal";
import RepeatJob from "./RepeatJob";
import dayjs from "dayjs";

const steps = ["Job Details", "Activity Details", "Repeatable Jobs?"];

function _handleSubmit(values, actions, activeStep, setActiveStep) {
  if (activeStep === 2) {
    actions.setSubmitting(false);
    console.log("values1", values);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  } else {
    console.log("values2", values);
    actions.setTouched({});
    actions.setSubmitting(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const JobAssign = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [calendarEv, setCalendarEv] = useState(null);

  const [assetGroup, setAssetGroup] = useState("");
  const [assetGroupList, setAssetGroupList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(["a", "b", "c"]);
  const [name, setName] = useState("");
  const [approver, setApprover] = useState("");
  const [approverList, setApproverList] = useState(["a", "b", "c"]);
  const [weekdays, setWeekdays] = useState("6");
  const [fromdate, setFromdate] = useState(dayjs("2024-04-17T15:30"));
  const [todate, setTodate] = useState(dayjs("2024-04-19T15:30"));
  const [priority, setPriority] = useState("");
  const [priorityList, setPriorityList] = useState([
    "Critical",
    "Normal",
    "Low",
  ]);
  const [tag, setTag] = useState("");

  const handleDateClick = (selected) => {
    // const title = prompt("Please enter a new title for your event");
    // const dateString = formatDate(selected.start, {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // });
    const currentDate = new Date().toLocaleDateString();
    const isSelectedDateInPast =
      selected.start.toLocaleDateString() < currentDate;
    const calendarApi = selected.view.calendar;
    setCalendarEv(selected);
    calendarApi.unselect();

    // if (title) {
    if (isSelectedDateInPast) {
      setOpenSnack(true);
    } else {
      setOpenDialog(true);
      // calendarApi.addEvent({
      //   id: `${selected.dateStr}-${title}`,
      //   title,
      //   start: selected.startStr,
      //   end: selected.endStr,
      //   allDay: selected.allDay,
      // });
    }
    // }
    // handleClick();
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleClick = () => {
    setOpenSnack(true);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
    }
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  // const isStepSkipped = (step) => {
  //   return skipped.has(step);
  // };

  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleSave = () => {
    const calendarApi = calendarEv.view.calendar;
    calendarApi.addEvent({
      id: `${calendarEv.dateStr}-${task}`,
      title: task,
      start: calendarEv.startStr,
      end: calendarEv.endStr,
      allDay: calendarEv.allDay,
    });
    setOpenDialog(false);
  };

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            backgroundColor="#1F2A40" //{colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: "#4cceac", //colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              themeSystem="bootstrap5"
              height="90vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: "12315",
                  title: "All-day event",
                  date: "2023-11-10",
                },
                {
                  id: "5123",
                  title: "Timed event",
                  date: "2023-11-12",
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%", alignItems: "center" }}
        >
          <Typography variant="h6">Invalid Date Selection</Typography>
          <Typography variant="body1">
            Job can't be assigned in past.
          </Typography>
        </Alert>
      </Snackbar>
      {/* <BootstrapDialog
        // onClose={(event, reason) => handleDialogClose(event, reason)}
        aria-labelledby="customized-dialog-title"
        // open={openDialog}
        disableEscapeKeyDown
        fullWidth
        maxWidth="xl"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Job Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={(event, reason) => handleDialogClose(event, reason)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                const labelProps = {};

                return (
                  <Step key={label}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 2 && (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>Repeat?</Typography>
                <Checkbox
                  title="Repeat?"
                  // checked={elem.tickVal || false}
                  // onChange={(e) =>
                  //   onBooleanChange(e, elem, gridDataTest, setGridDataTest)
                  // }
                  // required={elem.requiredfield}
                  // disabled={!elem.editable || elem.disabled}
                />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            )}
            {activeStep === 0 && (
              <React.Fragment>
                <Grid container>
                  <Grid item xs={12}>
                    <Container maxWidth="md">
                      <Formik
                        initialValues={INITIAL_FORM_STATE}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={(values, actions) =>
                          _handleSubmit(
                            values,
                            actions,
                            activeStep,
                            setActiveStep
                          )
                        }
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <JobDetailForm
                            // setActiveStep={() => {
                            //   console.log("first");
                            //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
                            // }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 2,
                              }}
                            >
                              <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                              >
                                Back
                              </Button>
                              <Box sx={{ flex: "1 1 auto" }} />
                              {isStepOptional(activeStep) && (
                                <Button
                                  color="inherit"
                                  onClick={handleSkip}
                                  sx={{ mr: 1 }}
                                >
                                  Skip
                                </Button>
                              )}
                              <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="contained"
                                color="primary"
                              >
                                Next
                              </Button>
                            </Box>
                          </Form>
                        )}
                      </Formik>
                    </Container>
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
            {activeStep === 1 && (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Copy to All Performer <CheckBox />
                </Typography>
                <JobDetailForm />
                <ActivityDetails />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </DialogContent>
      </BootstrapDialog> */}
      <Modal
        open={openDialog}
        onClose={(event, reason) => handleDialogClose(event, reason)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableEscapeKeyDown
        disableScrollLock
      >
        <Box sx={style}>
          <Box
            maxWidth="xl"
            sx={{
              //   display: "flex",
              //   justifyContent: "space-between",
              maxHeight: "500px",
              width: "1000px",
              overflow: "auto",
              p: 2,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={(event, reason) => handleDialogClose(event, reason)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Job Details
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label, index) => {
                    const labelProps = {};
                    return (
                      <Step key={label}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === 0 && (
                  <React.Fragment>
                    <Grid container>
                      <Grid item xs={12}>
                        <Container maxWidth="md">
                          <JobDetailForModal
                            assetGroup={assetGroup}
                            assetGroupList={assetGroupList}
                            selectedOption={selectedOption}
                            task={task}
                            taskList={taskList}
                            name={name}
                            approver={approver}
                            approverList={approverList}
                            weekdays={weekdays}
                            fromdate={fromdate}
                            todate={todate}
                            priority={priority}
                            priorityList={priorityList}
                            tag={tag}
                            setAssetGroup={setAssetGroup}
                            setAssetGroupList={setAssetGroupList}
                            setSelectedOption={setSelectedOption}
                            setTask={setTask}
                            setTaskList={setTaskList}
                            setName={setName}
                            setApprover={setApprover}
                            setApproverList={setApproverList}
                            setWeekdays={setWeekdays}
                            setFromdate={setFromdate}
                            setTodate={setTodate}
                            setPriority={setPriority}
                            setPriorityList={setPriorityList}
                            setTag={setTag}
                          />
                        </Container>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {/* <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button> */}
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
                {activeStep === 1 && (
                  <React.Fragment>
                    <ActivityDetails />
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
                {activeStep === 2 && (
                  <React.Fragment>
                    <Grid container>
                      <Grid item xs={12}>
                        <Container maxWidth="md">
                          <RepeatJob />
                        </Container>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </Box>
            </DialogContent>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default JobAssign;
