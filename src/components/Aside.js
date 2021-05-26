import styled from "styled-components"


function Aside(){
    return(
        <Container>
            <h1>trending</h1>
            <border></border>
            <p># javascript</p>
            <p># javascript</p>
            <p># javascript</p>
            <p># javascript</p>
            <p># javascript</p>
            <p># javascript</p>
            <p># javascript</p>
            <p># javascript</p>
            <p># javascript</p>
            <p># javascript</p>
        </Container>
    )
}

const Container = styled.div`
    background-color: #171717;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;
    width: 301px;
    height: 406px;
    border-radius: 16px;
    text-align: center;

    h1{
        font-family: "Oswald";
        font-weight: 700;
        font-size: 27px;
        padding: 15px 0px 20px 20px;
    }
    border{
        border: 1px solid #484848;
        width: 301px;
    }
    p{
        padding-top: 10px;
        padding-left: 20px;
        font-family: "Lato";
        font-weight: 700;
        font-size: 19px;
        letter-spacing: 0.5px;
    }
    p:first-of-type{
        padding-top: 25px;
    }
    @media(max-width: 600px){
        display: none;
    }
`



export default Aside