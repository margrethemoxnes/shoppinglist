import React, {useEffect, useState} from "react";
import { Button } from "@chakra-ui/react";
import { AddIcon, CheckIcon } from '@chakra-ui/icons'

function AddToList({ products, setProductsByEan, chosenPrice, id, label, product, quantity, shoppingList, addToShoppingList}) {
    const [addedToList, setAddedToList] = useState([0 , false]); // @params: [productId: int, addedToList: bool]
 
    function convertUnits(weightUnit, weight){
      if( weightUnit == 'ml'){
        if( weight >= 1000){
          return 'liter';
        }
      }
      return 'stk';
    }

    // function updateProduct(product, chosenPrice){
    //   var index = products.findIndex( theProduct => theProduct.ean == product.ean );

    //   products[index].current_price = chosenPrice.current_price.price;
    //   products[index].store = chosenPrice.store;
    // }


    useEffect(() => {
        const delay = setTimeout(() => { setAddedToList([0, false]) }, 1000);
        return () => clearTimeout(delay);

    }, [addedToList]);


    return (

      <>
        { addedToList[0] === product.id && addedToList[1] === true ?  
          
          <Button leftIcon={<CheckIcon />} colorScheme="pink" variant="outline" size="lg" aria-label='Lagt til handleliste'>Lagt til</Button> 
        
        :

          <Button id={id} leftIcon={<AddIcon />} colorScheme='pink' variant='solid' size="lg" aria-label={label} 
          onClick={(e) => { 
            var quantity_attribute = e.currentTarget?.attributes['quantity'] != undefined ? e.currentTarget?.attributes['quantity']?.value : 1;

            setAddedToList([product.id, true]);

            //updateProduct(product, chosenPrice);
    
            if (shoppingList.some(item => item.id === product.id)) {
              const index = shoppingList.findIndex(item => item.id === product.id)
              const newShoppingList = [...shoppingList]
              newShoppingList[index].quantity = parseInt(newShoppingList[index].quantity) != undefined ? parseInt(newShoppingList[index].quantity) + parseInt(quantity_attribute) : parseInt(quantity_attribute)
              addToShoppingList(newShoppingList)
            } 
            
            if( shoppingList.some(item => item.store === product.store.name) ){
              const index = shoppingList.findIndex(item => item.store === product.store.name)
              const newShoppingList = [...shoppingList]
              newShoppingList[index].items = [...newShoppingList[index].items, 
                { id: product.id, name: product.name, image: product.image, price: product.current_price, quantity: parseInt(quantity_attribute), type: convertUnits(product.weight_unit, product.weight) }]
              addToShoppingList(newShoppingList)
            } else {
              addToShoppingList(shoppingList => [...shoppingList,
                { store: product.store.name,
                items:[{
                  id: product.id,
                  name: product.name, 
                  image: product.image, 
                  price: product.current_price,
                  quantity: parseInt(quantity_attribute),
                  type: convertUnits(product.weight_unit, product.weight),
                }]} 
            
            ] )} }
          
          } > {label}</Button>
        }
      </>
    )
}

export default AddToList;