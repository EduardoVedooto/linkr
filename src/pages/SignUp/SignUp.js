import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';


function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function Register(){
        setLoading(true);
        const body = {
            email,
            password,
            username,
            pictureUrl,   
        }
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up", body);
        request.then(()=> {history.push("/")});
        request.catch((error)=>{setLoading(false)
            if(email === "" || password === "" || pictureUrl === "" || username === ""){
                alert("Preencha os campos");
                return
            }
            if(error.response.status === 400){
                alert("Imagem inválida!")
            }
            if(error.response.status === 403){
                alert("Endereço de email já cadastrado")
            }


        });
    }

    return(
        <MainContainer>
            <ContainerText>
                <h1>linkr</h1>
                <p>Save, share and discover</p>
                <p>the best links on the web</p>
            </ContainerText>
                <InputsContainer>
                    <Input type="email" value={email} disabled={loading} onKeyPress={(e)=>{if(e.code==="Enter"){Register()}}} onChange={(e)=>setEmail(e.target.value)} placeholder="e-mail"></Input>
                    <Input type="password" value={password} disabled={loading} onKeyPress={(e)=>{if(e.code==="Enter"){Register()}}} onChange={(e)=>setPassword(e.target.value)} placeholder="password"></Input>
                    <Input type="text" value={username} disabled={loading} onKeyPress={(e)=>{if(e.code==="Enter"){Register()}}} onChange={(e)=>setUsername(e.target.value)} placeholder="username"></Input>
                    <Input type="url" value={pictureUrl} disabled={loading} onKeyPress={(e)=>{if(e.code==="Enter"){Register()}}} onChange={(e)=>setPictureUrl(e.target.value)} placeholder="picture url"></Input>
                    <Button disabled={loading} onClick={()=>Register()} >Sign Up</Button>
                    <Link to={"/"}>
                        <p>Switch back to log in</p>
                    </Link>
                </InputsContainer>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    display: flex;
    @media(max-width: 600px) {
        flex-direction: column;
        height: 100vh;
  }
`

const ContainerText = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #151515;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 15%;
    font-family: "Passion One";
    font-weight: 700;
    color: #fff;
    h1{
        font-size: 106px;
        letter-spacing: 5px;
    }
    p{
        font-family: "Oswald";
        font-size: 43px;
        padding-top: 10px;
    }
    @media(max-width: 600px) {
        min-height: 30%;
        align-items: center;
        padding: 0px;
        h1{
            font-size: 76px;
            padding-top: 15px;
        }
        p{
            font-weight: 700;
            font-size: 23px;
        }
        p:last-child{
            padding-bottom: 25px;
        }
    }     
`
const InputsContainer = styled.div`
    width: 55%;
    max-width: 600px;
    min-height: 100vh;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p{
        color: #fff;
        padding-top: 10px;
        border-bottom: 1px solid #fff;
        padding-bottom: 2px;
    }
    :disabled{
        background-color: #f2f2f2;
    }
    @media(max-width: 600px){ 
        width: 100%;
        min-height: 70%;
        justify-content: start;
        padding-top: 40px;
    }
`

const Input = styled.input`
    height: 65px;
    width: 80%;
    font-size: 27px;
    font-family: "Oswald";
    font-weight: 700;
    color: #9F9F9F;
    border-radius: 6px;
    margin-bottom: 10px;
    padding-left: 10px;
`

const Button = styled.button`
    width: 80%;
    height: 65px;
    background-color: #1877f2;
    border-radius: 6px;
    font-family: "Oswald";
    font-weight: 700;
    color: #fff;
    font-size: 27px;
    border: none;
`

export default SignUp