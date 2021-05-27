import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';

import axios from 'axios';
import UserContext from '../Context/UserContext';
import { useContext, useEffect, useState } from "react";

function Like({ postId }) {
    const { user } = useContext(UserContext);
    const [likesInfo, setLikesInfo] = useState([]);
    const [clickedLike, setClickedLike] = useState(false);
    const config = {
        headers: {
            "Authorization" : `Bearer ${user.token}`
        }
    }

    function addLike() {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/like`, {}, config);

        request.then(({ data }) => {
            setLikesInfo(data.post.likes);
            console.log(likesInfo);

            setClickedLike(true);
        });

        request.catch(error => {
            console.log(error);
        });
    }

    function dislike() {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/dislike`, {}, config);

        request.then(({ data }) => {
            setLikesInfo(data.post.likes);
            console.log(likesInfo);

            setClickedLike(false);
        });

        request.catch(error =>{
            console.log(error);
        });
    }

    

    return (
        clickedLike ?
            <IconContext.Provider value={{ size: "20px", color: "red" }}>
                <FaHeart onClick={dislike} />
                <span>{likesInfo.length} {likesInfo.length === 1 ? "like" : "likes"}</span>
            </IconContext.Provider>
            :
            <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
                <FiHeart onClick={addLike} />
                <span>{likesInfo.length} {likesInfo.length === 1 ? "like" : "likes"}</span>
            </IconContext.Provider>
    );
}

export default Like;
/*
function HeartBorder() {
    return (
        <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
            <FiHeart onClick={addLike} />
            <span>{likes.length} {likes.length === 1 ? "like" : "likes"}</span>
        </IconContext.Provider>
    );
}

function HeartFilled() {
    return (
        <IconContext.Provider value={{ size: "20px", color: "red" }}>
            <FaHeart onClick={addLike} />
            <span>{likes.length} {likes.length === 1 ? "like" : "likes"}</span>
        </IconContext.Provider>
    );
}
*/

//clickedLike ? <HeartFilled /> : <HeartBorder />

/*
for (let i=0; i<likesInfo.length; i++) {
                if(likesInfo[i].userId === user.id) {
                    setClickedLike(true);
                } else {
                    setClickedLike(false);
                }
            }
*/