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
} from "@mui/material";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

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
    {
      id: 10,
      srNo: 10,
      title: "Video 10",
      link: "https://example.com/video10",
      description: "This is the description for Video 10.",
      ratings: 8.9,
      views: 1500,
      channel: "Channel D",
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
          height: "90%",
          padding: "5px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "10px",
          boxShadow: 2,
          borderRadius: 1,
        }}
      >
        <h1>Recommended Videos</h1>
        <TableContainer
          sx={{
            // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Shadow effect
            border: "1px solid #ddd", // Border color
            borderRadius: "8px", // Border radius
            overflowX: "hidden",
            overflowY: "auto", // Hide overflowing content
            maxHeight: "300px",
            marginX: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "26%",
              margin: "20px",
              justifyContent: "flex-start", // Align the filter to the left
            }}
          >
            <span
              style={{
                textWrap: "nowrap",
                marginRight: "10px",
                fontSize: "16px",
              }}
            >
              Filter By:
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
          <Table
            sx={{ minWidth: 650, borderCollapse: "collapse", borderSpacing: 0 }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Select
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Sr.No
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleSort("title")}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Description
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Channel Name
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Link
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === "ratings"}
                    direction={orderBy === "ratings" ? order : "asc"}
                    onClick={() => handleSort("ratings")}
                  >
                    Ratings
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Views
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFilteredData.map((video) => (
                <TableRow
                  key={video.id}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "#f9f9f9", // Alternate row background color
                    },
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    <Checkbox
                      checked={selectedVideos.includes(video.id)}
                      onChange={() => handleSelect(video.id)}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.srNo}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.channel}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.description}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    <a href={video.link}>Link</a>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.ratings}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.views}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <h3>Videos Selected Earlier with Similar Description</h3>
        {/* <TableContainer
          sx={{
            // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Shadow effect
            border: "1px solid #ddd", // Border color
            borderRadius: "8px", // Border radius
            overflowX: "hidden",
            overflowY: "auto", // Hide overflowing content
            maxHeight: "300px",
            marginX: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "26%",
              margin: "20px",
              justifyContent: "flex-start", // Align the filter to the left
            }}
          >
            <span
              style={{
                textWrap: "nowrap",
                marginRight: "10px",
                fontSize: "16px",
              }}
            >
              Filter By:
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
          <Table
            sx={{ minWidth: 650, borderCollapse: "collapse", borderSpacing: 0 }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Select
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Sr.No
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleSort("title")}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Description
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Channel Name
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Link
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === "ratings"}
                    direction={orderBy === "ratings" ? order : "asc"}
                    onClick={() => handleSort("ratings")}
                  >
                    Ratings
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                  Views
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFilteredData.map((video) => (
                <TableRow
                  key={video.id}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "#f9f9f9", // Alternate row background color
                    },
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    <Checkbox
                      checked={selectedVideos.includes(video.id)}
                      onChange={() => handleSelect(video.id)}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.srNo}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.channel}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.description}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    <a href={video.link}>Link</a>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.ratings}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #ddd", // Border color between cells
                    }}
                  >
                    {video.views}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        <TableContainer>
          <Table sx={{ border: "1px solid #ddd" }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h4>Coming Soon!</h4>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{ fontWeight: 700, marginTop: "20px" }}
          variant="contained"
          size="large"
          color="info"
        >
          Download CSV
        </Button>
      </Box>
    </Box>
  );
};

export default Videolist;
