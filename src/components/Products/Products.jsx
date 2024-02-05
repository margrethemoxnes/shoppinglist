import React from "react";
import { Image, Box, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
IconButton, Button, Divider, Grid, GridItem } from '@chakra-ui/react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import './Products.css'

function Products({products, setProducts, addToShoppingList, shoppingList}) {

  function convertUnits(weightUnit, weight){
    console.log(weightUnit, weight);
    if( weightUnit == 'ml'){
      if( weight >= 1000){
        return 'liter';
      }
    }
    return 'stk';
  }

  return (
    <div>
      {/* <IconButton mr={0} my={2} aria-label='Lukk' icon={<CloseIcon />}
      onClick={() => { setProducts([]); }} /> */}
     
    {  (products.length != 0) ? products.map((product, index) => (
      <Grid key={index} templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)">
      
    
     
       {/* /* <p>kr {product.current_price.toString().split('.')[1].length < 2  ? product.current_price + '0' : product.current_price }</p>
       <Image src={product.store.logo} alt={product.store.name} w='50px' /> */
       /* <HStack align="stretch"> */ }
    
    
        <GridItem rowSpan={3} colSpan={2} gap={5} pb={10}>
          <Image pr={5} fallbackSrc="https://via.placeholder.com/250" objectFit='cover' src={product.image} alt={product.name} className="margin-auto" />
        </GridItem>
        <GridItem colSpan={3} gap={5}>
        <h2 className="title">{product.name}</h2>
        </GridItem>
        <GridItem colSpan={3} gap={5}>
          <NumberInput id={'quantity-' + product.id} defaultValue={1}>
            <NumberInputField  />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
     </GridItem>
     {/* <GridItem colSpan={3} pl={5}>
        <p className="price">{product.current_price.toString().split('.')[1].length < 2  ? product.current_price + '0,-' : product.current_price + ',-' }</p>
          </GridItem>
          <GridItem colSpan={1} pl={0}>
          <Image src={product.store.logo} alt={product.store.name} w='50px' />
          </GridItem> */}
     <GridItem colSpan={3} gap={5}>

     <Button leftIcon={<AddIcon />} colorScheme='pink' variant='solid' size="lg" aria-label='Legg til handleliste' 
          onClick={() => { 
    
            if (shoppingList.some(item => item.id === product.id)) {
              const index = shoppingList.findIndex(item => item.id === product.id)
              const newShoppingList = [...shoppingList]
              newShoppingList[index].quantity = parseInt(newShoppingList[index].quantity) + parseInt(document.getElementById('quantity').value)
              addToShoppingList(newShoppingList)
              
            } else {
            
            addToShoppingList(shoppingList => [...shoppingList, 
            {
              id: product.id,
              name: product.name, 
              image: product.image, 
              price: product.current_price,
              quantity: parseInt( document.getElementById('quantity-' + product.id).value ),
              type: convertUnits(product.weight_unit, product.weight),
            }])} 
            }
            } > Legg til</Button>
        </GridItem>

        <GridItem rowSpan={1} colSpan={5} py={10}>
          <Divider />
          </GridItem>
           
       </Grid>
     )) : '' }
    </div>
  )
}
export default Products