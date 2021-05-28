import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

import axios from 'axios';
import UserContext from '../Context/UserContext';
import { useContext, useState, useEffect } from "react";

function Like({ postId, likes, updateList }) {
    const { user } = useContext(UserContext);
    const [text, setText] = useState("null");

    const [likesList, setLikesList] = useState(likes.length > 0 ? likes.map(like => Object.values(like)[6]) : []);
    const [clickedLike, setClickedLike] = useState(likesList.includes(user.username));

    useEffect(() => {
        tooltip();
    }, [likes]); //eslint-disable-line
    
    const config = {
        headers: {
            "Authorization" : `Bearer ${user.token}`
        }
    }

    function addLike() {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/like`, {}, config);

        request.then(({ data }) => {
            setLikesList(data.post.likes.map(l => l.username));
            setClickedLike(true);
            tooltip();
            updateList();
        });

        request.catch(error => {
            alert(error.response.data.message);
        });
    }

    function dislike() {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/dislike`, {}, config);

        request.then(({ data }) => {
            setLikesList(data.post.likes.map(l => l.username));
            setClickedLike(false);
            tooltip();
            updateList();
        });

        request.catch(error =>{
            alert(error.response.data.message);
        });
    }

    function tooltip() {
        const userNotMe = likesList.find(name => name !== user.username);
        if (clickedLike) {
            if (likesList.length === 1) {
                setText("Somente você curtiu esse post");
            } else if (likesList.length === 2) {
                setText(`Você e ${userNotMe}`);
            } else if (likesList.length > 2) {

                const qtd = likesList.length - 2;
                setText(`Você, ${userNotMe} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
            }
        } else {
            if(likesList.length === 1) {
                setText(`${likesList[0]}`);
            } else if (likesList.length === 2) {
                setText(`${likesList[0]} e ${likesList[1]}`);
            } else if (likesList.length > 2) {
                const qtd = likesList.length - 2;
                setText(`${likesList[0]}, ${likesList[1]} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
            }
        }
    }

    return (
        <>
        {clickedLike ?
            <IconContext.Provider value={{ size: "20px", color: "red" }}>
                <FaHeart onClick={dislike} />
            </IconContext.Provider>
            :
            <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
                <FiHeart onClick={addLike} />
            </IconContext.Provider>}
            <span data-tip={text} data-for="info">{likes.length} {likes.length === 1 ? "like" : "likes"}</span>
            <ReactTooltip id="info" place="bottom" type="light" />
        </>
    );
}

export default Like;