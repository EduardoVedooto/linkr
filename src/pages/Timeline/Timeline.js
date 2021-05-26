import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import CreatePost from "../../components/CreatePost";
import InternalError from "../../components/InternalError";
import Loading from "../../components/Loading";
import Post from "../../components/Post";


function Timeline() {
    const history = useHistory();
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [internalError, setInternalError] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        updateList();
    }, []);

    function updateList() {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", {
            headers: {
                Authorization: `Bearer fab13ed8-a5b8-475c-965d-3f2d87efc629`,
            }
        });
        promise.then(({ data }) => {
            console.log(data.posts);
            setPosts(data.posts);
            setIsWaitingServer(false);
        });
        promise.catch(error => {
            console.log(error.response.data);
            setIsWaitingServer(false);
            setInternalError(false);
        });
    }

    function goToProfile(id) {
        console.log("Chegou: " + id);
        history.push(`/user/${id}`);
    }

    return (
        <Main>
            <Content>
                <h2>timeline</h2>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :
                    <Columns>

                        <Posts>
                            <CreatePost updateList={updateList} goToProfile={goToProfile} />
                            {!posts.length ? <h3 className="error">Nenhum post encontrado...</h3>
                                : posts.map(post => <Post key={post.id} post={post} goToProfile={goToProfile} />)
                            }
                            {/* <Post />
                            <Post />
                            <Post /> */}
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

    h3.error {
        color: #FFF;
        font-size: 24px;
        font-family: "Oswald";

    }
`;

export default Timeline;