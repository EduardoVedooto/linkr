import { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import UserContext from "../../Context/UserContext";
import InternalError from "../../components/InternalError";
import Aside from "../../components/Aside";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from "react-loader-spinner";



export default function Hashtag() {
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [posts, setPosts] = useState([]);
    const [internalError, setInternalError] = useState(false);
    const [loadMore, setLoadMore] = useState(true);
    const [lastID, setLastID] = useState(null);
    const { hashtag } = useParams();
    const { user } = useContext(UserContext);
    const history = useHistory();
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`;

    useEffect(() => {
        updateList();
    }, [hashtag]); //eslint-disable-line

    function goToProfile(id, name) {
        history.push(`/user/${id}/${name}`);
    }

    function goToHashtag(hashtag) {
        history.push(`/hashtag/${hashtag.replace("#", "")}`);
    }

    function updateList(flag, previousList) {
        if (!flag) {
            const promise = axios.get(url, {
                headers: { Authorization: `Bearer ${user.token}` },
                params: { offset: (previousList ? previousList.length : 0) }
            });
            promise.then(({ data }) => {
                const newList = [].concat(previousList ? previousList : [], data.posts);

                if (newList.length >= posts.length) {
                    setPosts(newList);
                    updateList("STOP");
                } else {
                    updateList(false, newList);
                }
                setIsWaitingServer(false);
            });
            promise.catch(() => {
                setIsWaitingServer(false);
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

    return (
        <Main>
            <Content>
                <h2>#{hashtag}</h2>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :
                    <Columns>

                        <InfiniteScroll
                            dataLength={posts.length}
                            next={morePosts}
                            hasMore={loadMore}
                            style={{ overflow: "hidden" }}
                            loader={
                                <LoadingMorePosts key="LoaderKeyHashtag">
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
                                <h3 className="info">"Nenhum post encontrado com esta hashtag..."</h3>
                            }
                        </InfiniteScroll>


                    </Columns>

                }

            </Content>
            <Aside user={user} posts={posts} />
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