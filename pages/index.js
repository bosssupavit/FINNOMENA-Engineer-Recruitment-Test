import Head from 'next/head'
import Navbar from './components/navbar'
import FundHeader from './components/fund-header'
import FundList from './components/fund-list'
import styled, { keyframes } from "styled-components";
import axios from "axios";
import React from "react";
import { setCookies, getCookie, removeCookies } from 'cookies-next';

const MainContainer = styled.div`
    padding-right: 3vw;
    padding-left: 3vw;
    padding-top: 150px;
`;

export default function Home(props) {
  const [isComponentVisible, setIsComponentVisible] = React.useState(true);
  const [search, setSearch] = React.useState({
    text: "",
    suggestions: []
  });
  const [data, setData] = React.useState(props.data)
  const onTextChanged = (e) => {
    const value = e.target.value;
    console.log(value)
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = data.sort().filter((v) => regex.test(v.thailand_fund_code));
    }
    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };

  const suggestionSelected = (value) => {
    setIsComponentVisible(false);
    setSearch({
      text: value.thailand_fund_code,
      suggestions: [value]
    });
  };

  return (
    <>
      <Head>
        <title>Fund Ranking - Home</title>
      </Head>
      <Navbar {...props} />
      <MainContainer>
        <FundHeader  {...props} data={data} setData={setData} search={search} setSearch={setSearch} onTextChanged={onTextChanged} setIsComponentVisible={setIsComponentVisible} isComponentVisible={isComponentVisible} suggestionSelected={suggestionSelected} />
        <FundList {...props} data={data} search={search} />
      </MainContainer>
    </>
  )
}

export const getServerSideProps = async ({req, res}) => {
  let response;
  if (getCookie('user_time', { req, res }) == undefined) {
    setCookies('user_time', '1Y', { req, res });
    response = await axios.get(`${process.env.endpoint}/api/fund-ranking?time=1Y`);
  } else {
    response = await axios.get(`${process.env.endpoint}/api/fund-ranking?time=${getCookie('user_time', { req, res })}`);
  }

  if (getCookie('language', { req, res }) == undefined) {
    setCookies('language', 'en', { req, res });
  }
  
  return {
    props: { data: response.data.data },
  };
};
