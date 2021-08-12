import styled from "styled-components";
import { FaPencilAlt} from "react-icons/fa";
import Modal from "react-modal";
import {useState,useRef,useEffect } from "react";
import ReactHashtag from "react-hashtag"
import axios from "axios";


export default function EditPost({ post, token, updateList,goToHashtag }){
    Modal.setAppElement('#root');
    const [clicked,setCliked]=useState(false);
    const [text,setText]=useState("");
    const [isWaitingServer, setIsWaitingServer] = useState(false);
    let counter = 0;
    const inputRef=useRef();

    useEffect(() => {
        if (clicked) {
          inputRef.current.focus()
          const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setCliked(false);
              }
            };
            window.addEventListener('keydown', handleEsc);
        
            return () => {
              window.removeEventListener('keydown', handleEsc);
            }
          }    
      }, [clicked]);


    function editPost(e){
        e.stopPropagation();
        setCliked(!clicked);
        setText(post.text);
    
    }

    function handleChange(e) {
        setText(e.target.value);
    }

    function SavePost(e){
        e.preventDefault();
        setIsWaitingServer(true); 
        const config = {
            headers: { "Authorization": `Bearer ${token}` }
        }
        const body = { "text": text };
        const promise = axios.put(`${process.env.REACT_APP_API_BASE_URL}/posts/${post.id}`, body, config);
        promise.then((response) => {
        setIsWaitingServer(false);    
        setCliked(false);
        updateList();
        })
        promise.catch((error)=>{
            setIsWaitingServer(false);
            alert("Não foi possível salvar as alterações,tente novamente!");

        })
    }



    return (
        <>
       
        <EditContainer>
            <FaPencilAlt onClick={(e) => editPost(e)} /> 
        </EditContainer>
            
            {clicked?    
                <Edit>
                    <form onSubmit={SavePost}>
                    <input
                    ref={inputRef}
                    placeholder=""
                    value={text}
                    disabled={isWaitingServer}
                    onChange={handleChange}
                />
                </form>
                </Edit>
                : 
                <p>
                
                <ReactHashtag renderHashtag={hashtag => <Hashtag key={post.id + hashtag + counter++} onClick={() => goToHashtag(hashtag)}>{hashtag}</Hashtag>}>
                     {post.text}
                 </ReactHashtag>
                </p>
                
                } 
      </>  
    );
}

const EditContainer = styled.div`
    position: absolute;
    right: 25px;
    top: 5px;
    cursor: pointer;
`;

const Edit = styled.div `
width:100%;
background:white;
padding-left:9px;
padding-right:9px;
padding-top:4px;
padding-bottom:4px;
input{
    width:100%;
    border:none;
}
p{
font-family: Lato;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 17px;
color: #4C4C4C;
}
`;
const Hashtag = styled.span`
    font-size: inherit;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
`;