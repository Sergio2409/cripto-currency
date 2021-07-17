import React from 'react';
import styled from '@emotion/styled'

const ResultDiv = styled.div`
    color: #FFF;
    font-family: 'Arial Helvetica', san-serif;
`;

const Info = styled.p`
    font-size: 18px;

    span{
        font-weigth: bold;
    }
`;

const Price = styled.p`
font-size: 30px;
`;

const Quotation = ({criptoCurrencyInfo}) => {

    if(Object.keys(criptoCurrencyInfo).length === 0) return null;
    return (
        <ResultDiv>
            <Price>The price is: <span>{criptoCurrencyInfo.PRICE}</span> </Price>
            <Info>The highest price of the day is: <span>{criptoCurrencyInfo.HIGHDAY}</span> </Info>
            <Info>The lowest price of the day is: <span>{criptoCurrencyInfo.LOWDAY}</span> </Info>
            <Info>The variance of last 24 hours is: <span>{criptoCurrencyInfo.CHANGEPCT24HOUR}</span> </Info>
            <Info>The last update is: <span>{criptoCurrencyInfo.LASTUPDATE}</span> </Info>
        </ResultDiv>
    );
}
export default Quotation;