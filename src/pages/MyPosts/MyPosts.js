import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import Post from '../../components/Post';
import Loading from '../../components/Loading';
import InternalError from '../../components/InternalError';
import UserContext from "../../Context/UserContext";
import SearchBar from '../../components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "react-loader-spinner";

function MyPosts() {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [internalError, setInternalError] = useState(false);
    const [loadMore, setLoadMore] = useState(true);
    const { user } = useContext(UserContext);
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.id}/posts`;

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        },
        params: { offset: 20 }

    };

    useEffect(() => {
        const promise = axios.get(url, config);

        promise.then(reply => {
            setPosts(reply.data.posts);
            setIsWaitingServer(false);
        });

        promise.catch(error => {
            setIsWaitingServer(false);
            setInternalError(true);
        });

    }, []); //eslint-disable-line

    function goToHashtag(hashtag) {
        history.push(`/hashtag/${hashtag}`);
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

    return (
        <Main>
            <Content>
                <SearchBar type="innerSearch" />
                <h2>my posts</h2>
                <button>TESTE</button>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :

                    <Columns>

                        <InfiniteScroll
                            dataLength={posts.length}
                            next={morePosts}
                            hasMore={loadMore}
                            style={{ overflow: "hidden" }}
                            loader={
                                <LoadingMorePosts key="LoaderKeyMyPosts">
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
                                posts.map((post, index) => <Post key={index} post={post} goToHashtag={goToHashtag} />)
                                :
                                <h3 className="info">"Nenhum post encontrado com esta hashtag..."</h3>
                            }
                        </InfiniteScroll>


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
`;

const LoadingMorePosts = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-top: 40px;
`;
export default MyPosts;