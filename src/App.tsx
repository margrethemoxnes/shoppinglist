import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import Products from './components/Products/Products.jsx';
import './App.css';
import ShoppingList from './components/ShoppingList/ShoppingList.tsx';
import { Container } from '@chakra-ui/react';


function App() {

  const [products, setProducts] = React.useState([]);
  const [shoppingList, addToShoppingList] = React.useState([]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    console.log(shoppingList)
  }, [shoppingList]);

  return (
    <div>
      
      <header>
        
      </header>
      <Container>

      <SearchBar products={products} setProducts={setProducts} />

      
        { products.length != 0 ? <Products products={products} setProducts={setProducts} addToShoppingList={addToShoppingList} shoppingList={shoppingList} /> : ''}
    

      { shoppingList.length != 0 ? <ShoppingList shoppingList={shoppingList} addToShoppingList={addToShoppingList} /> : ''}
      </Container>



    </div>
  );
}

export default App;
