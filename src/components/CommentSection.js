import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../Context/UserContext";
import { FiSend } from 'react-icons/fi';
import axios from "axios";


function CommentSection({updateList ,post, setShowComments, showComments, eachComments}){
    const {user} = useContext(UserContext);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setShowComments(false)
    },[]) //eslint-disable-line

    function SendComment(){
        setLoading(true)
        const body = {
            text,
        }
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/comment`, body, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        request.then((response)=>{setLoading(false);updateList();setText("")});
        request.catch(()=> alert("Comentário não enviado, por favor tente novamente!"));
    }

    return(
    <Comment showComments={showComments}>
        {eachComments.map((c,i)=>
            <CommentPost key={i}>
                <img src={c.user.avatar} alt={c.user.username}></img>
                <EachMessage>
                    <h1>{c.user.username}</h1>
                    <p>{c.text}</p>
                </EachMessage>
            </CommentPost>
        )}
        <InputTab>
            <img src={user.avatar} alt={user.avatar}></img>
            <Input disabled={loading} onKeyPress={(e) => { if (e.code === "Enter") {SendComment()}}} value={text} onChange={(e)=>setText(e.target.value)} placeholder="write a comment..." ></Input>
            <SendButton onClick={()=>SendComment()} >
                <FiSend 
                    color= "#fff"
                    fontSize="20px"
                />
            </SendButton>
        </InputTab>
    </Comment>
    )
}

const Comment = styled.div`
    display: ${props=> props.showComments ? "flex" : "none"};
    flex-direction: column;
    img{
        width: 39px;
        height: 39px;
        border-radius: 50px;
    }
`

const CommentPost = styled.div`
    display: flex;
    width: 611px;
    padding: 10px 0px 10px 25px;
    border-bottom: 1px solid #353535;

`

const EachMessage = styled.div`
    padding-left: 18px;
    font-family: Lato;
    word-break: break-all;
    h1{
        color: #F3F3F3;
        font-weight: 700;
    }
    p{
        color: #ACACAC;
        font-weight: 400;
        padding-right: 10px;
    }
`
const InputTab = styled.div`
    display: flex;
    padding: 10px 0px 10px 24px;
    position: relative;
`

const Input = styled.input`
    width: 510px;
    height: 39px;
    background-color: #252525;
    outline: none;
    border: none;
    font-family: Lato;
    margin: 0px auto;
    color: #ACACAC;
    padding-left: 15px;
    border-radius: 8px;
    padding-right: 40px;
    ::placeholder{
        font-style: italic;
        font-size: 14px;
        color: #575757;
    }
    :disabled{
        background-color: grey;
    }
`

const SendButton = styled.div`
    position: absolute;
    right: 30px;
    top: 22px;
`


export default CommentSection