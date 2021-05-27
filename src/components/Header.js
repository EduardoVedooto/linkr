import { useContext, useState } from "react"
import styled from "styled-components"
import { IoIosArrowDown } from 'react-icons/io';
import UserContext from "../Context/UserContext";



function Header(){
    // const [press, setPress] = useState(false);
    const { user } = useContext(UserContext);
    return(
        <Main>
            <h1>linkr</h1>
            <Arrow>
                <h2><IoIosArrowDown/></h2>
                <img src={user.avatar} ></img>
            </Arrow>
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
    z-index: 3;
    h1{
        padding-left: 30px;
        color: #fff;
        font-family: "Passion One";
        font-weight: 700;
        font-size: 49px;
    }
    svg{
        color: #fff;
        font-size: 30px;
        padding-right: 10px;
    }

`

const Arrow = styled.div`
    display: flex;
    align-items: center;
    padding-right: 15px;
    img{
        width: 53px;
        height: 53px;
        border-radius: 50px;
    }
`

export default Header