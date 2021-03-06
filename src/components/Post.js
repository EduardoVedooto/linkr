import styled from "styled-components";
import EditPost from "./EditPost";
import ReactHashtag from "react-hashtag";
import RemovePost from "./RemovePost";
import Link from "./Link";
import { useContext, useEffect, useState} from "react";
import UserContext from "../Context/UserContext";
import getYouTubeID from 'get-youtube-id';
import YouTube from './Youtube';
import Repost from "./RePost";
import Like from './Like';
import {MdRepeat} from 'react-icons/md';
import TooltipText from "../utils/TooltipText";
import Comments from "../components/Comments";
import CommentSection from "../components/CommentSection";
import axios from "axios";
import MapBox from './MapBox';
import useInterval from "use-interval";

function Post({ post, goToProfile, goToHashtag, updateList }) {
    const { id, token, username } = useContext(UserContext).user;
    const usermamesList = post.likes.map(u => u["user.username"]);
    const isLiked = usermamesList.includes(username);
    const tooltip = TooltipText(username, usermamesList);
    const [showComments, setShowComments] = useState(false);
    const [eachComments, setComments] = useState([]);
    const [allFollowers, setAllFollowers] = useState([]);

    function getComments(){
        const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/posts/${post.id}/comments`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        request.then((response)=>{setComments(response.data.comments)});
    }


    const videoID = getYouTubeID(post.link);


    function getFollows() {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/follows`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        promise.then((response)=>{setAllFollowers(response.data.users)})
    }

    useEffect(()=>{
        getComments();  
        setShowComments(false);
        getFollows();
    }, []) //eslint-disable-line

    useInterval(()=>{
        getComments();
    }, 1500)

    
    let counter = 0;

    return (
        <RePostContainer  reposted={post.repostedBy}>
            {post.repostedBy ?
            <Reposted>
                <MdRepeat 
                color="#FFFFFF"
                fontSize="20px"/>
                <span onClick={() => goToProfile(post.repostedBy.id, post.repostedBy.username)}>Re-posted by  <strong>
                {post.repostedBy.id===id?"you":post.repostedBy.username} </strong></span>
            </Reposted>
            :""}
            <BackgroundPost>
                <PostsContainer reposted={post.repostedBy}>
                    <aside>
                        <img src={post.user.avatar} onClick={() => goToProfile(post.user.id, post.user.username)} alt="Imagem do perfil" />
                        <div id="likes">
                            <Like
                                post={post.likes}
                                postId={post.id}
                                isLiked={isLiked}
                                tooltip={tooltip}
                                updateList={updateList}
                                />
                        </div>
                        <CommentButton>
                            <Comments eachComments={eachComments} showComments={showComments} setShowComments={setShowComments} />
                        </CommentButton>
                        <Repost post={post} updateList={updateList}/>
                    </aside>
                    <main>
                        <div className="title">
                            <h3 onClick={() => goToProfile(post.user.id, post.user.username)}>{post.user.username}</h3>
                            {post.geolocation ? <MapBox geolocation={post.geolocation} username={post.user.username} /> : ""}
                        </div>
                        {post.user.id === id ?
                            <>
                                <RemovePost post={post} id={post.id} token={token} updateList={updateList} />
                                <EditPost post={post} token={token} updateList={updateList} goToHashtag={goToHashtag} />
                            </>
                            :
                            <p>
                                <ReactHashtag renderHashtag={hashtag => (
                                    <Hashtag
                                    key={post.id + hashtag + counter++}
                                    onClick={() => goToHashtag(hashtag)}
                                    >
                                        {hashtag}
                                    </Hashtag>
                                )}>
                                    {post.text}
                                </ReactHashtag>
                            </p>
                        }
                        {videoID ? <YouTube link={post.link} videoID={videoID} />
                        :
                        <Link post={post}></Link>}
                    </main>
                </PostsContainer>
                <CommentSection goToProfile={goToProfile} allFollowers={allFollowers} updateList={updateList} post={post} showComments={showComments} eachComments={eachComments} />
            </BackgroundPost>

        </RePostContainer>  
    );
}

const BackgroundPost = styled.div `
    background-color: #1E1E1E;
    border-radius: 16px;
    width: 611px;
    height: auto;
    @media(max-width: 611px){
        width: 100%;
        border-radius: 0;
    }
`

const RePostContainer= styled.div `
    width: 611px;
    background: ${props => props.reposted? "#1E1E1E" : "none"};
    margin-top: 30px;
    border-radius: 16px;
    @media(max-width: 611px){
        width: 100%;
        margin-top:15px;
    }
`;

const Reposted = styled.div `
    margin:10px;
    display:flex;
    align-items:center;
    span{
    margin-left:5px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #FFFFFF;
    cursor: pointer;
    }
`;


const PostsContainer = styled.div`  
    margin-top:${props => props.reposted?"13px":"auto"};
    background-color: #171717;
    border-radius: 16px;
    width: 611px;
    display: flex;
    padding: 17px 22px 20px 18px;
    color: #fff;
    gap: 18px;
    z-index: 3;
    @media(max-width: 611px){
        width: 100%;
        border-radius: 0;
    }
    @media(max-width: 450px){
        overflow-x: scroll;
    }
    aside {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        &>img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 15px;
            cursor: pointer;
        }
        #likes{
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            width: 72px;
        }
        span {
            margin-top: 5px;
            text-align: center;
        }
    }
    main {
        display: flex;
        flex-direction: column;
        width: 100%;   
        position: relative;
        .title {
            display: flex;
        } 
        h3 {
            width: fit-content;
            font-size: 20px;
            margin-bottom: 10px;
            cursor: pointer;
            word-break: break-word;
        }
        &>p {
            color: #b7b7b7;
            font-size: 17px;
            cursor: default;
            word-break: break-word;
        }
    }
`;

const CommentButton = styled.div`
    width: 100px;
`

const Hashtag = styled.span`
    font-size: inherit;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
`;


export default Post;