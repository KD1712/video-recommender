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
import { useEffect, useRef, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import data from "./data.json";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";

interface Video {
  "Channel Name": string;
}

const Videolist: React.FC = () => {
  const { state } = useLocation();
  const tableRef = useRef<HTMLTableElement>(null);
  // const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderBy, setOrderBy] = useState<string>("title");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [filterChannel, setFilterChannel] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(state);
  const [selectedPublishedTimes, setSelectedPublishedTimes] = useState<
    string[]
  >([]);
  // const [selectedRowData, setSelectedRowData] = useState<Array<string>>([]);

  useEffect(() => {
    // console.log(selectedPublishedTimes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPublishedTimes]);
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [filterChannel]);
  const sortData = (columnName: string) => {
    const isAsc = orderBy === columnName && order === "asc";
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[columnName];
      const valueB = b[columnName];

      if (isAsc) {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    });

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnName);
    setData(sortedData);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const newFilterChannel = event.target.value as string;

    // Find the indexes of rows with the selected filter channel
    const newSelectedRows = sortedAndFilteredData.reduce(
      (acc, rowData, index) => {
        // Explicitly cast rowData to 'any' type to access specific properties
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyRowData = rowData as any;

        if (anyRowData["Channel Name"] === newFilterChannel) {
          acc.push(index);
        }
        return acc;
      },
      [] as number[]
    );

    // Update filter channel
    setFilterChannel(newFilterChannel);

    if (newFilterChannel !== "") {
      // If filtering to a specific channel, maintain existing selected rows and published times
      const existingSelectedRows = [...selectedRows];
      const existingPublishedTimes = [...selectedPublishedTimes];

      // Select checkboxes for existing published times that are also in the new filter channel
      const selectedInFilter = existingSelectedRows.filter((index) =>
        newSelectedRows.includes(index)
      );

      setSelectedRows(selectedInFilter);
      setSelectedPublishedTimes(
        selectedInFilter.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (index) => (sortedAndFilteredData[index] as any)["Published Time"]
        )
      );
      setSelectedPublishedTimes(existingPublishedTimes);
    } else {
      // If changing from a specific channel to "All," maintain existing selected rows and published times
      const existingSelectedRows = [...selectedRows];
      const existingPublishedTimes = [...selectedPublishedTimes];

      if (newFilterChannel === "") {
        // Select checkboxes for existing published times when filtering back to "All"
        setSelectedRows(existingSelectedRows);
        setSelectedPublishedTimes(existingPublishedTimes);
      }
    }
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
  // const handleRowSelect = (index: number) => {
  //   const selectedRowIndex = selectedRows.indexOf(index);
  //   const isSelected = selectedRowIndex !== -1;

  //   let newSelected: number[] = [];

  //   if (isSelected) {
  //     // Remove the item from selectedRows
  //     newSelected = [
  //       ...selectedRows.slice(0, selectedRowIndex),
  //       ...selectedRows.slice(selectedRowIndex + 1),
  //     ];
  //   } else {
  //     // Add the item to selectedRows
  //     newSelected = [...selectedRows, index];
  //   }

  //   setSelectedRows(newSelected);

  //   // Log the Published Time of the selected row
  //   const selectedRowData = sortedAndFilteredData[index];
  //   if ("Published Time" in selectedRowData) {
  //     console.log("Published Time:", selectedRowData["Published Time"]);
  //   }
  // };
  const handleRowSelect = (index: number) => {
    const isSelected = selectedRows.includes(index);
    let newSelected: number[] = [];

    if (isSelected) {
      // Remove the item from selectedRows and its published time from the state
      newSelected = selectedRows.filter((item) => item !== index);
      setSelectedPublishedTimes((prevPublishedTimes) =>
        prevPublishedTimes.filter((_, i) => i !== index)
      );
    } else {
      // Add the item to selectedRows and its published time to the state
      newSelected = [...selectedRows, index];
      setSelectedPublishedTimes((prevPublishedTimes) => [
        ...prevPublishedTimes,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sortedAndFilteredData[index] as any)["Published Time"],
      ]);
    }

    setSelectedRows(newSelected);

    // Log the Published Time of the selected row
    const selectedRowData = sortedAndFilteredData[index];
    if ("Published Time" in selectedRowData) {
      // console.log("Published Time:", selectedRowData["Published Time"]);
    }
    // console.log(selectedRowData["Channel Name"]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDuration = (durationString: any) => {
    const duration = durationString.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = duration[1] ? parseInt(duration[1], 10) : 0;
    const minutes = duration[2] ? parseInt(duration[2], 10) : 0;
    const seconds = duration[3] ? parseInt(duration[3], 10) : 0;

    const formattedDuration =
      (hours > 0 ? hours + "hour " : "") +
      (minutes > 0 ? minutes + "min " : "") +
      (seconds > 0 ? seconds + "sec" : "");

    return formattedDuration.trim();
  };

  // const handleLogSelectedRows = () => {
  //   const selectedRowsData = selectedRows.map((index) => {
  //     const rowData = sortedAndFilteredData[index];
  //     // Check if the property exists before accessing it
  //     if ("Published Time" in rowData) {
  //       return rowData["Published Time"];
  //     }
  //     return null;
  //   });

  //   console.log("Selected Rows Published Time:", selectedRowsData);
  // };
  // const handleSelectAllRows = () => {
  //   const allRowsSelected =
  //     selectedRows.length === sortedAndFilteredData.length;

  //   if (allRowsSelected) {
  //     // Deselect all rows
  //     setSelectedRows([]);
  //     setSelectedPublishedTimes([]);
  //   } else {
  //     // Select all rows
  //     const allRowIndexes = Array.from(
  //       { length: sortedAndFilteredData.length },
  //       (_, i) => i
  //     );
  //     setSelectedRows(allRowIndexes);

  //     // Add corresponding published times to the array
  //     const allPublishedTimes = sortedAndFilteredData.map(
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       (rowData) => (rowData as any)["Published Time"]
  //     );
  //     setSelectedPublishedTimes(allPublishedTimes);
  //   }
  // };
  // const handleSelectAllRows = () => {
  //   const allRowsSelected =
  //     selectedRows.length === sortedAndFilteredData.length;

  //   // Check if a channel filter is applied
  //   if (filterChannel !== "") {
  //     if (allRowsSelected) {
  //       // If all rows are selected, remove rows of the filtered channel from the published times array
  //       const updatedPublishedTimes = selectedPublishedTimes.filter((time) => {
  //         const index = sortedAndFilteredData.findIndex(
  //           (rowData) =>
  //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //             (rowData as any["Published Time"]) === time &&
  //             rowData["Channel Name"] === filterChannel
  //         );
  //         return index === -1;
  //       });
  //       setSelectedPublishedTimes(updatedPublishedTimes);
  //     } else if (selectedRows.length > 0) {
  //       // If some rows are selected (indeterminate condition),
  //       // add rows of the filtered channel to the published times array
  //       const newPublishedTimes = sortedAndFilteredData
  //         .filter(
  //           (rowData, index) =>
  //             selectedRows.includes(index) &&
  //             rowData["Channel Name"] === filterChannel
  //         )
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         .map((rowData) => rowData as any["Published Time"] as string);

  //       setSelectedPublishedTimes((prevPublishedTimes) => [
  //         ...prevPublishedTimes,
  //         ...newPublishedTimes,
  //       ]);
  //     } else {
  //       // If no rows are selected, add all rows of the filtered channel to the published times array
  //       const allPublishedTimes = sortedAndFilteredData
  //         .filter((rowData) => rowData["Channel Name"] === filterChannel)
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         .map((rowData) => rowData as any["Published Time"] as string);

  //       setSelectedPublishedTimes(allPublishedTimes);
  //     }
  //   }
  // };
  const handleDownloadData = () => {
    // Assuming data is an array containing all video data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectedData = data.filter((video: any) =>
      selectedPublishedTimes.includes(video["Published Time"])
    );
    const csvData = Papa.unparse(selectedData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    // Create a download link and trigger a click to download the file
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "selected_data.csv";
    a.click();

    // Log the selected data as JSON
    // console.log(JSON.stringify(selectedData, null, 2));
    // You can replace the console.log with your download logic
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
              marginLeft: "10px",
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

        <TableContainer
          ref={tableRef}
          sx={{ maxHeight: "400px", overflow: "auto" }}
        >
          <Table>
            <TableHead
              sx={{
                background: "#bcbfc9",
                margin: 0,
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    width: "50px",
                    border: "1px solid black",
                    color: "#212b4b",
                    fontWeight: 700,
                    fontSize: "17px",
                    maxHeight: "100px",
                    overflowY: "auto",
                    whiteSpace: "normal",
                    textAlign: "center",
                  }}
                >
                  {/* <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < sortedAndFilteredData.length
                    }
                    checked={
                      selectedRows.length === sortedAndFilteredData.length
                    }
                    onChange={handleSelectAllRows}
                  /> */}
                  Select to Download
                </TableCell>
                {fieldNames.map((fieldName) => (
                  <TableCell
                    key={fieldName}
                    sx={{
                      color: "#212b4b",
                      fontWeight: 700,
                      fontSize: "17px",
                      maxHeight: "100px",
                      overflowY: "auto",
                      whiteSpace: "normal",
                      border: "1px solid black",
                      textAlign: "center",
                      cursor: [
                        "Comments Count",
                        "View Count",
                        "Like Count",
                        "Duration",
                        "Avg Sentiment Score",
                        "similarity_score",
                      ].includes(fieldName)
                        ? "pointer"
                        : "default",
                    }}
                    onClick={() =>
                      [
                        "Comments Count",
                        "View Count",
                        "Like Count",
                        "Duration",
                        "Avg Sentiment Score",
                        "similarity_score",
                      ].includes(fieldName)
                        ? sortData(fieldName)
                        : null
                    }
                  >
                    {capitalizeAndReplaceUnderscore(fieldName)}

                    {[
                      "Comments Count",
                      "View Count",
                      "Like Count",
                      "Duration",
                      "Avg Sentiment Score",
                      "similarity_score",
                    ].includes(fieldName) && " ⬆️⬇️"}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {sortedAndFilteredData.map((rowData: any, index: any) => (
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
                      // checked={selectedRows.includes(index)}
                      checked={selectedPublishedTimes.includes(
                        rowData["Published Time"]
                      )}
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
                      {fieldName === "Duration"
                        ? Array.isArray(rowData[fieldName])
                          ? rowData[fieldName].map(
                              (durationString: string, index: number) => (
                                <div key={index}>
                                  {formatDuration(durationString)}
                                </div>
                              )
                            )
                          : formatDuration(rowData[fieldName])
                        : Array.isArray(rowData[fieldName])
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
              // onClick={downloadCSV}
              onClick={handleDownloadData}
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
