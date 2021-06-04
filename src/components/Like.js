import { useContext } from "react";
import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import UserContext from "../Context/UserContext";
import axios from "axios";

function Like({ postId, post, updateList, tooltip, isLiked }) {
    const { token } = useContext(UserContext).user;

    function handleLike() {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/${isLiked ? "dislike" : "like"}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        promise.then(() => {
            updateList();
        });
        promise.catch(err => window.alert(err.response.data.message));
    }



    return (
        <>
            {
                isLiked ?
                    <IconContext.Provider value={{ size: "20px", color: "red" }}>
                        <FaHeart onClick={() => { handleLike() }} />
                    </IconContext.Provider>
                    :
                    <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
                        <FiHeart onClick={() => { handleLike() }} />
                    </IconContext.Provider>
            }
            <span data-tip={tooltip} data-for="info">{post.length === 0 ? "Nenhum" : post.length} {post.length <= 1 ? "like" : "likes"}</span>
            <ReactTooltip id="info" place="bottom" type="light" />
        </>
    )
}

export default Like;