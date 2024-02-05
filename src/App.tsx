import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import Products from './components/Products/Products.jsx';
import './App.css';
import ShoppingList from './components/ShoppingList/ShoppingList.tsx';
import { Box, Center, Container, Flex, Spinner } from '@chakra-ui/react';


function App() {

  const [products, setProducts] = React.useState([]);
  const [shoppingList, addToShoppingList] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);

  return (
  
      <Container>

      <SearchBar products={products} setProducts={setProducts} setSpinner={setSpinner} spinner={spinner} />

      { spinner ? <Flex alignItems="center"><Spinner /></Flex> : ''}
      
      { products.length != 0 ? <Products products={products} setProducts={setProducts} addToShoppingList={addToShoppingList} shoppingList={shoppingList} /> : ''}

      { shoppingList.length != 0 ? <ShoppingList shoppingList={shoppingList} addToShoppingList={addToShoppingList} /> : ''}

      </Container>
  );
}

export default App;
