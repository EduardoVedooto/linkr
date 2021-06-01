import styled from "styled-components";
import EditPost from "./EditPost";
import ReactHashtag from "react-hashtag";
import RemovePost from "./RemovePost";
import { useContext} from "react";
import UserContext from "../Context/UserContext";
import Repost from "./RePost";
import Like from './Like';
import {MdRepeat} from 'react-icons/md';

function Post({ post, goToProfile, goToHashtag, updateList, isMyLikes, nameList }) {
    const { id, token } = useContext(UserContext).user;
    let counter = 0;
    return (
        <>
        <RePostContainer reposted={post.repostCount}>
        {post.repostCount > 0 ?
        <Reposted>
            <MdRepeat 
            color="#FFFFFF"
            fontSize="20px"/>

        <span onClick={() => goToProfile(post.repostedBy.id, post.repostedBy.username)}>Re-posted by  <strong>{post.repostedBy?
        post.repostedBy.id===id?"you":post.repostedBy.username
        :""} </strong></span>
        </Reposted>
        :""}
        
        <PostsContainer  reposted={post.repostCount}>
            <aside>
                <img src={post.user.avatar} onClick={() => goToProfile(post.user.id, post.user.username)} alt="Imagem do perfil" />
                <div id="likes">
                    <Like nameList={nameList} postId={post.id} updateList={updateList} post={post.likes} isMyLikes={isMyLikes} />
                </div>
                <Repost post={post}/>
            </aside>
            <main>


                <h3 onClick={() => goToProfile(post.user.id, post.user.username)}>{post.user.username}</h3>
                {post.user.id === id ?
                    <>
                        <RemovePost id={post.id} token={token} updateList={updateList} />
                        <EditPost post={post} token={token} updateList={updateList} goToHashtag={goToHashtag} />
                    </>
                    :
                    <p>
                        <ReactHashtag renderHashtag={hashtag => <Hashtag key={post.id + hashtag + counter++} onClick={() => goToHashtag(hashtag)}>{hashtag}</Hashtag>}>
                            {post.text}
                        </ReactHashtag>
                    </p>
                }

                <LinkContent onClick={() => window.open(post.link, "_blank")}>
                    <h4>{post.linkTitle}</h4>
                    <p>{post.linkDescription}</p>
                    <span>{post.link}</span>
                    <img src={post.linkImage} alt="link" />
                </LinkContent>
            </main>
        </PostsContainer>
        </RePostContainer>
        </>
       
    );
}

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
    @media(max-width: 611px){
        width: 100%;
        border-radius: 0;
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

const LinkContent = styled.div`
    border-radius: 11px;
    border: 1px solid #4d4d4d;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 155px;
    padding: 24px 175px 23px 20px;
    cursor: pointer;
    justify-content: space-between;
    margin-top: 14px;
    width: inherit;
    max-width: 100%;
    
    img {
        height: inherit;
        width: 155px;
        object-fit: cover;
        margin: 0;
        border-radius: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        right: -2px;
        margin: auto 0;
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
    }
    h4 {
        color: #cecece;
        font-size: 16px;
        word-break: break-word;
    }
    p {
        font-size: 11px;
        color: #9B9595;
        word-break: break-word;
    }
    span {
        font-size: 11px;
        color: #cecece;
        word-break: break-word;
    }
    @media(max-width: 611px) {
        padding: 7px 105px 7px 7px;
        height: 115px;
        overflow: hidden;
        img {
            width: 95px;
            height: 115px;
        }
    }
`;

const Hashtag = styled.span`
    font-size: inherit;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
`;

export default Post;