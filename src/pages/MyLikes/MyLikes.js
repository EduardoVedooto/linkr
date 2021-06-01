import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';

import Post from '../../components/Post';
import Loading from '../../components/Loading';
import InternalError from '../../components/InternalError';
import UserContext from "../../Context/UserContext";
import SelectedContext from '../../Context/SelectedContext';
import Aside from '../../components/Aside';

function MyLikes() {
    const history = useHistory();
    const [myLikedPosts, setMyLikedPosts] = useState([]);
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const [internalError, setInternalError] = useState(false);
    const { user } = useContext(UserContext);
    const { setSelected } = useContext(SelectedContext);
    const [nameList, setNameList] = useState([]);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    };

    useEffect(() => {
        updateList();
    }, []); //eslint-disable-line

    function updateList() {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked`, config);

        promise.then(reply => {
            setMyLikedPosts(reply.data.posts);
            setNameList(reply.data.posts.map(p => p.likes.map(u => u.username)));
            setIsWaitingServer(false);
        });

        promise.catch(error => {
            setIsWaitingServer(false);
            setInternalError(true);
        });
    }


    function goToProfile(id, nome) {
        setSelected(nome);
        history.push(`/user/${id}`);
    }

    function goToHashtag(hashtag) {
        history.push(`/hashtag/${hashtag.replace("#", "")}`);
    }

    return (
        <Main>
            <Content>
                <h2>my likes</h2>
                {isWaitingServer ? <Loading /> : internalError ? <InternalError /> :

                    <Columns>

                        <Posts>

                            {myLikedPosts.length ?
                                myLikedPosts.map((post, index) => <Post key={index} goToProfile={goToProfile} goToHashtag={goToHashtag} nameList={nameList} post={post} isMyLikes={true} updateList={updateList} />).reverse()
                                :
                                <h3 className="error">Nenhum post encontrado...</h3>
                            }

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
export default MyLikes;