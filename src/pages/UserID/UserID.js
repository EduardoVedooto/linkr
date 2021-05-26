import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import { useParams } from "react-router-dom";

export default function UserID() {
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const { idUser } = useParams();  

    useEffect(() => {
        setTimeout(() => {
            setIsWaitingServer(false);
        }, 2000); // Apenas para simular o Servidor
    }, []);


    return (
        <>
       
            <Content>
                <h2>Juvenal Juvêncio’s posts</h2>
                {isWaitingServer ?
                    <Loading />
                    :
                    <Columns>

                        <Posts>
                            <Post />
                            <Post />
                            <Post />
                        </Posts>

                        <aside>in development</aside>

                    </Columns>

                }

            </Content>
        </>
    );
}




const Content = styled.div`
    width: 100vw;
    height:100vh;
    margin-top:71px;
    padding-top:28px;
    background:#333333;
    padding-left:17px;
    padding-right:17px;
    text-align:center;
    h2 {
        color: #fff;
        font-family: "Oswald";
        font-size: 43px;
        font-weight: 700;
    }
    
    @media(max-width: 666px){
        width:100%;
        h2 {
            color: #fff;
            font-family: "Oswald";
            font-size: 33px;
            font-weight: 700;
           
        }
        


       }

    `;

const Columns = styled.div`
    display: flex;
    justify-content: space-between;
    height: inherit;
    margin-top: 43px;

    &>aside{  // Será substituído pela div hashtag
        background-color: #171717;
        color: #fff;
        width: 301px;
        height: 406px;
        border-radius: 16px;
        text-align: center;
    }

    @media(max-width: 666px){
        width:100%;
        &>aside{
            display:none}
       }

`;

const Posts = styled.section`
    width: 611px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    

    @media(max-width: 666px){
        width:100%;
       }

    `;

