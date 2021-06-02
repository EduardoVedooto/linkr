import styled from "styled-components";
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";

function SearchBar() {

    const { user } = useContext(UserContext);
    const [userList, setUserList] = useState([]);

    return (
        <SearchBarContainer>
            <DebounceInput
                minLength={3}
                debounceTimeout={300}
                placeholder={"Search for people and friends"}
            />
            <AiOutlineSearch />
            <Result>
                <Item>
                    <img src={user.avatar} alt={user.username} />
                    <span>{user.username}</span>
                </Item>
                <Item>
                    <img src={user.avatar} alt={user.username} />
                    <span>{user.username}</span>
                </Item>
                <Item>
                    <img src={user.avatar} alt={user.username} />
                    <span>{user.username}</span>
                </Item>
            </Result>
        </SearchBarContainer>
    );
}

const SearchBarContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 563px;
    height: 45px;
    
    input {
        width: inherit;
        height: inherit;
        border-radius: 8px;
        outline: none;
        border: none;
        padding-left: 17px;
        font-size: 19px;
        color: #2f2f2f;

        ::placeholder{
            color: #c6c6c6;
        }
    }
    svg {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        color: #c6c6c6;
        cursor: pointer;
    }

    @media(max-width: 855px){
        top: 82px;
    }
`;

const Result = styled.ul`
    position: absolute;
    top: 39px;
    z-index: -1;
    left: 0;
    width: inherit;
    background-color: #E5E5E5;
    border-radius: 0 0 8px 8px;
    padding: 20px 17px 23px 17px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    display:none;
`;

const Item = styled.li`

    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    border-radius: 20px;
    transition: background-color .3s;

    :hover{
        background-color: #d5d5d5;
    }

    img {
        width: 39px;
        height: 39px;
        object-fit: cover;
        border-radius: 50%;
    }
    span {
        font-size: 19px;
        color: #515151;
    }
`;

export default SearchBar;