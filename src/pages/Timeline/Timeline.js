import styled from "styled-components";
import CraetePost from "../../components/CreatePost";

function Timeline() {
    return (
        <Main>
            <Content>
                <h2>timeline</h2>
                <Columns>

                    <Posts>
                        <CraetePost />
                    </Posts>

                    <aside></aside>

                </Columns>
            </Content>
        </Main>
    );
}

const Main = styled.main`
    display: flex;
    justify-content: center;
    padding-top: 125px;
    min-height: 100vh;
    background-color: #2F2F2F;
`;

const Content = styled.div`
    width: 937px;

    h2 {
        color: #fff;
        font-family: "Oswald";
        font-size: 43px;
        font-weight: 700;
    }
`;

const Columns = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: inherit;
    margin-top: 43px;
`;

const Posts = styled.section`
    width: 611px;
    min-height: 100vh;

`;

export default Timeline;