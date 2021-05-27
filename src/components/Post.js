import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import ReactHashtag from "react-hashtag";

function Post({ post, goToProfile, goToHashtag }) {

    let counter = 0;

    return (
        <PostsContainer>
            <aside>
                <img src={post.user.avatar} onClick={() => goToProfile(post.user.id)} alt="Imagem do perfil" />
                <div id="likes">
                    <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
                        <FiHeart />
                        <span>{post.likes.length} {post.likes.length === 1 ? "like" : "likes"}</span>
                    </IconContext.Provider>
                </div>
            </aside>
            <main>
                <h3 onClick={() => goToProfile(post.user.id)}>{post.user.username}</h3>
                <p>
                    <ReactHashtag renderHashtag={hashtag => <Hashtag key={post.id + hashtag + counter++} onClick={() => goToHashtag(hashtag)}>{hashtag}</Hashtag>}>
                        {post.text}
                    </ReactHashtag>
                </p>
                <LinkContent onClick={() => window.open(post.link, "_blank")}>
                    <h4>{post.linkTitle}</h4>
                    <p>{post.linkDescription}</p>
                    <span>{post.link}</span>
                    <img src={post.linkImage} alt="link" />
                </LinkContent>
            </main>
        </PostsContainer>
    );
}

const PostsContainer = styled.div`
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