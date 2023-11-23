import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import  { useEffect } from 'react';
import axios from 'axios'


const Hierarchy = ({user})=>{

    const hierarchy = ['CEO','Engineering Manager','Project Manager', 'Senior Developer','Junior Developer','Intern']
    const [people1,setPoeple1] = useState([])
    const  [people,setPeople] = useState([
        {
            id: 1,
            name: "M jawad",
            position: "Project Manager" 
        },
        {
            id: 2,
            name: "M shoaib",
            position: "Project Manager" 
        },
        {
            id: 3,
            name: "M Haris",
            position: "Engineering Lead" 
        },
        {
            id: 4,
            name: "M kummail",
            position: "Intern" 
        },
        {
            id: 5,
            name: "Rehan",
            position: "Intern" 
        },
        {
            id: 6,
            name: "M jawad",
            position: "senior Mern Developer" 
        },
        {
            id: 7,
            name: "M Daniyal",
            position: "Engineering Manager" 
        },
        {
            id: 8,
            name: "M Kashif",
            position: "Senior Developer" 
        },
        {
            id: 9,
            name: "M kamran",
            position: "Intern" 
        },

    ])
    useEffect(()=>{
        axios.get('http://localhost:3333/show-users',{
            withCredentials:true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        })
        .then((res)=>{
           setPoeple1(res.data.users)
        })
   },[])

    return(
        <>
         <NavBar user = {user}/>
            <Grid container flexDirection = {'column'}  justifyContent={'center'} alignItems={'center'}  >
                {
                    hierarchy.map((item,index)=>{
                        return(
                            < >
                            <Divider  orientation="vertical" flexItem />
                            <Grid container  key={index} sx={{marginTop:"30px"}} alignItems={'center'} justifyContent={'center'} >
                                <Grid container flexDirection={'column'} >
                                    <Grid>
                                       <h3  style = {{backgroundColor:"skyblue",color:"white",padding:"10px",borderRadius:"10px"}}>{item}</h3> 
                                    </Grid>
                                    <Grid container flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                                    {
                                    people1.map((i,index)=>{
                                        if(i.position==item){
                                            return(
                                                <Grid  key = {index} sx = {{border:"2px solid black",borderRadius:"10px",margin:"10px",padding:"10px"}}>
                                                    <h5>{i.firstname  } {i.lastname}</h5>
                                                    {/* <h5>{i.position}</h5> */}
                                                </Grid>
                                            )
                                        }
                                    })
                                }
                                    </Grid>
                                </Grid>
                            </Grid>
                            </>
                        )
                    })
                }
                <Grid>

                </Grid>
                
            </Grid>
           
        </>
    )
}
export default Hierarchy