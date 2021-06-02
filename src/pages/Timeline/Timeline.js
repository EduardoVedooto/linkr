import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Aside from "../../components/Aside";
import CreatePost from "../../components/CreatePost";
import InternalError from "../../components/InternalError";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import UserContext from "../../Context/UserContext";
import useInterval from "use-interval";
import InfiniteScroll from 'react-infinite-scroller';
import Loader from "react-loader-spinner";


function Timeline() {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [internalError, setInternalError] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        updateList();
    }, []); //eslint-disable-line

    function updateList() {
        console.log("Chegou aqui");
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts", {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        promise.then(({ data }) => {
            console.log(data);
            setPosts(data.posts);
            setIsWaitingServer(false);
        });
        promise.catch(error => {
            setIsWaitingServer(false);
            setInternalError(true);
        });
    }

    useInterval(() => {
        updateList();
    }, 15000)


    function goToProfile(id, name) {
        history.push(`/user/${id}/${name}`);
    }

    function goToHashtag(hashtag) {
        history.push(`/hashtag/${hashtag.replace("#", "")}`);
    }




    return (
        <Main>
            <Content>
                <h2>timeline</h2>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :
                    <Columns>


                        <Posts>
                            <CreatePost updateList={updateList} goToProfile={goToProfile} />

                            <InfiniteScroll
                                pageStart={0}
                                loadMore={updateList}
                                hasMore={true}
                                loader={
                                    <LoadingMorePosts>
                                        <Loader
                                            type="ThreeDots"
                                            color="#171717"
                                            height={50}
                                            width={50}
                                        />
                                    </LoadingMorePosts>
                                }
                            >
                                {posts.length ?
                                    posts.map((post, index) => <Post key={index} post={post} goToProfile={goToProfile} goToHashtag={goToHashtag} updateList={updateList} />)
                                    :
                                    <h3 key={"EmptyTimeline"} className="error">Nenhum post encontrado...</h3>
                                }
                            </InfiniteScroll>

                        </Posts>

                        <Aside user={user} posts={posts} />

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

const LoadingMorePosts = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-top: 40px;
`;

export default Timeline;
