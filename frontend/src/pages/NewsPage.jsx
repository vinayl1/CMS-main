import { useEffect } from "react"
import NavBar from "../components/NavBar"
import axios from 'axios'
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const NewsPage = ({user})=>{
        const [news,setNews] = useState(null)
    useEffect(()=>{
        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: {q: '<REQUIRED>', freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
            headers: {
              'X-BingApis-SDK': 'true',
              'X-RapidAPI-Key': '7333042294mshccf262fd41bdb78p1daf5ajsn155b40f9549c',
              'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
          };
          
          
          axios.request(options).then(function (response) {
              console.log("--------------->",response.data.value);
              setNews(response.data.value)

          }).catch(function (error) {
              console.error(error);
          });
    },[])
    return(
        <>
        <NavBar user={user}/>
        <h2 style={{textAlign:"center"}}>News</h2>
        <Grid container justifyContent={'center'} spacing={3}>
            {
                news? (
                    news.length != 0 ?(
                      news.map((item,index)=>{
                        return (
                            <Grid  key={index}  lg ={8}  sx = {{width:"500px",border:'2px solid black',margin:"10px"}} >
                                <h2>{item.name}</h2>
                                <h3>{item.description}</h3>
                                <a href={item.url}>{item.url}</a>
                                <h3>{new Date(item.datePublished).toDateString()}</h3>
                                
                            </Grid>
                        )
                      })
                    ):(
                        <h2>NO data to show</h2>
                    ) 
                ):(
                    <div>
                    <CircularProgress />
                    </div>
                )
            }    
        </Grid>

        </>
    )
}
export default NewsPage