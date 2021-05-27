import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

import axios from 'axios';
import UserContext from '../Context/UserContext';
import { useContext, useEffect, useState } from "react";

function Like({ postId, likes }) {
    const { user } = useContext(UserContext);

    const [likesInfo, setLikesInfo] = useState({
        likesList: [],
        clickedLike: false,
        tooltipText: ""
    });

    /*
    useEffect(() => {
        const 
    }, []);

    
    const [likesInfo, setLikesInfo] = useState([]);
    const [clickedLike, setClickedLike] = useState(false);
    const [tooltipText, setTooltipText] = useState("");
    */

    const config = {
        headers: {
            "Authorization" : `Bearer ${user.token}`
        }
    }

    function addLike() {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/like`, {}, config);

        request.then(({ data }) => {
            console.log(data.post.likes);


            

            setLikesInfo({...likesInfo, 
                likesList: data.post.likes,
                clickedLike: true,
                tooltipText: tooltip()
            });

            console.log(likesInfo);

            //setClickedLike(true);
            //setTooltipText(tooltip);
            //tooltip();
        });

        request.catch(error => {
            console.log(error);
        });
    }

    function dislike() {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/dislike`, {}, config);

        request.then(({ data }) => {
            console.log(data.post.likes);

            setLikesInfo({...likesInfo, 
                likesList: data.post.likes,
                clickedLike: false,
                tooltipText: tooltip()
            });

            //setLikesInfo(data.post.likes);
            //setClickedLike(false);
            //setTooltipText(tooltip);
            //tooltip();
        });

        request.catch(error =>{
            console.log(error);
        });
    }

    
    
    function tooltip() {
        const {likesList, clickedLike} = likesInfo;
        const userNotMe = likesList.find(u => u.userId !== user.id);
        let text = "";

        if (clickedLike) {
            if (likesList.length === 1) {
                text = "Somente você curtiu esse post";
            } else if (likesList.length === 2) {
                text = `Você e ${userNotMe.username}`;
            } else if (likesList.length > 2) {
                const qtd = likesList.length - 2;
                text = `Você, ${userNotMe.username} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`;
            }
        } else if(!clickedLike) {
            if(likesList.length === 1) {
                text = `${likesList[0].username}`;
            } else if (likesList.length === 2) {
                text = `${likesList[0].username} e ${likesList[1].username}`;
            } else if (likesList.length > 2) {
                const qtd = likesList.length - 2;
                text = `${likesList[0].username}, ${likesList[1].username} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`;
            }
        } else {
            text = "testando";
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

/*
<span data-tip data-for="info">{likesInfo.likesList.length} {likesInfo.likesList.length === 1 ? "like" : "likes"}</span>
                <ReactTooltip id="info" place="bottom" type="light">
                    {likesInfo.tooltipText}
                </ReactTooltip>
*/

/*
    function tooltip() {
        const userNotMe = likesInfo.find(u => u.userId !== user.id);
        console.log(userNotMe);

        if (clickedLike) {
            if (likesInfo.length === 1) {
                setTooltipText("Somente você curtiu esse post");
            } else if (likesInfo.length === 2) {
                setTooltipText(`Você e ${userNotMe.username}`)
            } else if (likesInfo.length > 2) {
                const qtd = likesInfo.length - 2;
                setTooltipText(`Você, ${userNotMe.username} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
            }
        } else if(!clickedLike) {
            if(likesInfo.length === 1) {
                setTooltipText(`${likesInfo[0].username}`);
            } else if (likesInfo.length === 2) {
                setTooltipText(`${likesInfo[0].username} e ${likesInfo[1].username}`);
            } else if (likesInfo.length > 2) {
                const qtd = likesInfo.length - 2;
                setTooltipText(`${likesInfo[0].username}, ${likesInfo[1].username} e ${qtd} ${qtd === 1 ? "outra pessoa" : "outras pessoas"}`);
            }
        } else {
            setTooltipText("testando");
        }

    }
    */