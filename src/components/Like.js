import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

import axios from 'axios';
import UserContext from '../Context/UserContext';
import { useContext, useState } from "react";

function Like({ postId, likes, updateList }) {
    const { user } = useContext(UserContext);
    const [text, setText] = useState("");
    const [likesInfo, setLikesInfo] = useState({
        likesList: [],
        clickedLike: false,
        tooltipText: ""
    });

    const config = {
        headers: {
            "Authorization" : `Bearer ${user.token}`
        }
    }

    function addLike() {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/like`, {}, config);

        request.then(({ data }) => {
            setLikesInfo({
                likesList: data.post.likes,
                clickedLike: true,
                tooltipText: tooltip()
            });

            updateList();
        });

        request.catch(error => {
            alert(error.response.data.message);
        });
    }

    function dislike() {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/dislike`, {}, config);

        request.then(({ data }) => {
            setLikesInfo({
                likesList: data.post.likes,
                clickedLike: false,
                tooltipText: tooltip()
            });

            updateList();
        });

        request.catch(error =>{
            alert(error.response.data.message);
        });
    }

    function tooltip() {
        const {likesList, clickedLike} = likesInfo;
        const userNotMe = likesList.find(u => u.userId !== user.id);

        if (clickedLike) {
            if (likesList.length === 1) {
                setText("Somente você curtiu esse post");
            } else if (likesList.length === 2) {
                setText(`Você e ${userNotMe.username}`);
            } else if (likesList.length > 2) {
                const qtd = likesList.length - 2;
                setText(`Você, ${userNotMe.username} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
            }
        } else {
            if(likesList.length === 1) {
                setText(`${likesList[0].username}`);
            } else if (likesList.length === 2) {
                setText(`${likesList[0].username} e ${likesList[1].username}`);
            } else if (likesList.length > 2) {
                const qtd = likesList.length - 2;
                setText(`${likesList[0].username}, ${likesList[1].username} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
            }
        }
        return text;
    }

    return (
        <>
        {likesInfo.clickedLike ?
            <IconContext.Provider value={{ size: "20px", color: "red" }}>
                <FaHeart onClick={dislike} />
            </IconContext.Provider>
            :
            <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
                <FiHeart onClick={addLike} />
            </IconContext.Provider>}
            <span data-tip={likesInfo.tooltipText} data-for="info">{likes.length} {likes.length === 1 ? "like" : "likes"}</span>
            <ReactTooltip id="info" place="bottom" type="light" />
        </>
    );
}

export default Like;