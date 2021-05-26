import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiHeart } from "react-icons/fi";
import { FiPencil } from 'react-icons/fi'

import { Link} from "react-router-dom";
import {useContext, useState } from "react";
import SelectedContext from "../Context/SelectedContext";
import ReactHashtag from "react-hashtag";
/*

*/
function Post(data) {
//console.log(data);
const {setSelected} = useContext(SelectedContext);
const [clicked,setCliked]=useState(false);
//const [text,setText]=useState("");
const [text,setText]=useState("");
let i=0;


function editPost(e,post){
    e.stopPropagation();
    console.log(post);
    setCliked(true);
    setText(post.text);
}

function handleChange(e) {
    //if (errorMessage) setErrorMessage(false);
         
         setText(e.target.value);
        //setPost({ ...post });
    
}



    return (
        
        <PostsContainer>
          
  <aside>
                <img src={data.data.user.avatar} alt="Imagem do perfil" />
                <div id="likes">
                    <IconContext.Provider value={{ size: "20px", color: "#fff" }}>
                        <FiHeart />
                        <span>34 likes</span>
                    </IconContext.Provider>
                </div>
            </aside>
            <main>
            <FiHeart onClick={(e) => editPost(e,data.data)}/>
                <Link to={`/user/${data.data.user.id}`}> 
                <h3 onClick={()=> setSelected(data.data.user.username) }>{data.data.user.username}</h3>
                </Link>
                
                {clicked?
                
                <Edit>
                    <input
                    placeholder=""
                    value={text}
                    required
                    onChange={handleChange}
                />
                </Edit>
                : 
                
                <p>                    
                <ReactHashtag renderHashtag={hashtag => (
                        
                        <Link to={`/Hashtag/${hashtag.replace("#","")}`} key={i++}> 
                        <Hashtag key={i++} onClick={() => setSelected(hashtag)}>{hashtag}</Hashtag>
                        </Link>
                    )}>
                        {data.data.text}
                    </ReactHashtag>
                    </p>
                }
                <LinkContent>
                    <h4>{data.data.linkTitle}</h4>
                    <p>{data.data.linkDescription}</p>
                    <span>{data.data.link}</span>
                    <img src={data.data.linkImage} alt="link" />
                </LinkContent>
            </main>
        </PostsContainer>
    );
}


const Edit = styled.div `
width:100%;
background:white;
padding-left:9px;
padding-right:9px;
padding-top:4px;
padding-bottom:4px;
p{
font-family: Lato;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 17px;

color: #4C4C4C;
}
`

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
const Hashtag = styled.span`
    font-size: inherit;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
`;
export default Post;