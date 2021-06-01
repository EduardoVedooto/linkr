import { useState, useContext } from "react";
import {MdRepeat} from 'react-icons/md';
import styled from "styled-components";
import Modal from "react-modal";
import axios from "axios";
import Loader from "react-loader-spinner";
import UserContext from "../Context/UserContext";


export default function RePost({post,updateList}){
const [clicked,setClicked]=useState(false);
const[isWaitingServer,setIsWaitingServer]=useState(false);
const { user } = useContext(UserContext);


    function handleRePost(){
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/share`, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
    promise.then(() => {
        console.log("foi");
        updateList();
        setIsWaitingServer(false);
        setClicked(false);
    });
    promise.catch(error => {
        setIsWaitingServer(false);
        setClicked(false);
        setTimeout(() => {
            window.alert(` ${error.response.status} - ${error.response.statusText}\n${error.response.data.message}`);
        }, 100);
    })
}


return (
    <>
    
    <Container>
    <MdRepeat fontSize="20px"
    onClick={() => setClicked(true)} />
    <div>{post.repostCount} re-posts</div>
    </Container>
    
        <Modal
            isOpen={clicked}
            className="Modal"
            overlayClassName="Overlay"

        >
            <ModalContent isWaitingServer={isWaitingServer}>
                {isWaitingServer ?
                    <ModalLoading>
                        <Loader
                            type="Rings"
                            color="#1877F2"
                            height={75}
                            width={75}
                        />
                        Carregando...
                    </ModalLoading>
                    :
                    <h3>Do you want to re-post
                    <br />this link?</h3>
                }
                <div className="buttons">
                    <button disabled={isWaitingServer} onClick={() => setClicked(false)}>No, cancel</button>
                    <button disabled={isWaitingServer} className="confirm" onClick={handleRePost}>Yes, share!</button>
                </div>
            </ModalContent>
        </Modal>

    
    </>
);
}

const Container = styled.div`
margin-top:22px;
display:flex;
flex-direction:column;
align-items:center;

.div{
font-family: Lato;
font-style: normal;
font-weight: normal;
font-size: 11px;
line-height: 13px;

color: #FFFFFF;
}

@media(max-width: 611px) {
    .div{
        font-size: 9px;
        line-height: 11px;
    }

}
`;

const ModalContent = styled.div`
height: 260px;
overflow-y: hidden;
display: flex;
flex-direction: column;

h3 {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 40px;
    color: #fff;
    text-align: center;
    margin-top: 35px;
}
.buttons {
    margin: auto 0 40px 0;
    width: 360px;
    display: flex;
    justify-content: space-around;
}
button {
    width: 137px;
    height: 37px;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 18px;
    font-weight: 700;
    background-color: #fff;
    color: #1877F2;
    opacity: ${props => props.isWaitingServer ? ".5" : "1"};
    cursor: ${props => props.isWaitingServer ? "not-allowed" : "pointer"};

    &.confirm {
        color: #fff;
        background-color: #1877F2;
    }
}
@media(max-width: 611px) {
    height: 100vh;
    width: 100%;
    justify-content: space-between;

    h3 {
        margin-top: 200px;
    }

    .buttons {
        flex-direction: column-reverse;
        width: 100%;
        margin-bottom: 0;
    }

    button {
        width: 100%;
        height: 75px;
        border-radius: 0;
    }
}
`;

const ModalLoading = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: fit-content;
margin: 35px auto 0 auto;
color: #1877F2;
font-size: 24px;


@media(max-width: 611px) {
    margin-top: 200px;
    svg {
        width: 200px;
        height: 200px;
        margin-bottom: 10px;
    }
}
`;
