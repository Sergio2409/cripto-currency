import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;
const SelectCurency = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCriptoMoneda = (label, stateInicial, options) => {
    
    //State of our custom hook
    const [state, setstate] = useState(stateInicial);
    
    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <SelectCurency
                onChange={e => setstate(e.target.value)}
                value={state}
            >
                <option value=''>- Seleccione -</option>
                {options.map(option => (
                    <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>{option.CoinInfo.FullName}</option>
                ))}
            </SelectCurency>
        </Fragment>
    );

    // Returns the state, the interaface and function 
    // that modify the state
    return [state, SelectCripto, setstate];
}

export default useCriptoMoneda;