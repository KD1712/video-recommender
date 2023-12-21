import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import data from "./data.json";
import { useLocation } from "react-router-dom";
interface Video {
  "Channel Name": string;
}

const Videolist: React.FC = () => {
  const { state } = useLocation();
  // const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderBy, setOrderBy] = useState<string>("title");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [filterChannel, setFilterChannel] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(state);

  useEffect(() => {
    console.log(state);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const handleDeleteSelectedRows = () => {
  //   setSelectedRows([]);
  // };
  // const handleSort = (column: string) => {
  //   const isAsc = orderBy === column && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(column);
  // };

  // const handleSelect = (videoId: number) => {
  //   const isSelected = selectedVideos.includes(videoId);
  //   if (isSelected) {
  //     setSelectedVideos((prevSelected) =>
  //       prevSelected.filter((id) => id !== videoId)
  //     );
  //   } else {
  //     setSelectedVideos((prevSelected) => [...prevSelected, videoId]);
  //   }
  // };
  // const filteredData = filterChannel
  //   ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     data.filter((item: any) => item["Channel Name"] === filterChannel)
  //   : data;
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterChannel(event.target.value);
  };


  const sortedAndFilteredData: Video[] = data
    .filter((video: Video) =>
      filterChannel ? video["Channel Name"] === filterChannel : true
    )
    .sort((a: Video, b: Video) => {
      if (orderBy === "Channel Name") {
        return (
          (a[orderBy as keyof Video] as string).localeCompare(
            b[orderBy as keyof Video] as string
          ) * (order === "asc" ? 1 : -1)
        );
      }

      return 0;
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniqueChannels = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...new Set(data.map((item: any) => item["Channel Name"])),
  ];

  

  const fieldNames = data.length > 0 ? Object.keys(data[0]) : [];
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const capitalizeAndReplaceUnderscore = (str: string) => {
    const words = str.split("_");
    const capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
    return capitalizedWords.join(" ");
  };
  const handleRowSelect = (index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    const newSelectedRows = [...selectedRows];

    if (selectedIndex === -1) {
      newSelectedRows.push(index);
    } else {
      newSelectedRows.splice(selectedIndex, 1);
    }

    setSelectedRows(newSelectedRows);
  };



  return (
    <Box sx={{ background: "#ffffff" }}>
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
          Recommended Videos
        </span>
      </nav>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // background: "red",
          // width: "100%",
          // height: "639px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "5px",
            justifyContent: "flex-start",
            // background: "#bcbfc9",
            width: "99.2%",
            borderBottom: "1px solid black",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "70px",
            }}
          >
            <FilterAltIcon sx={{ fontSize: "30px", marginY: "2.5px" }} />
            <FormControl
              variant="outlined"
              size="small"
              sx={{ width: "150px" }}
            >
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
                {uniqueChannels.map(
                  (channel) =>
                    typeof channel === "string" && (
                      <MenuItem key={channel} value={channel}>
                        {channel}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer sx={{ maxHeight: "400px", overflow: "auto" }}>
          <Table>
            <TableHead
              sx={{
                background: "#bcbfc9",
                margin: 0,
              }}
            >
              <TableRow>
                <TableCell sx={{ width: "50px", border: "1px solid black" }}>
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < sortedAndFilteredData.length
                    }
                    checked={
                      selectedRows.length === sortedAndFilteredData.length
                    }
                    onChange={() =>
                      selectedRows.length === sortedAndFilteredData.length
                        ? setSelectedRows([])
                        : setSelectedRows(
                            sortedAndFilteredData.map((_, index) => index)
                          )
                    }
                  />
                </TableCell>
                {fieldNames.map((fieldName) => (
                  <TableCell
                    key={fieldName}
                    sx={{
                      // display: "flex",
                      // flexDirection: "column",
                      color: "#212b4b",
                      fontWeight: 700,
                      fontSize: "17px",
                      maxHeight: "100px",
                      overflowY: "auto", // Use overflowY to enable vertical scrolling
                      whiteSpace: "normal",
                      border: "1px solid black",
                      textAlign: "center",
                    }}
                  >
                    {capitalizeAndReplaceUnderscore(fieldName)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {sortedAndFilteredData.map((rowData: any, index: number) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      color: "#212b4b",
                      fontWeight: 600,
                      fontSize: "13px",
                      maxHeight: "100px",
                      overflowY: "auto",
                      whiteSpace: "normal",
                      border: "1px solid black",
                      textAlign: "center",
                      verticalAlign: "top",
                    }}
                  >
                    <Checkbox
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </TableCell>
                  {fieldNames.map((fieldName) => (
                    <TableCell
                      key={fieldName}
                      sx={{
                        color: "#212b4b",
                        fontWeight: 600,
                        fontSize: "13px",
                        maxHeight: "100px",
                        overflowY: "auto",
                        whiteSpace: "normal",
                        border: "1px solid black",
                        textAlign: "center",
                        verticalAlign: "top",
                      }}
                    >
                      {Array.isArray(rowData[fieldName])
                        ? rowData[fieldName].join(", ")
                        : String(rowData[fieldName])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <span
          style={{
            fontSize: "30px",
            fontWeight: 700,
            color: "#212b4b",
            margin: "10px",
          }}
        >
          Videos Selected Earlier with Similar Description
        </span>
        <Box
          sx={{
            height: "100px",
            display: "flex",
            flexDirection: "column",
            // background: "red",
            alignItems: "center",
            padding: "10px",
            color: "#212b4b",
          }}
        >
          <span style={{ fontSize: "25px", fontWeight: 500 }}>
            Coming Soon!
          </span>
          <Box>
            <Button
              sx={{
                fontWeight: 700,
                marginTop: "20px",
                background: "#ff609b",
              }}
              variant="contained"
              size="large"
              // color="secondary"
            >
              Download CSV
              <FileDownloadIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Videolist;
