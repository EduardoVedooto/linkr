import styled from "styled-components";
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from "react-icons/ai";
import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import axios from "axios";
import SortList from "../utils/SortList";
import { useHistory } from "react-router";

function SearchBar({ type }) {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [userList, setUserList] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [inputValue, setInputValue] = useState("");



    function search(e) {
        if (e.type === "blur") return;


        if (e.target.value.length < 3) {
            setUserList([]);
            return;
        }

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search", {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            params: {
                username: `${e.target.value}`
            }
        });
        promise.then(({ data }) => {
            setShowResult(true);
            setUserList(SortList(data.users));
        });
        promise.catch(error => window.alert(error.response.data.message));
    }


    function goToProfile(id, name) {
        history.push(`/user/${id}/${name}`);
        handleBlur();
    }

    function handleBlur() {
        setShowResult(false);
        setInputValue("");
        setUserList([]);
    }

    return (
        <SearchBarContainer className={type}>
            <DebounceInput
                minLength={3}
                debounceTimeout={0}
                placeholder={"Search for people and friends"}
                onChange={search}
                onBlur={handleBlur}
                value={inputValue}
            />
            <AiOutlineSearch />
            <Result isDisplay={showResult}>
                {userList.length ?
                    userList.map(user => (
                        <Item
                            isFollowing={user.isFollowingLoggedUser}
                            key={user.id + user.avatar}
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => goToProfile(user.id, user.username)}>
                            <img src={user.avatar} alt={user.username} />
                            <span>{user.username}</span>
                            <span className="followingTag">• following</span>
                        </Item>
                    ))
                    :
                    <span>Nenhum usuário encontrado...</span>
                }
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

    &.innerSearch{
        display: none;
    }
    
    input {
        width: 100%;
        height: inherit;
        border-radius: 8px;
        outline: none;
        border: none;
        padding: 0 40px 0 17px;
        font-size: 19px;
        color: #2f2f2f;
        position: relative;
        z-index: 10;

        ::placeholder{
            color: #c6c6c6;
        }
        :focus{
            box-shadow: 0 0 5px rgba(0,0,0,.5);

        }

    }
    svg {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto 10px auto auto;
        color: #c6c6c6;
        cursor: pointer;
        z-index: 15;
    }

    @media(max-width: 855px){
        &{
            width: 611px;
            display: none;

        }
    
        &.innerSearch {
            position: relative;
            margin-bottom: 20px;
            display: block;

            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
    @media(max-width: 611px){
        width: 95%;
    }
`;

const Result = styled.ul`
    display: ${props => props.isDisplay ? "flex" : "none"};
    position: absolute;
    top: 39px;
    z-index: -1;
    left: 0;
    width: 100%;
    background-color: #E5E5E5;
    border-radius: 0 0 8px 8px;
    padding: 20px 17px 23px 17px;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    max-height: 500px;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #e5e5e5 #151515;

    span {
        color: #515151;
        font-size: 17px;
    }

    /* Works on Chrome, Edge, and Safari */
    &::-webkit-scrollbar {
    width: 10px;
    }

    &::-webkit-scrollbar-track {
    background: none;
    }

    &::-webkit-scrollbar-thumb {
    background-color: #151515;
    border: 3px solid #151515;
    border-radius: 10px;
    }
    
    @media(max-width: 855px){
        z-index: 5;
    }
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

        &.followingTag{
            display: ${props => props.isFollowing ? "block" : "none"};
            color: #c5c5c5;
        }
    }

    
`;

export default SearchBar;