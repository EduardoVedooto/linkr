import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai";


function Comments({ eachComments ,showComments ,setShowComments}){

    return(
        <Main onClick={()=>setShowComments(!showComments)}>
            <AiOutlineComment
            color="#fff"
            fontSize="20px"
            />
            <p><span>{eachComments.length}</span> comments</p>
        </Main>
    )
}

const Main = styled.div`
    margin-top:15px;
    display:flex;
    flex-direction:column;
    align-items:center;
    cursor: pointer;
`

export default Comments