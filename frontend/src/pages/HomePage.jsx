import NavBar from "../components/NavBar"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import axios from 'axios'
import ProjectsTable from "../components/Projects";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CropEasy from "../components/ImageCrop/CropEasy";

axios.defaults.withCredentials = true
const HomePage = ({ user, getuser }) => {
    // const [user,setUser] = useState({})
    const [projects, setProjects] = useState([])
    const [cropOpen, setCropOpen] = useState(false);

    const handleClickOpen = () => {
        setCropOpen(true);
    };
    const handleClose = () => {
        setCropOpen(false);
    };

    useEffect(() => {


        async function getProjects() {
            const projects = await axios.get(`http://localhost:3333/projects/show`, {
                withCredentials: true,
                headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
            })
            setProjects(() => projects.data.projects)
        }
        getuser()
        getProjects()

    }, [])


    useEffect(() => {
        //-----------just for testing purposes------------------------------
        function b() {
            async function a() {
                console.log("aa")
                console.log(await axios.get(`http://localhost:3333/projects/show`, {
                    withCredentials: true,
                    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
                }), "lwkedm")
                console.log("d")
            }
            function main() {
                console.log("hye")
                a()
                console.log("hello")
            }
            main()
        }
        b()
        //-----------------------------------------

    }, [])
    return (
        <Box sx={{}}>

            <Grid container flexDirection={'row'} sx={{ margin: "100px 100px" }} justifyContent={'center'} alignItems={"center"}>
                <Grid lg={6}>
                    {/* <img src="profile.png" alt="profileimage" style={{borderRadius:"100%"}} /> */}
                    <div>
                        <div style={{ cursor: "pointer" }} >
                            <CropEasy refreshUser={getuser} cropOpen={cropOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />
                            <CameraAltIcon onClick={handleClickOpen} sx={{ position: "absolute", marginTop: "5px" }} />

                            <img style={{ width: "150px", height: "150px", borderRadius: "100%" }} src={user.image ? user.image : "https://res.cloudinary.com/dlgwvuu5d/image/upload/v1663106838/my-uploads/ppp_rufoeg.png"} alt="" />
                        </div>
                    </div>
                </Grid>
                <Grid lg={5}>
                    <Typography>Fiirstname : {user.firstname} </Typography>
                    <Typography>Lastname : {user.lastname} </Typography>
                    <Typography>Email : {user.email} </Typography>
                    <Typography>DOB : 10/10/1999 </Typography>
                    <Typography>joining Date : 02/03/2023 </Typography>
                    <Typography>leaves : 10 </Typography>
                </Grid>
            </Grid>
            <NavBar user={user} />
            <h2 style={{ marginLeft: "20px" }}>Projects</h2>
            <ProjectsTable projects={projects} />
        </Box>
    )
}
export default HomePage