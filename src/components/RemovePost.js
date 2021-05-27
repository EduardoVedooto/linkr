import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { useState } from "react";
import Loader from "react-loader-spinner";

function RemovePost() {
    Modal.setAppElement('#root');
    const [isOpen, setIsOpen] = useState(false);

    const modalStyles = {
        overlay: {
            "display": "flex",
            "justify-content": "center",
            "align-items": "center"
        },
        content: {
            "position": "static",
            "width": "597px",
            "height": "262px",
            "border-radius": "50px",
            "background-color": "#333",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "padding": "0"
        }
    }



    return (
        <>
            <FaTrash onClick={() => setIsOpen(true)} />
            <Modal
                isOpen={isOpen}
                className="Modal"
                overlayClassName="Overlay"
                preventScroll={true}
            >
                <ModalContent>
                    <h3>Tem certeza que deseja<br />excluir essa publicação?</h3>
                    {/* <ModalLoading>
                        <Loader
                            type="Rings"
                            color="#1877F2"
                            height={75}
                            width={75}
                        />
                        Carregando...
                    </ModalLoading> */}
                    <div className="buttons">
                        <button onClick={() => setIsOpen(false)}>Não, voltar</button>
                        <button className="confirm">Sim, excluir</button>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}

const ModalContent = styled.div`
    height: 260px;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;

    h3 {
        font-size: 34px;
        font-weight: 700;
        margin-bottom: 40px;
        color: #fff;
        text-align: center;
        margin-top: 35px;
    }
    .buttons {
        margin: auto 0 40px 0;
        width: 360px;
        display: flex;
        justify-content: space-around;
    }
    button {
        width: 137px;
        height: 37px;
        border: none;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        font-size: 18px;
        font-weight: 700;
        background-color: #fff;
        color: #1877F2;

        &.confirm {
            color: #fff;
            background-color: #1877F2;
        }
    }
    @media(max-width: 611px) {
        height: 100vh;
        width: 100%;
        justify-content: space-between;

        h3 {
            margin-top: 200px;
        }

        .buttons {
            flex-direction: column-reverse;
            width: 100%;
            margin-bottom: 0;
        }

        button {
            width: 100%;
            height: 75px;
            border-radius: 0;
        }
    }
`;

const ModalLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    margin: 35px auto 0 auto;
    color: #1877F2;
    font-size: 24px;


    @media(max-width: 611px) {
        margin-top: 200px;
        svg {
            width: 200px;
            height: 200px;
            margin-bottom: 10px;
        }
    }
`;

export default RemovePost;