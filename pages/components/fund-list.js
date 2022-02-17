import React from "react";

import styled from "styled-components";
import { Container, Row, Col } from 'styled-bootstrap-grid';

const Card = styled.div`
  padding: 20px;
  position: relative;
  z-index: 1;
  border-radius: 10px;
  width: 100%;
  min-height: 100px;
  background-color: #212123;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  height: 100%;
`

const CardContent = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: row;
`


const Cols = styled(Col)`
    padding-left: 0px;
    padding-top: 20px;
    @media (max-width: 630px) {
        padding-top: 0px;
        padding: 10px;
    }

    
`;

const Title = styled.h3`
    font-size: 30px;
    color: #ffffff;
    margin: 0;
`;


const NavPrice = styled.h5`
    font-size: 20px;
    color: #ffffff;
    margin: 0;
`;

const NavPriceAvg = styled.h5`
    font-size: 10px;
    color: #ffffff;
    margin: 0;
`;


const TitleID = styled.p`
    font-size: 10px;
    color: #ffffff;
    margin: 0;

`;

const Rows = styled(Row)`
    /* gap: 10px 10px 0px 0px; */
`;

const FundList = (props) => {
    return (
        <>
            <Container fluid style={{ marginTop: 20, marginBottom: 50 }}>
                <Rows>
                    {props.search.suggestions.length > 0 || props.search.text != "" ?
                        (props.search.suggestions.map((item) => (
                            <Cols xl={3} lg={3} md={6} sm={6} key={item.mstar_id}>
                                <Card>
                                    <CardContent>
                                        <TitleID>{item.mstar_id}</TitleID>
                                    </CardContent>
                                    <CardContent>
                                        <Title>{item.thailand_fund_code}</Title>
                                    </CardContent>
                                    <CardContent>
                                        <NavPrice> {props.language[props.lang].price.toUpperCase()} : </NavPrice>{item.nav_return - item.nav > 0 ? <NavPrice style={{ paddingLeft: 5, color: "rgb(127,255,0)" }}>{item.nav}</NavPrice> : <NavPrice style={{ paddingLeft: 5, color: "#DC143C" }}>{item.nav}</NavPrice>}
                                    </CardContent>
                                    <CardContent>
                                        <NavPriceAvg> {props.language[props.lang].return.toUpperCase()} : </NavPriceAvg><NavPriceAvg style={{ paddingLeft: 5, color: '#05D1CE' }}>{item.nav_return}</NavPriceAvg> <NavPriceAvg style={{ paddingLeft: 5 }}>  {props.language[props.lang].avg.toUpperCase()} : </NavPriceAvg><NavPriceAvg style={{ paddingLeft: 5, color: '#FF0078' }}>{item.avg_return}</NavPriceAvg>
                                    </CardContent>
                                    <CardContent>
                                        <NavPriceAvg> {props.language[props.lang].update.toUpperCase()} : </NavPriceAvg><NavPriceAvg style={{ paddingLeft: 5 }}>{item.nav_date}</NavPriceAvg>
                                    </CardContent>
                                </Card>
                            </Cols>
                        )))
                        : (props.data.map((item) => (
                            <Cols xl={3} lg={3} md={6} sm={6} key={item.mstar_id}>
                                <Card>
                                    <CardContent>
                                        <TitleID>{item.mstar_id}</TitleID>
                                    </CardContent>
                                    <CardContent>
                                        <Title>{item.thailand_fund_code}</Title>
                                    </CardContent>
                                    <CardContent>
                                        <NavPrice> {props.language[props.lang].price.toUpperCase()} : </NavPrice>{item.nav_return - item.nav > 0 ? <NavPrice style={{ paddingLeft: 5, color: "rgb(127,255,0)" }}>{item.nav}</NavPrice> : <NavPrice style={{ paddingLeft: 5, color: "#DC143C" }}>{item.nav}</NavPrice>}
                                    </CardContent>
                                    <CardContent>
                                        <NavPriceAvg> {props.language[props.lang].return.toUpperCase()} : </NavPriceAvg><NavPriceAvg style={{ paddingLeft: 5, color: '#05D1CE' }}>{item.nav_return}</NavPriceAvg> <NavPriceAvg style={{ paddingLeft: 5 }}>  {props.language[props.lang].avg.toUpperCase()} : </NavPriceAvg><NavPriceAvg style={{ paddingLeft: 5, color: '#FF0078' }}>{item.avg_return}</NavPriceAvg>
                                    </CardContent>
                                    <CardContent>
                                        <NavPriceAvg> {props.language[props.lang].update.toUpperCase()} : </NavPriceAvg><NavPriceAvg style={{ paddingLeft: 5 }}>{item.nav_date}</NavPriceAvg>
                                    </CardContent>
                                </Card>
                            </Cols>
                        )))}
                </Rows>
            </Container>
        </>
    )
}

export default FundList;