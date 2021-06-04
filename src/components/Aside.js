import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components"

function Aside({user, posts}){
    const [hastagsList, setHastagsList] = useState([]);
    const [hashtag, setHashtag] = useState("");
    const history = useHistory();
   
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

function goToHashtag(){
    history.push(`/hashtag/${hashtag.replace("#", "")}`);
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
            {hastagsList.length ? 
            <Input value={hashtag} onKeyPress={(e)=>{if(e.code==="Enter") {goToHashtag()}}} onChange={(e)=>setHashtag(e.target.value)} placeholder="type a hashtag"></Input>
        : ""}
        {hastagsList.length ? <h3>#</h3> : ""}        
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
    position: fixed;
    left: 0;
    right: 0;
    margin: 0px 45% 0px 65%;
    h1{
        font-family: "Oswald";
        font-weight: 700;
        font-size: 27px;
        padding: 15px 0px 15px 20px;
    }

    p{
        padding-top: 9px;
        padding-left: 20px;
        font-family: "Lato";
        font-weight: 700;
        font-size: 19px;
        letter-spacing: 0.5px;
    }
    h3{
        position: absolute;
        bottom: 26px;
        font-size: 19px;
        left: 30px;
    }
    @media(max-width: 955px){
        display: none;
    }
`
const Border = styled.div`
    background-color: #484848;
    width: 301px;
    height: 1px;
    margin-bottom: 5px;
`

const Input = styled.input`
    width: 269px;
    height: 35px;
    border: none;
    border-radius: 8px;
    background-color: #252525;
    margin-left: 18px;
    margin-top: 10px;
    color: #fff;
    outline: none;
    font-family: Lato;
    font-weight: 400;
    padding-left: 35px;
    padding-bottom: 3px;
    font-style: italic;
    font-size: 16px;
    ::placeholder{
        color: #fff;
        font-family: Lato;
        font-weight: 400;
        font-style: italic;
        font-size: 16px;
    }
`


export default Aside