import Loader from "react-loader-spinner";
import styled from "styled-components";

function Loading() {
    return (
        <LoadingContainer>
            <Loader
                type="Puff"
                color="#171717"
                height={100}
                width={100}
            />
        </LoadingContainer>
    );
}

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export default Loading;