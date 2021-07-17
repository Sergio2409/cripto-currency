import React, { useEffect, useState} from 'react';
import styled from '@emotion/styled'

import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptoMoneda';
import Error from './Error';
import axios from 'axios';


const Button = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }

`;

const Form = ({saveCurrency, saveCriptoCurrency}) => {

    //Cripto currencies list state
    const [criptoList, setCriptoList] = useState([]);
    const [errorForm, setErrorForm] = useState(false);

    const CURRENCIES = [
        {code: "USD", name: 'Dolar USA'},
        {code: "MXN", name: 'Mexican Peso'},
        {code: "EUR", name: 'Euro'},
        {code: "GBP", name: 'Libra Esterlina'},
    ]
    //Use useMoneda 
    const [currency, Select] = useMoneda('Choose your currency', '', CURRENCIES);

    //Use useCriptoMoneda 
    const [criptoCurrency, SelectCripto] = useCriptoMoneda('Choose your cripto currency', '', criptoList);

    //Exucute API call to get the cripto currencies
    useEffect(() => {
        const fetchAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const result = await axios.get(url);
            setCriptoList(result.data.Data);
        }

        fetchAPI();
    }, []);

    // On Submit
    const quoteCurrency = e => {
        e.preventDefault();
        
        //Validate if both fields are filled
        if(currency === "" || criptoCurrency === "")
        {
            setErrorForm(true);
            return;
        }
        //Pass the data to the main componnent
        setErrorForm(false);

        saveCurrency(currency);
        saveCriptoCurrency(criptoCurrency);
    }

    return ( 
        <form 
            onSubmit={quoteCurrency}
        >
            {errorForm ? <Error message='All fields are obligatory' /> : null}
            <Select />
            <SelectCripto />
            <Button type='submit'>Calcular</Button>
        </form>
     );
}
 
export default Form;