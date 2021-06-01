import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom"
import axios from "axios";
import UserContext from "../../Context/UserContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext)
    const history = useHistory();

    function AttemptToLogin() {
        setLoading(true)
        const body = {
            email,
            password,
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in", body);
        request.then(({ data }) => {
            console.clear();
            const userData = {
                token: data.token,
                avatar: data.user.avatar,
                username: data.user.username,
                email: data.user.email,
                id: data.user.id,
            };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            history.push("/timeline");
        });
        request.catch((error) => {
            setEmail("");
            setPassword("");
            setLoading(false)
            if (email === "" || password === "") {
                alert("Preencha todos os campos!");
                return
            }
            if (error.response.status === 403) {
                alert("Email/senha incorretos");
            }
        });
    }

    return (
        <MainContainer>
            <ContainerText>
                <h1>linkr</h1>
                <p>Save, share and discover</p>
                <p>the best links on the web</p>
            </ContainerText>
            <InputsContainer>
                <Input type="email" value={email} disabled={loading} onKeyPress={(e) => { if (e.code === "Enter") { AttemptToLogin() } }} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail"></Input>
                <Input type="password" value={password} disabled={loading} onKeyPress={(e) => { if (e.code === "Enter") { AttemptToLogin() } }} onChange={(e) => setPassword(e.target.value)} placeholder="password"></Input>
                <Button disabled={loading} onClick={AttemptToLogin}>Log In</Button>
                <Link to={"/signup"}>
                    <p>First time? Create an account!</p>
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
        font-family: "Oswald";
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

export default Login
