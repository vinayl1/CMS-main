import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LeaveManagementDialog from './LeaveManagementDialog';
import Grid2 from '@mui/material/Unstable_Grid2'
import axios from 'axios';
import DateSnackbar from './DateSnackbar';


const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export default function LeaveManagementTable({ userId, projects, reports, refreshReports }) {

  const [openSnack, setOpenSnack] = React.useState(false);

  const [reason, setReason] = React.useState("")
  const [days, setDays] = React.useState("0")
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('Present');
  const [current, setCurrent] = React.useState(0);
  const [totalLeaves, setTotalLeaves] = React.useState(0)
  const [dayCount, setDayCount] = React.useState([]);
  const [row, setRow] = React.useState(0);

  const handleClose = () => {
    //------------ to clean dialog input fields----------------------
    setStatus('Present')
    setReason("")
    //----------------------------------
    setOpen(false);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeReason = (event) => {
    setReason(event.target.value)
  }
  const handleChangeDays = (event) => {
    setDays(event.target.value)
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const handleSubmit = () => {

    const data = {
      row: row,
      status: status,
      reason: status == "Absent" ? reason : "",
      days: status == "Absent" ? days : "0"

    }
    setOpen(false);

    axios.post(`http://localhost:3333/leaveManagement/add`, data, {
      withCredentials: true,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    })
      .then((res) => {
        refreshReports()
        //------------ to clean dialog input fields----------------------
        setStatus('Present')
        setReason("")
        setDays("0")
        //----------------------------------
      }).catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    const getAllDaysInMonth = (month, year) =>
      Array.from(
        { length: new Date(year, month, 0).getDate() },
        (_, i) => new Date(year, month - 1, i + 1)
      );

    setDayCount(getAllDaysInMonth((new Date().getMonth()) + 1, new Date().getFullYear()))

  }, [])


  React.useEffect(() => {
    function LeavesCounter() {

      var count = 0
      if (reports.length != 0) {
        reports.map((item) => {
          if (item.status == "Absent") {
            count = count + parseInt(item.DaysOfLeave)
          }
        })
      }
      setTotalLeaves(count)
    }
    LeavesCounter()

  }, [reports])
  return (
    <>
      <DateSnackbar handleCloseSnack={handleCloseSnack} open={openSnack} />
      <LeaveManagementDialog open={open} totalLeaves={totalLeaves} current={current} projects={projects} handleClose={handleClose} days={days} handleChangeDays={handleChangeDays} reason={reason} handleChangeReason={handleChangeReason} handleChangeStatus={handleChangeStatus} status={status} handleSubmit={handleSubmit} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Month</TableCell>
              <TableCell>Report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dayCount.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer", "&:hover": { backgroundColor: "grey", color: "white" }, padding: "20px" }}
                onClick={() => {
                  setCurrent(() => i + 1)
                  if (new Date().getDate() > i) {
                    reports.map((item) => {
                      if (new Date(item.date).getDate() == i + 1) {
                        setStatus(() => item.status)
                        setReason(() => item.reasonOfLeave)
                      }
                    })
                    setOpen(true)
                    setRow(() => i + 1)
                  } else {
                    setOpenSnack(true)
                  }
                }}
              >
                <TableCell sx={{ padding: "40px" }}  >
                  <Grid2 container flexDirection={"row"} justifyContent={"space-between"}>
                    <div>{month[new Date().getMonth()]} {i + 1}</div>
                  </Grid2>
                </TableCell>

                <TableCell>
                  {reports.map((item, index) => {
                    if (new Date(item.date).getDate() == i + 1) {
                      return (
                        <div key={index}>
                          <h4 > Status : {item.status} </h4>
                          {
                            item.status == "Absent" ? (
                              <>
                                <h4>Reason : {item.reasonOfLeave}</h4>

                              </>
                            ) : (
                              <>
                                {/* <h4></h4> */}
                              </>
                            )
                          }
                        </div>
                      )
                    }
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}