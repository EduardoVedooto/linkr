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
import InfiniteScroll from "react-infinite-scroller";
import Loader from "react-loader-spinner";
import SearchBar from "../../components/SearchBar";


function Timeline() {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [internalError, setInternalError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [lastID, setLastID] = useState(null);
    const [loadMore, setLoadMore] = useState(true);
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts";

    useEffect(() => {
        firstLoad();
        getFollowings();
    }, []); //eslint-disable-line

    function updateList() {
        const promise = axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
        promise.then(({ data }) => {
            const newPosts = data.posts.filter(post => console.log(post.id));
            console.log(newPosts);
            if (lastID === null) setLastID(data.posts[data.posts.length - 1].id);
            setPosts(data.posts);
            setIsWaitingServer(false);
        });
        promise.catch(() => {
            setIsWaitingServer(false);
            setInternalError(true);
        });
    }

    function firstLoad() {
        console.log("Chegou aqui");
        const promise = axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } });
        promise.then(({ data }) => {
            setLastID(data.posts[data.posts.length - 1].id);

            setPosts(data.posts);
            setIsWaitingServer(false);
        });
        promise.catch(() => {
            setIsWaitingServer(false);
            setInternalError(true);
        });
    }

    function morePosts(e) {

        const promise = axios.get(url, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            params: {
                olderThan: `${lastID}`
            }
        });
        promise.then(({ data }) => {
            setLoadMore(false);
            console.log(posts.concat(data.posts));
            setPosts(posts.concat(data.posts));
            getLastID(data.posts);
        });
        promise.catch(() => {
            setInternalError(true);
        });

        console.log(posts);
    }

    // useInterval(() => {
    //     updateList();
    // }, 15000);




    function getLastID(posts) {
        setLastID(posts[posts.length - 1].id);
    }

    function getFollowings() {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows", {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        promise.then(({ data }) => {
            setFollowingList(data.users);
        });
        promise.catch(error => window.alert(error.response.data.message));
    }

    function goToProfile(id, name) {
        history.push(`/user/${id}/${name}`);
    }

    function goToHashtag(hashtag) {
        history.push(`/hashtag/${hashtag.replace("#", "")}`);
    }

    return (
        <Main>
            <Content>
                <SearchBar type="innerSearch" />
                <h2>timeline</h2>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :
                    <Columns>


                        <Posts>
                            <CreatePost updateList={updateList} goToProfile={goToProfile} />


                            <InfiniteScroll
                                pageStart={0}
                                loadMore={morePosts}
                                hasMore={loadMore}
                                threshold={500}
                                initialLoad={true}

                                loader={
                                    <LoadingMorePosts key="LoaderKey">
                                        <Loader
                                            key="TESTEFSD"
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
                                    <h3 className="info">
                                        {followingList.length ?
                                            "Nenhum post encontrado..."
                                            :
                                            "Você não segue ninguém ainda, procure por perfis na busca"
                                        }
                                    </h3>
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
    @media(max-width: 855px) {
        padding-top: 100px;
    }
`;

const Content = styled.div`
    width: 937px;
    h2 {
        color: #fff;
        font-family: "Oswald";
        font-size: 43px;
        font-weight: 700;
        user-select: none;
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
    h3.info {
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
