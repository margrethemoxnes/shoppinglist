import React, { useEffect, useState, useRef } from "react";
import { Image, Box, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, Divider, Grid, GridItem,} from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer';
import './Products.css'
import AddToList from "../AddToList/AddToList.tsx"
import ProductItem from "../ProductItem/ProductItem.tsx";

function Products({products, setProducts, addToShoppingList, shoppingList, productListBottom, setProductListBottom}) {

  const { ref: divRef, inView: inView } = useInView({ threshold: 0 });

  const [ quantityForProduct, setQuantity ] = useState({quantity: 0, productId: 0});

 
  useEffect(() => { 
    if( quantityForProduct.quantity == 0){
      return;
    }
    const btn = document.getElementById('add-'+ quantityForProduct.productId);
    btn?.setAttribute('quantity', quantityForProduct.quantity.toString());
  }, [quantityForProduct]);


useEffect(() => {
    if(inView){
      setProductListBottom(inView);
    }
}, [inView]);

const filteredProducts = products.filter( product => product.current_price != 0 );



return (
    <div id="productList">
     
      {  ( !filteredProducts?.noResults && filteredProducts.length != 0) && filteredProducts.map((product, index) => ( 
       
          <Grid ref={divRef} key={index} templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)">
        
            <GridItem rowSpan={3} colSpan={2} gap={5} pb={10}>
              <Image pr={5} fallbackSrc="https://via.placeholder.com/250" objectFit='cover' src={product.image} alt={product.name} className="margin-auto" />
            </GridItem>

            <GridItem colSpan={3} gap={5}>
              <h2 className="title">{product.name}</h2>
            </GridItem>

            <GridItem colSpan={3} gap={5}>
              <NumberInput id={'quantity-' + product.id} defaultValue={1} onChange={(e) => { 
                setQuantity({quantity: parseInt(e), productId: product.id})
        
                }}>
                <NumberInputField  />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </GridItem>
            <GridItem colSpan={3} pl={5}>
            
              <ProductItem product={product} products={products} setProducts={setProducts} /> 

            </GridItem>
          
            <GridItem colSpan={3} gap={5}>

              <AddToList id={'add-' + product.id} label="Legg til" product={product} shoppingList={shoppingList} addToShoppingList={addToShoppingList} quantity={1} />
    
            </GridItem>

            <GridItem rowSpan={1} colSpan={5} py={10}>
              <Divider />
            </GridItem>
            
          </Grid>

        )) 
      
      }

    </div>
  )
}
export default Products