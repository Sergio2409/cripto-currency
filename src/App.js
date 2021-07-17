import React, { useState, useEffect} from 'react';
import styled from '@emotion/styled'
import imagen from './cryptomonedas.png'
import Form from './components/Form';
import Quotation from './components/Quotation';
import Spinner from './components/Spinner';
import axios from 'axios';

const Container = styled.div`
  max-width:900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-bottom: 80px

  &:after{
    content: ''
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [currency, saveCurrency] = useState('');
  const [criptoCurrency, saveCriptoCurrency] = useState('');
  const [criptoCurrencyInfo, saveCriptoCurrencyInfo] = useState({});
  const [loading, saveLoading] = useState(false);

  useEffect(() => {
    
    const quoteCurrency = async () => {
      //avoid execution at the first time
      if(currency === '') return;
      //Consult the API to get the quotation
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoCurrency}&tsyms=${currency}`;
      const result = await axios.get(url);

      //Display the spinner
      saveLoading(true);

      //Hide the spinner and display  the result
      setTimeout(() => {
        saveLoading(false);
        saveCriptoCurrencyInfo(result.data.DISPLAY[criptoCurrency][currency]);
      }, 3000);
  }
  quoteCurrency();
  }, [currency, criptoCurrency]);

  const SpinerOrResult = (loading) ? <Spinner /> : <Quotation criptoCurrencyInfo={criptoCurrencyInfo}/>;

  return (
    <Container>
      <div>
        <Imagen 
          src={imagen} 
          alt='Imagen Crypto'
          />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Form 
          saveCurrency={saveCurrency}
          saveCriptoCurrency={saveCriptoCurrency}
          />
        {SpinerOrResult}
      </div>
    </Container>
  );
}

export default App;
