import { useParams, Link } from "react-router-dom";
import { Tick } from 'react-crude-animated-tick';
import { useEffect, useState } from "react";
import axios from "axios";
const VerifyUser = ()=>{
    const [validUrl, setValidUrl] = useState(false);
	const param = useParams();

    useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:3333/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, []);



    return(
       
            <>
			{validUrl ? (
				<div >
					<div style={{backgroundColor:"white",width:"50%",padding:"10px",position:"absolute",right:"0px",top:"150px"}}>
					<h1 style={{color:"#5cdb95"}}><span><Tick size={100}  /></span>Email verified successfully</h1>
					<Link   to="/login">
						<button  style={{width:"100px",height:"50px",cursor:"pointer",fontWeight:"bold",color:"white",backgroundColor:"#5cdb95",fontSize:"15px"}} >Login</button>
					</Link>
                    </div>
                    <div style={{height:"721px",width:"45%",backgroundColor:"#5cdb95",display:"flex"}}>
            <h1 style={{color:"white",margin:"auto",fontWeight:"bold",fontSize:"80px",fontFamily:"sans-serif"}} >IBlogs</h1><br />
            
        </div>
				</div>
                
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
        
    )
}
export default  VerifyUser;