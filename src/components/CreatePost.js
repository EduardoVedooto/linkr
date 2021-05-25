import { useState } from "react";
import styled from "styled-components";

function CraetePost() {
    const [isWaitingServer, setIsWaitingServer] = useState(false);

    const [post, setPost] = useState({
        url: "",
        text: ""
    });

    function handleSubmit(e) {
        e.preventDefault();
        setIsWaitingServer(true);
        console.log("Publicado");
        // Axios Post
    }

    function handleChange(e) {
        if (e.target.type === "url") {
            post.url = e.target.value;
            setPost({ ...post });
        } else {
            post.text = e.target.value;
            setPost({ ...post });
        }
    }

    console.log()

    function goToProfile() {
        console.log("indo para o profile");
    }

    return (
        <Container>
            <img onClick={goToProfile} src="https://ahseeit.com/meme-templates/king-include/uploads/2020/11/hide-the-pain-harold-4386494474.png" alt="Imagem do perfil" />
            <Form onSubmit={handleSubmit} isWaitingServer={isWaitingServer}>
                <h2>O que você tem para favoritar hoje?</h2>
                <input
                    placeholder="http://..."
                    type="url"
                    value={post.url}
                    onChange={handleChange}
                    disabled={isWaitingServer}
                    required
                />
                <textarea
                    placeholder="Muito irado esse link falando de #javascript"
                    value={post.text}
                    onChange={handleChange}
                    disabled={isWaitingServer}
                />
                <button disabled={isWaitingServer}>{isWaitingServer ? "Publicando" : "Publicar"}</button>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 611px;
    background-color: #fff;
    border-radius: 16px;
    padding: 16px 22px 16px 18px;
    box-shadow: 0 4px 4px rgba(0,0,0,.25);
    margin-left: 20px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 18px;
        cursor: pointer;
    }
`;


const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    
    h2 {
        color: #707070;
        font-size: 20px;
        font-weight: 300;
        margin-bottom: 14px;
    }
    
    input {
        background-color: #efefef;
        border-radius: 5px;
        height: 30px;
        border: none;
        font-size: 15px;
        padding: 8px 14px;
        outline: none;
        font-family: "lato";
        opacity: ${props => props.isWaitingServer ? ".5" : "1"};
        ::placeholder {
            color: #949494;
        }
    }
    
    textarea {
        font-family: "lato";
        background-color: #efefef;
        border-radius: 5px;
        height: 30px;
        border: none;
        height: 66px;
        resize: none;
        font-size: 15px;
        padding: 8px 14px;
        outline: none;
        opacity: ${props => props.isWaitingServer ? ".5" : "1"};
        ::placeholder {
            color: #949494;
        }
    }

    button {
        width: 112px;
        height: 31px;
        font-weight: 700;
        color: #fff;
        padding: 7px;
        text-align: center;
        font-size: 14px;
        border-radius: 5px;
        background-color: #1877F2;
        opacity: ${props => props.isWaitingServer ? ".5" : "1"};
        border: none;
        outline: none;
        cursor: ${props => props.isWaitingServer ? "not-allowed" : "pointer"};
        margin-left: auto;
    }

`;

export default CraetePost;