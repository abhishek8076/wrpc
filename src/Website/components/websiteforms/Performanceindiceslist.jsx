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
import { MenuItem } from "@mui/material";
import {CSmartTable} from '@coreui/react-pro'

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

  const utilities=[
    { label: "MSETCL", value: "MSETCL" },
    { label: "MPPTCL", value: "MPPTCL" },
    { label: "GETCO", value: "GETCO" },
    { label: "CSPTCL", value: "CSPTCL" },
    { label: "GED (Goa)", value: "GED (Goa)" },
    { label: "DD", value: "DD" },
    { label: "DNH", value: "DNH" },
    { label: "POWER GRID WR1", value: "POWER GRID WR1" },
    { label: "POWER GRID WR2", value: "POWER GRID WR2" },
    { label: "NTPC", value: "NTPC" },
    { label: "KAPS 1&2", value: "KAPS 1&2" },
    { label: "KAPS 3&4", value: "KAPS 3&4" },
    { label: "TAPS 1&2", value: "TAPS 1&2" },
    { label: "TAPS 3&4", value: "TAPS 3&4" },
    { label: "AESL", value: "AESL" },
    { label: "INDIGRID", value: "INDIGRID" },
    { label: "AEML", value: "AEML" },
    { label: "ADANI IPPS", value: "ADANI IPPS" }];

    const columns=[
      {
        key:"ut",
        label:"Utility"
      },
      {
        key:"nc",
        label:"Number of correct operations at internal power system faults (Nc)"
      },
      {
        key:"nu",
        label:"Number of unwanted operations (Nu)",
      },
      {
        key:"nf",
        label:"Number of failures to operate at internal power system faults(Nf)",
      },
      {
        key:"ni",
        label:"Number of incorrect operations (Ni=Nf+Nu)",
      },
      {
        key:"d",
        label:"The Dependability Index(D=Nc/(Nc+Nf)",
      },
      {
        key:"s",
        label:"The Security Index(S=Nc/(Nc+Nu)",
      },
      {
        key:"r",
        label:"The Reliability Index (R=Nc/(Nc+Ni))",
      }
    ];

    const datas=[{
      ut:"",
      nc:"",
      nu:"",
      nf:"",
      ni:"",
      d:"",
      s:"",
      r:"",
    }];

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
            <div className="date-sec">
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
            {utilities.map((option)=>(
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
            </TextField>
              </div>
            </div>

            <CSmartTable columns={columns} items={datas} />
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
