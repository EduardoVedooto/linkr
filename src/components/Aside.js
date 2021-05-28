import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components"

function Aside({user, posts}){
    const [hastagsList, setHastagsList] = useState([]);
   
    useEffect(()=>{
        updateTrending()
    }, [posts]) //eslint-disable-line

function updateTrending(){
    const config ={
        headers:{
            "Authorization": `Bearer ${user.token}`
        }
    }
    const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending", config)
    request.then((response)=>{setHastagsList(response.data.hashtags)})
}

    return(
        <Container>
            <h1>trending</h1>
            <Border></Border>
            { hastagsList.length ? 
            hastagsList.map((h,i)=>
                <Link key={i} to={`/hashtag/${h.name}`}>
                    <p># {h.name}</p>
                </Link>
            ): <h1>Error!</h1> }
        </Container>
    )
}

const Container = styled.div`
    background-color: #171717;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;
    width: 301px;
    height: 406px;
    border-radius: 16px;
    text-align: center;

    h1{
        font-family: "Oswald";
        font-weight: 700;
        font-size: 27px;
        padding: 15px 0px 20px 20px;
    }

    p{
        padding-top: 10px;
        padding-left: 20px;
        font-family: "Lato";
        font-weight: 700;
        font-size: 19px;
        letter-spacing: 0.5px;
    }
    @media(max-width: 915px){
        display: none;
    }
`
const Border = styled.div`
    background-color: #484848;
    width: 301px;
    height: 1px;
    margin-bottom: 15px;
`


export default Aside