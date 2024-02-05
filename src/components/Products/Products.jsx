import React from "react";
import { Image, Box, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
IconButton, HStack, SimpleGrid } from '@chakra-ui/react'
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
      <IconButton my={2} aria-label='Lukk' icon={<CloseIcon />}
      onClick={() => { setProducts([]); }} />
      <SimpleGrid columns={3} spacing={10}>
    {  (products.length != 0) ? products.map((product) => (
       <Box key={product.id} h='350px' w='200px'>
         <Image fallbackSrc="https://via.placeholder.com/250" h='200px' objectFit='cover' src={product.image} alt={product.name} className="margin-auto" />
 
       <h2 className="title">{product.name}</h2>
       {/* <p>kr {product.current_price.toString().split('.')[1].length < 2  ? product.current_price + '0' : product.current_price }</p>
       <Image src={product.store.logo} alt={product.store.name} w='50px' /> */}
       <HStack>
       <NumberInput id={'quantity-' + product.id} defaultValue={1}>
         <NumberInputField  />
         <NumberInputStepper>
           <NumberIncrementStepper />
           <NumberDecrementStepper />
         </NumberInputStepper>
       </NumberInput>
       <IconButton aria-label='Legg til handleliste' icon={<AddIcon />}
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
         } />
       </HStack>
     </Box> 
 
     )) : '' }
       </SimpleGrid>
    </div>
  )
}
export default Products