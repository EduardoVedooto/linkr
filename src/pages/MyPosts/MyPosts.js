import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import Post from '../../components/Post';
import Loading from '../../components/Loading';
import InternalError from '../../components/InternalError';
import UserContext from "../../Context/UserContext";

function MyPosts() {
    const history = useHistory();
    const [myPosts, setMyPosts] = useState([]);
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [internalError, setInternalError] = useState(false);
    const { user } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    };

    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${user.id}/posts`, config);

        promise.then(reply => {
            setMyPosts(reply.data.posts);
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

    return (
        <Main>
            <Content>
                <h2>my posts</h2>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :

                    <Columns>

                        <Posts>

                            {myPosts.length ?
                                myPosts.map((post, index) => <Post key={index} post={post} goToHashtag={goToHashtag} />)
                                :
                                <h3 className="error">Nenhum post encontrado...</h3>
                            }

                        </Posts>


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
`;

const Posts = styled.section`
    width: 611px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export default MyPosts;