import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

import Post from '../../components/Post';
import Loading from '../../components/Loading';
import InternalError from '../../components/InternalError';
import UserContext from "../../Context/UserContext";
import Aside from '../../components/Aside';
import SearchBar from '../../components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "react-loader-spinner";

function MyLikes() {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [internalError, setInternalError] = useState(false);
    const [loadMore, setLoadMore] = useState(true);
    const { user } = useContext(UserContext);
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked`;


    useEffect(() => {
        firstLoad();
    }, []); //eslint-disable-line

    // function updateList() {
    //     const promise = axios.get(url, config);

    //     promise.then(reply => {
    //         setPosts(reply.data.posts);
    //         setIsWaitingServer(false);
    //     });


    //     promise.catch(() => {
    //         setIsWaitingServer(false);
    //         setInternalError(true);
    //     });
    // }

    function firstLoad() {
        const promise = axios.get(url, {
            headers: { Authorization: `Bearer ${user.token}` },
            params: { offset: 0 }
        });
        promise.then(({ data }) => {
            setPosts(data.posts);
            setIsWaitingServer(false);
        });
        promise.catch(() => {
            setIsWaitingServer(false);
            setInternalError(false);
        });
    }


    function updateList(flag, previousList) {
        if (!flag) {
            const promise = axios.get(url, {
                headers: { Authorization: `Bearer ${user.token}` },
                params: { offset: (previousList ? previousList.length : 0) }
            });
            promise.then(({ data }) => {
                const newList = [].concat(previousList ? previousList : [], data.posts);
                if (newList.length + 1 === posts.length) {
                    setPosts(newList);
                    updateList("STOP");
                } else {
                    updateList(false, newList);
                }
            });
            promise.catch(() => {
                setInternalError(false);
            });
        }
    }


    function morePosts() {
        const promise = axios.get(url, {
            headers: { Authorization: `Bearer ${user.token}` },
            params: { offset: `${posts.length}` }
        });
        promise.then(({ data }) => {
            if (data.posts.length < 10 || !data.posts.length) setLoadMore(false);
            if (data.posts.length) setPosts(posts.concat(data.posts));
        });
        promise.catch(() => setInternalError(true));
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
                <h2>my likes</h2>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :

                    <Columns>



                        <Posts>
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={morePosts}
                                hasMore={loadMore}
                                style={{ overflow: "hidden" }}
                                loader={
                                    <LoadingMorePosts key={`LoaderKeyLikes`}>
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
                                    posts.map((post, index) => (
                                        <Post
                                            key={index}
                                            goToProfile={goToProfile}
                                            goToHashtag={goToHashtag}
                                            post={post}
                                            updateList={updateList}
                                        />
                                    ))
                                    :
                                    <h3 className="error">Você ainda não curtiu nenhum post...</h3>
                                }
                            </InfiniteScroll>


                        </Posts>

                        <Aside user={user} />

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
    &>div{
        margin-top: 30px;
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

    @media(max-width: 937px){
        margin: 0 auto;
    }
    @media(max-width: 611px){
        width: 100%;
        
        h3.error{
            margin-left: 20px;
        }
    }

`;

const LoadingMorePosts = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-top: 40px;
`;

export default MyLikes;