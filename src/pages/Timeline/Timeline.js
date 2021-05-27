import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import CreatePost from "../../components/CreatePost";
import InternalError from "../../components/InternalError";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import UserContext from "../../Context/UserContext";
import SelectedContext from "../../Context/SelectedContext";



function Timeline() {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [internalError, setInternalError] = useState(false);
    const [posts, setPosts] = useState([]);

   const {setSelected} = useContext(SelectedContext);
    
    useEffect(() => {
        updateList();
    }, []); 
    function updateList() {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        promise.then(({ data }) => {
            setPosts(data.posts);
            setIsWaitingServer(false);
        });
        promise.catch(error => {
            setIsWaitingServer(false);
            setInternalError(true);
        });
    }

    function goToProfile(id,nome) {
        setSelected(nome);
        history.push(`/user/${id}`);
    }

    function goToHashtag(hashtag) {
        history.push(`/hashtag/${hashtag.replace("#","")}`);
    }

 
    

    return (
        <Main>
            <Content>
                <h2>timeline</h2>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :
                    <Columns>

                        <Posts>
                            <CreatePost updateList={updateList} goToProfile={goToProfile} />

                            {posts.length ?
                                posts.map((post, index) => <Post key={index} post={post} goToProfile={goToProfile} goToHashtag={goToHashtag} />)
                                :
                                <h3 className="error">Nenhum post encontrado...</h3>
                            }
                        </Posts>

                        <aside>in development (Trending)</aside>

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
    @media(max-width: 937px){
        width: 100%;
        h2 {
            margin-left: 20px;
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
    @media(max-width: 937px){
        &>aside {
            display: none;
        }
    }
`;

const Posts = styled.section`
    width: 611px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    @media(max-width: 937px){
        margin: 0 auto;
    }
    @media(max-width: 611px){
        width: 100%;
    }
    h3.error {
        color: #FFF;
        font-size: 24px;
        font-family: "Oswald";

    }

`;

export default Timeline;
