import React from "react";
import AddToList from "./../AddToList/AddToList.tsx"
import { Box } from "@chakra-ui/react";

function NoResult({products, shoppingList, addToShoppingList}){
    const quantity = {value: 1};
    return(
        <div>
    <Box mb={3}>
        <h2>Beklager, fant ingen varer.</h2> 
        <p>Ønsker du å legge til varen i handlelisten?</p>
        
    </Box>
    <Box mb={3}>
    <AddToList id="add-manually" label="Legg til" product={products[0]} quantity={quantity} shoppingList={shoppingList} addToShoppingList={addToShoppingList}/>
    </Box>
    </div>
    )
}

export default NoResult;