import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import Products from './components/Products/Products.jsx';
import ShoppingList from './components/ShoppingList/ShoppingList.tsx';
import { Box, Center, Container, Flex, Spinner } from '@chakra-ui/react';
import NoResult from './components/NoResult/NoResult.tsx';


function App() {
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState([{noResults: false}]);
  const [shoppingList, addToShoppingList] = React.useState(() => {
    const saved = localStorage.getItem('shoppingList');
    const initialValue = saved != undefined ? JSON.parse(saved) : [];
    return initialValue;
  
  });
  const [spinner, setSpinner] = React.useState(false);
  const [ productListBottom, setProductListBottom ] = useState(false);


  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));  
  }, [shoppingList]);

  return (
  
      <Container>

        <SearchBar products={products} setProducts={setProducts} spinner={spinner} setSpinner={setSpinner} search={search} setSearch={setSearch} productListBottom={productListBottom} setProductListBottom={setProductListBottom} />

        { spinner ? <Center mt={150}><Spinner /></Center> : '' }
        
          { products[0].noResults == true ? <NoResult products={products} shoppingList={shoppingList} addToShoppingList={addToShoppingList} /> : '' }

      
          {( products.length != 0 && products[0].noResults == undefined ) ? 
            <>
              <Products products={products} setProducts={setProducts} addToShoppingList={addToShoppingList} shoppingList={shoppingList} productListBottom={productListBottom} setProductListBottom={setProductListBottom} />
              { spinner ? <Center mt={5} mb={10}><Spinner /></Center> : '' }
            </>  
              : ''}

          { shoppingList.length != 0 ? <ShoppingList shoppingList={shoppingList} addToShoppingList={addToShoppingList} /> : ''}

      </Container>
  );
}

export default App;
