import React, { useState } from "react";
import { Button, TextField, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import "./image.css";
// import bgimage from "./assets/bgimg.jpg";
// import bgimage1 from "./assets/bgimage1.jpg";
// import bgimage2 from "./assets/bgimage3.jpg";
// import bgimage3 from "./assets/bgimage4.jpg";
// import bgimage4 from "./assets/bgimage5.jpg";
// import bgimage5 from "./assets/bgimage6.jpg";
import bgimage6 from "./assets/bgimage7.png";

const Videoform: React.FC = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [specificTopic, setSpecificTopic] = useState("");
  const [studentLevel, setStudentLevel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loader, setLoader] = useState(false);

  // const handleSearch = () => {
  //   navigate("/videos");
  //   console.log(courseName, description, specificTopic, studentLevel, apiKey);
  // };
  const handleSearch = async () => {
    try {
      setLoader(true);
      const url =
        "https://youtubepoc1-zezf5ueina-uc.a.run.app/get_similar_videos"; // Replace with your actual API endpoint
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
          // Add any other headers if needed
        },
        body: new URLSearchParams({
          course_title: courseName,
          course_description: description,
        }),
      });

      if (!response.ok) {
        setLoader(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the API response is in JSON format
      const responseData = await response.json();

      // Handle the response data as needed, e.g., navigate to a new page
      setLoader(false);
      // console.log("API Response:", responseData);
      navigate("/videos", { state: responseData });
    } catch (error) {
      setLoader(false);

      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{ background: "#ffffff", overflow: "hidden", position: "relative" }}
    >
      <>
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: "#212b4b",
            color: "white",
            height: "45px",
            // width: "100%",
          }}
        >
          <VideoLibraryIcon sx={{ fontSize: "40px", marginX: "5px" }} />
          <span style={{ fontSize: "35px", fontWeight: 700 }}>
            Video Recommender
          </span>
        </nav>
        <div className="ripple-background">
          <div className="circle xxlarge shade1"></div>
          <div className="circle xlarge shade2"></div>
          <div className="circle large shade3"></div>
          <div className="circle medium shade4"></div>
        </div>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "10px",
            // backgroundColor: "red",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            // width: "100%",
            height: "619px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // background: "blue",
              height: "100%",
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              paddingX: "10px",
              transition: "box-shadow 0.15s ease-in-out",
            }}
          >
            <Grid container spacing={0.5}>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
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
            <Grid
              container
              spacing={0.5}
              // sx={{
              //   marginY: "7px",
              //   background: "white",
              //   paddingX: "10px",
              //   boxShadow: "0 0 5px #212b4b",
              //   borderRadius: "5px",
              //   "&:hover": {
              //     // backgroundColor: "#6b7289",
              //     boxShadow: "0 0 10px #212b4b",
              //     borderRadius: "10px",
              //   },
              // }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
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
            <Grid
              container
              spacing={0.5}
              // sx={{
              //   marginY: "7px",
              //   background: "white",
              //   paddingX: "10px",
              //   boxShadow: "0 0 5px #212b4b",
              //   borderRadius: "5px",
              //   "&:hover": {
              //     // backgroundColor: "#6b7289",
              //     boxShadow: "0 0 10px #212b4b",
              //     borderRadius: "10px",
              //   },
              // }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
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
            <Grid
              container
              spacing={0.5}
              // sx={{
              //   marginY: "7px",
              //   background: "white",
              //   paddingX: "10px",
              //   boxShadow: "0 0 5px #212b4b",
              //   borderRadius: "5px",
              //   "&:hover": {
              //     // backgroundColor: "#6b7289",
              //     boxShadow: "0 0 10px #212b4b",
              //     borderRadius: "10px",
              //   },
              // }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
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
            <Grid
              container
              spacing={0.5}
              // sx={{
              //   marginY: "7px",
              //   background: "white",
              //   paddingX: "10px",
              //   boxShadow: "0 0 5px #212b4b",
              //   borderRadius: "5px",
              //   "&:hover": {
              //     // backgroundColor: "#6b7289",
              //     boxShadow: "0 0 10px #212b4b",
              //     borderRadius: "10px",
              //   },
              // }}
            >
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  // background: "red",
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
            <Grid container spacing={0.5}>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // background:'red'
                }}
              ></Grid>

              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {courseName && description !== "" ? (
                  <Button
                    sx={{
                      fontWeight: 700,
                      marginTop: "20px",
                      background: "#ff609b",
                      "&:hover": {
                        backgroundColor: "#ff609b",
                        boxShadow: "none",
                      },
                    }}
                    variant="contained"
                    size="large"
                    // color="secondary"
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
              </Grid>
            </Grid>
          </Box>
          <img
            src={bgimage6}
            alt="bg-img"
            // className="zoom"
            style={{
              height: "100%",
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Box>
      </>
      {loader && (
        <>
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        </>
      )}
    </Box>
  );
};

export default Videoform;
