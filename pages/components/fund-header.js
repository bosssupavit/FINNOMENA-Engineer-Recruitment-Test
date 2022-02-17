import React from "react";
import styled, { keyframes, css } from "styled-components";
import { FaSearch } from 'react-icons/fa'
import { MdClear, MdDisabledVisible } from 'react-icons/md'
import axios from "axios";
import { setCookies, getCookie, removeCookies } from 'cookies-next';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Title = styled.h1`
    font-size: 50px;
    color: ${props => props.color != "" ? props.color : ""};
    margin: 0;

    @media (max-width: 620px) {
        font-size: 60px;
    }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  gap: 20px;
  clear: both;
  z-index: 80;

  @media (max-width: 630px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const Search = styled.div`
    width: 600px;
    position: relative;
    padding: 1em !important;
    display: flex;
    box-shadow:  ${props => props.isText == "" ? (props.darkmode ? "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;" : "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px") : "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;"};
    border-radius: 10px;
    transition: 0.3s;
    justify-content: space-between;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
    }
    

    @media (max-width: 630px) {
       width: 100%;
    }
`;

const SearchBarInput = styled.input`
    width: 100%;
    background-color: transparent;
    border: 0;
    padding-left: 5px;
    min-width: 50px;
    font-size: inherit;
    font-family: Prompt;
    padding-left: 10px;
    padding-right: 10px;
    color: ${props => props.darkmode ? '#ffffff' : '#2B3956'};
    &:focus {
        outline: none;
    }
`;

const SearchIcon = styled.div`
  flex: 0 0;
  padding-top: 5px;
  margin: 5px;
`;

const ClearSearchBotton = styled.button`
  flex: 0 0;
  margin: 5px;
  padding-top: 5px;
  border-radius: 15px;
  border: 0px;
  outline: none;
  font-size: 15px;
  transition: all 0.15s ease 0s;
  opacity:  ${props => props.isText == "" ? 0 : 1};

  &:active {
        background: rgb(255,0,120);
        background: linear-gradient(155deg, rgba(255,0,120,1) 0%, rgba(5,209,206,1) 90%, rgba(0,212,255,1) 100%);
        color: #fff;
    }
`;

const baseButtonMixin = css`
  background: none;
  border: none;
  padding: 0;
`;

const AutoCompleteContainer = styled.ul`
  border-radius: 12px;
  background: #fff;
  padding: 8px 0;
  list-style-type: none;
  width: 600px;
  position: absolute;
  top: 120%;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  margin: 0;
  max-height: 280px;
  overflow-y: auto;
  z-index: 120;
  /* z-index: 99; */
  list-style-type: none;

  @media (max-width: 630px) {
       width: 100%;
    }
`;

const AutoCompleteItem = styled.li`
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    background-color: #FF95C8;
  }
`;

const AutoCompleteItemButton = styled.button`
  ${baseButtonMixin} width: 100%;
  line-height: 32px;
  text-align: left;
  &:active {
    outline: none;
    color: #0076f5;
  }
`;

const SortContent = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: relative;
    padding-top: 10px;
`;

const SortBtn = styled.button`
    border-radius: 15px;
    border: 0px;
    padding: 20px;
    background-color: #FF4EA1;
    color: white;
    min-width:100px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease 0s;

    &:hover {
        box-shadow: 0px 15px 20px rgba(100, 100, 111, 0.2);
        color: #fff;
        transform: translateY(-2px);
        background-color: #05D1CE;
    }

    &:active {
        box-shadow: 0px 15px 20px rgba(100, 100, 111, 0.2);
        background: rgb(255,0,120);
        background: linear-gradient(155deg, rgba(255,0,120,1) 0%, rgba(5,209,206,1) 90%, rgba(0,212,255,1) 100%);
        color: #fff;
    }

    @media (max-width: 630px) {
       width: 100%;
    }
`;

