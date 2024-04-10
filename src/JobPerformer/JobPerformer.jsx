import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  Tab,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import React, { useState } from "react";
import { deepOrange } from "@mui/material/colors";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AcitivityDetailTable from "./AcitivityDetailTable";

const PaddedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: theme.typography.pxToRem(16),
  },
}));

const JobPerformer = () => {
  const [showCalendar1, setshowCalendar1] = useState(true);
  const [showCalendar2, setshowCalendar2] = useState(true);
  const [showCalendar3, setshowCalendar3] = useState(true);
  const [tabvalue, setTabvalue] = useState("1");

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Grid container spacing={2} mt={3}>
              <Grid item container xs={4} spacing={0.5}>
                <Grid item xs={12}>
                  <PaddedPaper
                    elevation={3}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Upcoming</Typography>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color="info"
                        startIcon={<InfoOutlinedIcon fontSize="small" />}
                        size="small"
                      >
                        0
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={
                          <WarningAmberOutlinedIcon fontSize="small" />
                        }
                        size="small"
                      >
                        0
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<CancelOutlinedIcon fontSize="small" />}
                        size="small"
                      >
                        0
                      </Button>
                    </Stack>
                  </PaddedPaper>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={6}>
                    <PaddedPaper
                      elevation={3}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Job</Typography>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: 24,
                            height: 24,
                          }}
                        >
                          0
                        </Avatar>
                      </Stack>
                    </PaddedPaper>
                  </Grid>
                  <Grid item xs={6}>
                    <PaddedPaper
                      elevation={3}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Activity</Typography>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: 24,
                            height: 24,
                          }}
                        >
                          0
                        </Avatar>
                      </Stack>
                    </PaddedPaper>
                  </Grid>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={6}>
                    <PaddedPaper elevation={3} sx={{ height: "20vh" }}>
                      Today's Glance
                    </PaddedPaper>
                  </Grid>
                  <Grid item xs={6}>
                    <PaddedPaper elevation={3} sx={{ height: "20vh" }}>
                      No Activity For Next 7 Days
                    </PaddedPaper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={4} spacing={0.5}>
                <Grid item xs={12}>
                  <PaddedPaper elevation={24}>Approved</PaddedPaper>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={6}>
                    <PaddedPaper
                      elevation={3}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Job</Typography>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: 24,
                            height: 24,
                          }}
                        >
                          0
                        </Avatar>
                      </Stack>
                    </PaddedPaper>
                  </Grid>
                  <Grid item xs={6}>
                    <PaddedPaper
                      elevation={3}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Activity</Typography>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: 24,
                            height: 24,
                          }}
                        >
                          0
                        </Avatar>
                      </Stack>
                    </PaddedPaper>
                  </Grid>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={6}>
                    <PaddedPaper elevation={24} sx={{ height: "20vh" }}>
                      Approved Activity
                    </PaddedPaper>
                  </Grid>
                  <Grid item xs={6}>
                    <PaddedPaper elevation={24} sx={{ height: "20vh" }}>
                      No Activity For Next 7 Days
                    </PaddedPaper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={4} spacing={0.5}>
                <Grid item xs={12}>
                  <PaddedPaper elevation={12}>Rejected</PaddedPaper>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={6}>
                    <PaddedPaper
                      elevation={3}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Job</Typography>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: 24,
                            height: 24,
                          }}
                        >
                          0
                        </Avatar>
                      </Stack>
                    </PaddedPaper>
                  </Grid>
                  <Grid item xs={6}>
                    <PaddedPaper
                      elevation={3}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Activity</Typography>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: deepOrange[500],
                            width: 24,
                            height: 24,
                          }}
                        >
                          0
                        </Avatar>
                      </Stack>
                    </PaddedPaper>
                  </Grid>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={6}>
                    <PaddedPaper elevation={12} sx={{ height: "20vh" }}>
                      Rejected Activity
                    </PaddedPaper>
                  </Grid>
                  <Grid item xs={6}>
                    <PaddedPaper elevation={12} sx={{ height: "20vh" }}>
                      No Activity For Next 7 Days
                    </PaddedPaper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={3}>
              <Grid item xs={12}>
                <PaddedPaper
                  elevation={3}
                  // sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={tabvalue}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={(event, newValue) => setTabvalue(newValue)}
                          aria-label="lab API tabs example"
                        >
                          <Tab label="Current Job" value="1" />
                          <Tab label="Pending Job" value="2" />
                          <Tab label="Upcoming Job" value="3" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          py={2}
                        >
                          <Typography>
                            {showCalendar1 ? "Calendar View" : "Tabular View"}
                          </Typography>
                          <BootstrapTooltip
                            title="Calendar View On/Off"
                            placement="top"
                          >
                            <Switch
                              checked={showCalendar1}
                              onChange={(event) =>
                                setshowCalendar1(event.target.checked)
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </BootstrapTooltip>
                        </Box>
                        {showCalendar1 ? (
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
                              right:
                                "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            // select={handleDateClick}
                            // eventClick={handleEventClick}
                            // eventsSet={(events) => setCurrentEvents(events)}
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
                        ) : (
                          <AcitivityDetailTable />
                        )}
                      </TabPanel>
                      <TabPanel value="2">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          py={2}
                        >
                          <Typography>
                            {showCalendar2 ? "Calendar View" : "Tabular View"}
                          </Typography>
                          <BootstrapTooltip
                            title="Calendar View On/Off"
                            placement="top"
                          >
                            <Switch
                              checked={showCalendar2}
                              onChange={(event) =>
                                setshowCalendar2(event.target.checked)
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </BootstrapTooltip>
                        </Box>
                        {showCalendar2 ? (
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
                              right:
                                "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            // select={handleDateClick}
                            // eventClick={handleEventClick}
                            // eventsSet={(events) => setCurrentEvents(events)}
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
                        ) : (
                          <AcitivityDetailTable />
                        )}
                      </TabPanel>
                      <TabPanel value="3">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          py={2}
                        >
                          <Typography>
                            {showCalendar3 ? "Calendar View" : "Tabular View"}
                          </Typography>
                          <BootstrapTooltip
                            title="Calendar View On/Off"
                            placement="top"
                          >
                            <Switch
                              checked={showCalendar3}
                              onChange={(event) =>
                                setshowCalendar3(event.target.checked)
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </BootstrapTooltip>
                        </Box>
                        {showCalendar3 ? (
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
                              right:
                                "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            // select={handleDateClick}
                            // eventClick={handleEventClick}
                            // eventsSet={(events) => setCurrentEvents(events)}
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
                        ) : (
                          <AcitivityDetailTable />
                        )}
                      </TabPanel>
                    </TabContext>
                  </Box>
                </PaddedPaper>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default JobPerformer;
