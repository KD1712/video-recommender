import React, { useState } from "react";
import { Button, TextField, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const Videoform: React.FC = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [specificTopic, setSpecificTopic] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSearch = () => {
    navigate("/videos");
    console.log(courseName, description, specificTopic, studentLevel, apiKey);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "700px",
        width: "950px",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        color: "#223556",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "900px",
          // height:'auto',
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxShadow: 2,
          borderRadius: 1,
          background: "#ebecf0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <VideoLibraryIcon sx={{ fontSize: "40px", marginX: "5px" }} />
          <h1>Video Recommender For Your Classroom</h1>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Grid container spacing={0.5}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  // display:'flex',
                  marginRight: "10px",
                  textWrap: "nowrap",
                  fontSize: "20px",
                  fontWeight: 500,
                  // alignItems:'flex-start'
                }}
              >
                Course Name:
              </span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                required
                margin="normal"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={0.5}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  marginRight: "10px",
                  textWrap: "nowrap",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                Description:
              </span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                required
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={0.5}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    marginRight: "10px",
                    textWrap: "nowrap",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  Specific Topic If Any:
                </span>
                <span
                  style={{
                    marginRight: "10px",
                    textWrap: "nowrap",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  (Optional)
                </span>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                required
                margin="normal"
                value={specificTopic}
                onChange={(e) => setSpecificTopic(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={0.5}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    marginRight: "10px",
                    textWrap: "nowrap",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  Student Level:
                </span>

                <span
                  style={{
                    marginRight: "10px",
                    textWrap: "nowrap",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  (Optional)
                </span>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                required
                margin="normal"
                value={studentLevel}
                onChange={(e) => setStudentLevel(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={0.5}>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    marginRight: "10px",
                    textWrap: "nowrap",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  Enter Google Api Key:
                </span>

                <span
                  style={{
                    marginRight: "10px",
                    textWrap: "nowrap",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  (Optional)
                </span>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                required
                margin="normal"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            {courseName && description !== "" ? (
              <Button
                sx={{
                  fontWeight: 700,
                  marginTop: "20px",
                  // background: "#61bd4f",
                }}
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleSearch}
              >
                Search
                <SearchIcon />
              </Button>
            ) : (
              <Button
                sx={{ fontWeight: 700, marginTop: "20px" }}
                variant="contained"
                size="large"
                // color="info"
                disabled
              >
                Search
                <SearchIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Videoform;
