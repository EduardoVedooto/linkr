import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Post from '../../components/Post';

//import context with user data, into config

function MyPosts() {
    const [myPosts, setMyPosts] = useState([]);
    //const { user } = useContext(UserContext);

    /*
    const [myPosts, setMyPosts] = useState([
        {
            "id": 2,
            "text": "Never Gonna Give You Up #rickroll",
            "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "linkTitle": "Rick Astley - Never Gonna Give You Up (Video)",
            "linkDescription": "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
            "linkImage": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            "user": {
                "id": 1,
                "username": "teste",
                "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
            },
            "likes": [
                {
                    "id": 1,
                    "userId": 1,
                    "postId": 2,
                    "createdAt": "2021-05-24T18:55:37.544Z",
                    "updatedAt": "2021-05-24T18:55:37.544Z",
                    "user.id": 1,
                    "user.username": "teste"
                },
                {
                    "id": 2,
                    "userId": 4,
                    "postId": 2,
                    "createdAt": "2021-05-25T17:41:50.248Z",
                    "updatedAt": "2021-05-25T17:41:50.248Z",
                    "user.id": 4,
                    "user.username": "lalalabanana"
                }
            ]
        }
    ]);
    */

    // token: fab13ed8-a5b8-475c-965d-3f2d87efc629
    /*
    const config = {
      headers: {
          "Authorization": `Bearer ${user.token}`
      }  
    }; */

    const config = {
        headers: {
            "Authorization": "Bearer fab13ed8-a5b8-475c-965d-3f2d87efc629"
        }  
      };

    //const userID = user.id;
    const userID = 14;

    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userID}/posts`, config);

        promise.then(reply => {
            setMyPosts(reply.data.posts);
            console.log(reply.data.posts);
        });

        promise.catch(error => {
            console.log(error.response.data);
        });

    }, []);
    



    return (
        <Main>
            <Content>
                <h2>my posts</h2>
                    <Columns>

                        <Posts>

                            {myPosts.map(p => <Post post={p}/>)}


                        </Posts>

                        <aside>in development</aside>

                    </Columns>
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

export default MyPosts;