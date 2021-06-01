
import styled from "styled-components";
import Modal from "react-modal";
import { useState } from "react";

function Link({post}) {
    Modal.setAppElement('#root');
    const [isOpen, setIsOpen] = useState(false);

    return (        
    <>      
        <LinkContent onClick={()=>setIsOpen(true)}>
        <h4>{post.linkTitle}</h4>
        <p>{post.linkDescription}</p>
        <span>{post.link}</span>
        <img src={post.linkImage} alt="link" />
        </LinkContent>

       

            <Modal
                className="ModalLink"
                isOpen={isOpen}
                overlayClassName="OverlayLink"
            >
                <ModalContent>
                <Buttons>
                <button className="NewTab" onClick={()=>window.open(post.link, "_blank")}>Open in new tab</button>
                <button className="close" onClick={() => setIsOpen(false)}>X</button> 
                </Buttons> 
                     

                <iframe src={post.link} title={post.linkTitle} width="100%" height="100%"></iframe>

                </ModalContent>
            </Modal>
        
        </>
    );
}

const ModalContent = styled.div`
    
    display: flex;
    flex-direction: column;
    width:100%;
    height:100%;
    padding:27px;
    
    background: #333333;
    border-radius: 20px;
    h3 {
        font-size: 34px;
        font-weight: 700;
        margin-bottom: 40px;
        color: #fff;
        text-align: center;
        margin-top: 35px;
    }

    iframe{
        background:#FFFFFF;
    }
    

`;

const Buttons = styled.div `
display:flex;
align-items:center;
justify-content:space-between;
padding-left:15px;
padding-right:15px;
padding-bottom:15px;

.close{
        border: none;
        background:none;
        color:#FFFFFF;
        font-size:20px;
}

.NewTab{
width: 138px;
height: 31px;
background: #1877F2;
border-radius: 5px;
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 17px;
color: #FFFFFF
}

`;

const LinkContent = styled.div`
    border-radius: 11px;
    border: 1px solid #4d4d4d;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 155px;
    padding: 24px 175px 23px 20px;
    cursor: pointer;
    justify-content: space-between;
    margin-top: 14px;
    width: inherit;
    max-width: 100%;
    
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
        word-break: break-word;
    }
    p {
        font-size: 11px;
        color: #9B9595;
        word-break: break-word;
    }
    span {
        font-size: 11px;
        color: #cecece;
        word-break: break-word;
    }
    @media(max-width: 611px) {
        padding: 7px 105px 7px 7px;
        height: 115px;
        overflow: hidden;
        img {
            width: 95px;
            height: 115px;
        }
    }

`;

export default Link;