const SortContainer = styled.ul`
  border-radius: 12px;
  background: #fff;
  padding: 8px 0;
  list-style-type: none;
  width:200px;
  position: absolute;
  top: 120%;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  margin: 0;
  max-height: 280px;
  overflow-y: auto;
  z-index: 99;
  list-style-type: none;

  @media (max-width: 630px) {
       width: 100%;
    }
`;

const FundHeader = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [times, setTime] = React.useState(getCookie("user_time"));
    const toggling = () => setIsOpen(!isOpen);
    const searcClearhOnClick = () => {
        props.setSearch({
            text: "",
            suggestions: []
        });
    }

    const selectTime = async (time) => {
        const newLang = props.language
        console.log(props.language[props.lang].title1)
        const res = await axios.get(`${process.env.endpoint}/api/fund-ranking?time=${time}`);
        setCookies('user_time', time)
        setTime(time)
        setIsOpen(false)
        props.setData(res.data.data)
        props.setSearch({
            text: "",
            suggestions: []
        });
    }

    return (
        <>
            <div
                onClick={() => props.setIsComponentVisible(false)}
                style={{
                    display: props.isComponentVisible ? "block" : "none",
                    width: "200vw",
                    height: "200vh",
                    backgroundColor: "transparent",
                    position: "fixed",
                    zIndex: 0,
                    top: 0,
                    left: 0
                }}
            />
            <Container>
                <Row>
                    <Title color={props.darkmode.value ? '#ffffff' : '#2B3956'}>
                        {props.language[props.lang].title1}
                    </Title>
                    <Title color={'#FF50A5'}>
                        {props.language[props.lang].title2}
                    </Title>
                </Row>
                <Row>
                    <Search isText={props.search.text} darkmode={props.darkmode.value}>
                        <SearchIcon > <FaSearch /> </SearchIcon>
                        <SearchBarInput
                            id="search"
                            type="text"
                            name="search"
                            placeholder={props.language[props.lang].search}
                            autocomplete="off"
                            darkmode={props.darkmode.value}
                            value={props.search.text}
                            onChange={props.onTextChanged}
                        />
                        <ClearSearchBotton isText={props.search.text} onClick={searcClearhOnClick}> <MdClear /> </ClearSearchBotton>
                        {props.search.suggestions.length > 0 && props.isComponentVisible && (
                            <AutoCompleteContainer>
                                {props.search.suggestions.map((item) => (
                                    <AutoCompleteItem key={item.mstar_id}>
                                        <AutoCompleteItemButton
                                            key={item.mstar_id}
                                            onClick={() => props.suggestionSelected(item)}
                                        >
                                            {item.thailand_fund_code}
                                        </AutoCompleteItemButton>
                                    </AutoCompleteItem>
                                ))}
                            </AutoCompleteContainer>
                        )}
                    </Search>
                    <SortContent>
                        <SortBtn onClick={toggling} > {times || "1Y"}</SortBtn>
                        {isOpen && (
                            <SortContainer>
                                <AutoCompleteItem>
                                    <AutoCompleteItemButton
                                        onClick={() => selectTime("1D")}
                                    >
                                        1D
                                    </AutoCompleteItemButton>
                                </AutoCompleteItem>
                                <AutoCompleteItem>
                                    <AutoCompleteItemButton
                                        onClick={() => selectTime("1W")}                                >
                                        1W
                                    </AutoCompleteItemButton>
                                </AutoCompleteItem>
                                <AutoCompleteItem>
                                    <AutoCompleteItemButton
                                        onClick={() => selectTime("1M")}
                                    >
                                        1M
                                    </AutoCompleteItemButton>
                                </AutoCompleteItem>
                                <AutoCompleteItem>
                                    <AutoCompleteItemButton
                                        onClick={() => selectTime("1Y")}
                                    >
                                        1Y
                                    </AutoCompleteItemButton>
                                </AutoCompleteItem>
                            </SortContainer>
                        )}
                    </SortContent>
                </Row>

            </Container>
        </>
    )
}

export default FundHeader;