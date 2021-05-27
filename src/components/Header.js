import { useState } from "react"
import styled from "styled-components"
// import { ChevronDownOutline } from 'react-ionicons'


function Header(){
    const [press, setPress] = useState(false)
    return(
        <Main>
            <Container>
                <h1>linkr</h1>
                {/* <ChevronDownOutline
                color={'#00000'} 
                title={arrow}
                height="250px"
                width="250px"
                /> */}


            </Container>
            
            
        </Main>
    )
}

const Main = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
`
const Container = styled.div`

         
    h1{
        padding-left: 30px;
        color: #fff;
        font-family: "Passion One";
        font-weight: 700;
        font-size: 49px;
    }
`

export default Header