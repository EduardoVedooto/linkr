import { useEffect, useState ,useContext} from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import { useParams } from "react-router-dom";
import UserContext from "../../Context/UserContext";



export default function UserID() {
    const [isWaitingServer, setIsWaitingServer] = useState(true);
    const { idUser } = useParams();  
    const [posts, setPosts] = useState([]);
    const {user, setUser } = useContext(UserContext);

    console.log("pagina");
    console.log(user);

    
    useEffect(() => {
        updateList();
    }, []);

    function updateList() {
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const promise = axios.get(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/posts`,
            config
          )
        promise.then(({ data }) => {
            setPosts(data.posts);
            console.log(data)
            setIsWaitingServer(false);
        });
        promise.catch(error => {
            console.log(error.response.data);
            setIsWaitingServer(false);
           // setInternalError(false);
        });
    };
    //*/


    return (
        <Main>
            <Content>
                <h2>timeline</h2>
                {isWaitingServer ?
                    <Loading />
                    :
                    <Columns>

                        <Posts>
                    {posts.map((post,i)=> (
                    <Post key={i} user={post.user.id}/>
                    )

                    )}
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
`;



