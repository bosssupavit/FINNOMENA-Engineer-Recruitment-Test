import React from "react";
import styled, { keyframes } from "styled-components";
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { setCookies, getCookie, removeCookies } from 'cookies-next';

const Nav = styled.nav`
  position: absolute;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding-right: 2vw;
  padding-left: 2vw;
  width: 100%;
  z-index: 999;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    z-index: 100;
    position: relative;
    flex-wrap: wrap;
    align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 1;
  gap: 20px;
  clear: both;
  height: auto;
`;

const ThemeBth = styled.button`
    border-radius: 15px;
    border: 0px;
    outline: none;
    background-color: #FF0078;
    color: white;
    min-width: 60px;
    padding-top: 10px;
    font-size: 25px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
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
`;

const LangBth = styled.button`
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
`;


const Navbar = (props) => {
    const [y, setY] = React.useState(window.scrollY);
    const [language, setLanguage] = React.useState(getCookie("language"));
    const handleNavigation = React.useCallback((e) => {
        const windows = e.currentTarget;

        setY(windows.scrollY);

        windows.scrollY > 0
            ? document.getElementById("navbar").classList.add("fixed")
            : document.getElementById("navbar").classList.remove("fixed");
    }, []);

    const languageOnClick = (lang) => {
        props.setLang(lang)
        setCookies('language', lang)
    }


    React.useEffect(() => {
        const path = window.location.hash;

        if (path && path.includes("#")) {
            setTimeout(() => {
                const id = path.replace("#", "");
                const el = window.document.getElementById(id);
                const r = el.getBoundingClientRect();
                window.top.scroll({
                    top: pageYOffset + r.top,
                    behavior: "smooth",
                });
            }, 600);
        }
    }, []);

    React.useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);


    return (
        <>

            <Nav id="navbar">
                <NavContent>
                    <Row>
                        {props.darkmode.value ? (
                            <ThemeBth onClick={props.darkmode.disable}>
                                <MdDarkMode />
                            </ThemeBth>
                        ) : (
                            <ThemeBth onClick={props.darkmode.enable}>
                                <MdLightMode />
                            </ThemeBth>
                        )}
                        
                        { props.lang == "en" ? (<LangBth onClick={() => languageOnClick("th")}>EN</LangBth>) : (<LangBth onClick={() => languageOnClick("en")}>TH</LangBth>)}
                    </Row>
                </NavContent>
            </Nav>
        </>
    );
};

export default Navbar;
