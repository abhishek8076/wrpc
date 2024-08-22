import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import apiClient from "../../../Api/ApiClient";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { CmsFooter } from "../../components/Footer/CmsFooter";
import { BASE_URL } from "../../../Api/ApiFunctions";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { CFormSelect } from "@coreui/react";
import { MenuItem } from "@mui/material";

export const PerformanceList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/api/PerformanceIndices");
        const dataWithIds = response.data.map((row, index) => ({
          id: index + 1,
          ...row,
        }));
        setData(dataWithIds);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const options=[
    { label: "MSETCL", value: "1" },
    { label: "MPPTCL", value: "2" },
    { label: "GETCO", value: "3" },
    { label: "CSPTCL", value: "4" },
    { label: "GED (Goa)", value: "5" },
    { label: "DD", value: "6" },
    { label: "DNH", value: "7" },
    { label: "POWER GRID WR1", value: "8" },
    { label: "POWER GRID WR2", value: "9" },
    { label: "NTPC", value: "10" },
    { label: "KAPS 1&2", value: "11" },
    { label: "KAPS 3&4", value: "12" },
    { label: "TAPS 1&2", value: "13" },
    { label: "TAPS 3&4", value: "14" },
    { label: "AESL", value: "15" },
    { label: "INDIGRID", value: "16" },
    { label: "AEML", value: "17" },
    { label: "ADANI IPPS", value: "18" }];

  return (
    <>
      <div>
        <div>
          <TopHeader />
        </div>
        <CmsDisplay />
        <main>
          <div className="container mt-4 vh-100">
            <h4>Performance Indices List</h4>
            <div className="date-sec mb-5">
              <div className="col-md-4">
                <div className="date-main">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker", "DatePicker", "DatePicker"]}
                    >
                      <DatePicker
                        label={"Month and Year"}
                        views={["month", "year"]}
                        minDate={dayjs("2023-10-01")}
                        renderInput={(params) => <TextField {...params} />}
                        defaultValue={dayjs("2023-10-01")}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

              <div className="col-md-7">
              <TextField
              id="outlined-select-currency"
          select
          label="Utility"
          fullWidth>
            {options.map((option)=>(
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
            </TextField>
              </div>
            </div>
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Utility Name</th>
                        <th>Correct Operations</th>
                        <th>Unwanted Operations</th>
                        <th>Failures</th>
                        <th>Incorrect Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.utilityname}</td>
                            <td>{item.correct_operation}</td>
                            <td>{item.unwanted_operation}</td>
                            <td>{item.failures_operate}</td>
                            <td> {item.incorrect_operation ? (
                                    <a href={BASE_URL+item.filepath} target="_blank" rel="noopener noreferrer">
                                        {item.filepath}
                                    </a>
                                ) : (
                                    'No file'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}
          </div>
          <CmsFooter />
        </main>
      </div>
    </>
  );
};
