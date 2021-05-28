import { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import UserContext from "../Context/UserContext";
import axios from "axios";

function Like({ postId, post, isMyLikes, updateList }) {
    const { user } = useContext(UserContext);
    const [usernamesList, setUsernamesList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [tooltipText, setTooltipText] = useState("");

    useEffect(() => {

        setUsernamesList(post.map(p => isMyLikes ? p.username : p["user.username"]));
        setIsLiked(usernamesList.includes(user.username));
        updateTooltip();
    }, [usernamesList]);

    function handleLike(e) {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/${isLiked ? "dislike" : "like"}`, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        promise.then(({ data }) => {

            setUsernamesList(data.post.likes.map(l => l.username));
            setIsLiked(!isLiked);
            updateTooltip();
            updateList();
        });
        promise.catch(err => window.alert(err.response.data.message));
        e.stopPropagation();
    }

    function updateTooltip() {

        const userNotMe = usernamesList.find(name => name !== user.username);

        if (usernamesList.includes(user.username)) {
            if (usernamesList.length === 1) {
                setTooltipText("Somente você curtiu esse post");
            } else if (usernamesList.length === 2) {
                setTooltipText(`Você e ${userNotMe}`);
            } else if (usernamesList.length > 2) {
                const qtd = usernamesList.length - 2;
                setTooltipText(`Você, ${userNotMe} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
            }
        } else {
            if (usernamesList.length === 0) {
                setTooltipText("");
            }
            if (usernamesList.length === 1) {
                setTooltipText(`${usernamesList[0]}`);
            } else if (usernamesList.length === 2) {
                setTooltipText(`${usernamesList[0]} e ${usernamesList[1]}`);
            } else if (usernamesList.length > 2) {
                const qtd = usernamesList.length - 2;
                setTooltipText(`${usernamesList[0]}, ${usernamesList[1]} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
            }
        }
    }

    return (
        <>
            {
                isLiked ?
                    <IconContext.Provider value={{ size: "20px", color: "red" }}>
                        <FaHeart onClick={handleLike} />
                    </IconContext.Provider>
                    :
                    <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
                        <FiHeart onClick={handleLike} />
                    </IconContext.Provider>
            }
            <span data-tip={tooltipText} data-for="info">{post.length} {post.length === 1 ? "like" : "likes"}</span>
            <ReactTooltip id="info" place="bottom" type="light" />
        </>
    )
}

export default Like;