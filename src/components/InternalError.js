import styled from "styled-components";

function InternalError() {
    return (
        <ErrorContainer>
            <h3>Houve um erro no servidor. <br /> Por favor, atualize a página.</h3>
        </ErrorContainer>
    );
}

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 225px);
    h3 {
        font-size: 32px;
        font-family: "Oswald";
        color: #fff;
    }
`;

export default InternalError;