import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LeaveManagementDialogRadioButton from './LeaveManagementDialogRadioButton';


export default function LeaveManagementDialog({open,projects,current,totalLeaves,handleClose,handleSubmit,status,days,reason,handleChangeStatus,handleChangeReason,handleChangeDays}) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  
  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Leave Details</DialogTitle>
        <DialogContent>
          {
            projects?(
              projects.length > 0 ? (
                projects.map((item,i)=>{
                  return(
                    <div key={i}>
                       <h4>Current Project: {item.title} </h4>
                       <h4>Project Manager: {item.manager}</h4>     
                    </div>
                  )
                })
              ):(
                <div>
                <h4>No Projects assigned</h4>
              </div>
              )
            
            ):(
              <div>
                <h4>Loading</h4>
              </div>
            )
           
          }
           
            <h4>Total leaves : {totalLeaves} </h4>
            
            <LeaveManagementDialogRadioButton status = {status} handleChange = {handleChangeStatus} />
            {
              status ==='Absent'? (
                <>
                <div style={{display:"flex" ,flexDirection:"row",width:"50%",justifyContent:"space-between",alignItems:"center"}}>
                <h4>Reason of Leave : </h4>
                <TextField  value={reason} onChange = {(e)=> handleChangeReason(e) }  id="outlined-basic" size='small' label="Reason" variant="outlined" />
                </div>
                <div style={{display:"flex" ,flexDirection:"row",width:"50%",justifyContent:"space-between",alignItems:"center"}}>
                <h4>Days of Leave : </h4>
                <TextField  type={'number'} value={days}  onChange = {(e)=> handleChangeDays(e) } id="outlined-basic" size='small' label="Days" variant="outlined" />
                </div>  
                </>  
              ):(
                <></>
              )
            }  
            
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}