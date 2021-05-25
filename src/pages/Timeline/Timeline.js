import { useEffect, useState } from "react";
import styled from "styled-components";
import CreatePost from "../../components/CreatePost";
import Loading from "../../components/Loading";
import Post from "../../components/Post";


function Timeline() {
    const [isWaitingServer, setIsWaitingServer] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsWaitingServer(false);
        }, 2000); // Apenas para simular o Servidor
    }, []);


    return (
        <Main>
            <Content>
                <h2>timeline</h2>
                {isWaitingServer ?
                    <Loading />
                    :
                    <Columns>

                        <Posts>
                            <CreatePost />
                            <Post />
                            <Post />
                            <Post />
                        </Posts>

                        <aside>in development</aside>

                    </Columns>

                }

            </Content>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    justify-content: center;
    padding: 125px 0 50px 0;
    min-height: 100vh;
    background-color: #2F2F2F;
`;

const Content = styled.div`
    width: 937px;

    h2 {
        color: #fff;
        font-family: "Oswald";
        font-size: 43px;
        font-weight: 700;
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
`;

const Posts = styled.section`
    width: 611px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export default Timeline;