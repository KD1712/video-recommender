import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        width: "900px",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "850px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxShadow: 2,
          borderRadius: 1,
        }}
      >
        <h1>Video Recommender For Your Classroom</h1>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "15px",
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
            Course Name:
          </span>
          <TextField
            fullWidth
            required
            margin="normal"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "15px",
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
          <TextField
            fullWidth
            required
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "15px",
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
            Specific Topic if any:
          </span>
          <TextField
            fullWidth
            value={specificTopic}
            onChange={(e) => setSpecificTopic(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "15px",
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
          <TextField
            fullWidth
            margin="normal"
            value={studentLevel}
            onChange={(e) => setStudentLevel(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "15px",
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
            Google API Key:
          </span>
          <TextField
            fullWidth
            margin="normal"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </Box>
        {courseName && description !== "" ? (
          <Button
            sx={{ fontWeight: 700, marginTop: "20px" }}
            variant="contained"
            size="large"
            color="info"
            onClick={handleSearch}
          >
            Search
          </Button>
        ) : (
          <Button
            sx={{ fontWeight: 700, marginTop: "20px" }}
            variant="contained"
            size="large"
            color="info"
            disabled
          >
            Search
          </Button>
        )}

        {/* <Button
          sx={{ fontWeight: 700, marginTop: "20px" }}
          variant="contained"
          size="large"
          color="info"
          onClick={handleSearch}
        >
          Search
        </Button> */}
      </Box>
    </Box>
  );
};

export default Videoform;
