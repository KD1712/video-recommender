import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TableSortLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Link,
} from "@mui/material";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Videolist: React.FC = () => {
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState<string>("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [filterChannel, setFilterChannel] = useState<string | null>(null);

  const videoData = [
    {
      id: 1,
      srNo: 1,
      title: "Video 1",
      link: "https://example.com/video1",
      description:
        "This is the description for Video 1.Checking the long description for the word wrap in the table in table cell",
      ratings: 8.5,
      views: 1000,
      channel: "Channel A",
    },
    {
      id: 2,
      srNo: 2,
      title: "Video 2",
      link: "https://example.com/video2",
      description: "This is the description for Video 2.",
      ratings: 9.2,
      views: 1500,
      channel: "Channel B",
    },
    {
      id: 3,
      srNo: 3,
      title: "Video 3",
      link: "https://example.com/video3",
      description: "This is the description for Video 3.",
      ratings: 7.8,
      views: 1500,
      channel: "Channel A",
    },
    {
      id: 4,
      srNo: 4,
      title: "Video 4",
      link: "https://example.com/video4",
      description: "This is the description for Video 4.",
      ratings: 8.0,
      views: 1567800,
      channel: "Channel A",
    },
    {
      id: 5,
      srNo: 5,
      title: "Video 5",
      link: "https://example.com/video5",
      description: "This is the description for Video 5.",
      ratings: 9.5,
      views: 1500,
      channel: "Channel B",
    },
    {
      id: 6,
      srNo: 6,
      title: "Video 6",
      link: "https://example.com/video6",
      description: "This is the description for Video 6.",
      ratings: 8.3,
      views: 15100,
      channel: "Channel B",
    },
    {
      id: 7,
      srNo: 7,
      title: "Video 7",
      link: "https://example.com/video7",
      description: "This is the description for Video 7.",
      ratings: 9.0,
      views: 1500,
      channel: "Channel A",
    },
    {
      id: 8,
      srNo: 8,
      title: "Video 8",
      link: "https://example.com/video8",
      description: "This is the description for Video 8.",
      ratings: 8.7,
      views: 1500,
      channel: "Channel C",
    },
    {
      id: 9,
      srNo: 9,
      title: "Video 9",
      link: "https://example.com/video9",
      description: "This is the description for Video 9.",
      ratings: 7.5,
      views: 1500,
      channel: "Channel A",
    },
  ];

  const handleSelect = (videoId: number) => {
    const isSelected = selectedVideos.includes(videoId);
    if (isSelected) {
      setSelectedVideos((prevSelected) =>
        prevSelected.filter((id) => id !== videoId)
      );
    } else {
      setSelectedVideos((prevSelected) => [...prevSelected, videoId]);
    }
  };
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterChannel(event.target.value);
  };
  const handleSort = (column: string) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedAndFilteredData = videoData
    .filter((video) => (filterChannel ? video.channel === filterChannel : true))
    .sort((a, b) => {
      if (orderBy === "title") {
        return (
          (a[orderBy] as string).localeCompare(b[orderBy] as string) *
          (order === "asc" ? 1 : -1)
        );
      }

      return 0;
    });

  const uniqueChannels = Array.from(
    new Set(videoData.map((video) => video.channel))
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "700px",
        width: "950px",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        color: "#223556",
        // boxShadow: 2,
        // borderRadius: 1,
        // padding: "10px",
        // background: "#ebecf0",
      }}
    >
      <Box  
       sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxShadow: 2,
        borderRadius: 1,
        background: "#ebecf0",
      }}>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VideoLibraryIcon sx={{ fontSize: "40px", marginX: "5px" }} />
        <h1>Recommended Videos</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "900px",
          // height: "70%",
          padding: "5px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "10px",
          // boxShadow: 2,
          // borderRadius: 1,
          // background: "#ebecf0",
        }}
      >
        <TableContainer
          sx={{
            // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Shadow effect
            border: "2px solid #ddd", // Border color
            borderRadius: "8px", // Border radius
            overflowX: "hidden",
            overflowY: "auto", // Hide overflowing content
            maxHeight: "300px",
            // marginX: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "26%",
              margin: "10px",
              justifyContent: "flex-start",
            }}
          >
            <span
              style={{
                textWrap: "nowrap",
                marginRight: "10px",
                fontSize: "16px",
              }}
            >
              <FilterAltIcon />
            </span>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="channel-filter-label">Channel Name</InputLabel>
              <Select
                labelId="channel-filter-label"
                id="channel-filter"
                value={filterChannel || ""}
                onChange={handleFilterChange}
                label="Channel Name"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {uniqueChannels.map((channel) => (
                  <MenuItem key={channel} value={channel}>
                    {channel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Table
              sx={{
                minWidth: 650,
                borderTop: "1px solid #ddd ",
                borderSpacing: 0,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#223556" }}
                  >
                    Select
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#223556" }}
                  >
                    Sr.No
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#223556" }}
                  >
                    <TableSortLabel
                      active={orderBy === "title"}
                      direction={orderBy === "title" ? order : "asc"}
                      onClick={() => handleSort("title")}
                    >
                      Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#223556" }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#223556" }}
                  >
                    Channel Name
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#223556" }}
                  >
                    Link
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#223556" }}
                  >
                    <TableSortLabel
                      active={orderBy === "ratings"}
                      direction={orderBy === "ratings" ? order : "asc"}
                      onClick={() => handleSort("ratings")}
                    >
                      Ratings
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "18px", fontWeight: 600, color: "#223556" }}
                  >
                    Views
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAndFilteredData.map((video) => (
                  <TableRow
                    key={video.id}
                    sx={{
                      backgroundColor: "#f9f9f9",
                      borderBottom: "1px solid #ddd",
                      height: "100px",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#223556",
                      }}
                    >
                      <Checkbox
                        checked={selectedVideos.includes(video.id)}
                        onChange={() => handleSelect(video.id)}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#223556",
                      }}
                    >
                      {video.srNo}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#223556",
                      }}
                    >
                      {video.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#223556",
                      }}
                    >
                      {video.description}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#223556",
                      }}
                    >
                      {video.channel}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#223556",
                      }}
                    >
                      <Button
                        sx={{
                          background: "#F2FFF7",
                          color: "#00B448",
                          border: "1px solid #00B448",
                          borderRadius: "50px",
                        }}
                      >
                        <Link
                          href={video.link}
                          sx={{
                            textDecoration: "none",
                            color: "#00B448",
                          }}
                        >
                          Link
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#223556",
                      }}
                    >
                      {video.ratings}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#223556",
                      }}
                    >
                      {video.views}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
        <h3>Videos Selected Earlier with Similar Description</h3>

        <TableContainer>
          <Table sx={{ border: "1px solid #ddd" }}>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3>Coming Soon!</h3>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Button
          sx={{
            fontWeight: 700,
            marginTop: "20px",
          }}
          variant="contained"
          size="large"
          color="secondary"
        >
          Download CSV
          <FileDownloadIcon />
        </Button>
      </Box>


      </Box>
    </Box>
  );
};

export default Videolist;
