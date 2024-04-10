import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import React from "react";
import ApprovedTable from "./ApproveTable";

const PaddedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

const JobReviewer = () => {
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
                    <Typography>Pending</Typography>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<AutorenewOutlinedIcon fontSize="small" />}
                        size="small"
                      >
                        0
                      </Button>
                    </Stack>
                  </PaddedPaper>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={12}>
                    <PaddedPaper
                      elevation={3}
                      sx={{ height: "20vh" }}
                    ></PaddedPaper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={4} spacing={0.5}>
                <Grid item xs={12}>
                  <PaddedPaper
                    elevation={24}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Approved</Typography>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<ThumbUpOutlinedIcon fontSize="small" />}
                        size="small"
                      >
                        0
                      </Button>
                    </Stack>
                  </PaddedPaper>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={12}>
                    <PaddedPaper
                      elevation={24}
                      sx={{ height: "20vh" }}
                    ></PaddedPaper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={4} spacing={0.5}>
                <Grid item xs={12}>
                  <PaddedPaper
                    elevation={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Rejected</Typography>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<ThumbDownOutlinedIcon fontSize="small" />}
                        size="small"
                      >
                        0
                      </Button>
                    </Stack>
                  </PaddedPaper>
                </Grid>
                <Grid item container spacing={0.5}>
                  <Grid item xs={12}>
                    <PaddedPaper
                      elevation={12}
                      sx={{ height: "20vh" }}
                    ></PaddedPaper>
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
                    <ApprovedTable />
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

export default JobReviewer;
