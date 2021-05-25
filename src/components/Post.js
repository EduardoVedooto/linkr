import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";

function Post() {


    return (
        <PostsContainer>
            <aside>
                <img src="https://ahseeit.com/meme-templates/king-include/uploads/2020/11/hide-the-pain-harold-4386494474.png" alt="Imagem do perfil" />
                <div id="likes">
                    <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
                        <FiHeart />
                        <span>34 likes</span>
                    </IconContext.Provider>
                </div>
            </aside>
            <main>
                <h3>Name Example</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <LinkContent>
                    <h4>Title Example</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <span>www.textoDoLink.com</span>
                    <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/react-1-logo.png" alt="link" />
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
    padding: 24px;
    height: 155px;
    padding: 24px 175px 23px 20px;
    cursor: pointer;
    justify-content: space-between;
    margin-top: 14px;

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
    }

    span {
        font-size: 11px;
        color: #cecece;
    }
`;

export default Post;