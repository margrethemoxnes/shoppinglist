import React from "react";
import AddToList from "./../AddToList/AddToList.tsx"
import { Box, Center, Divider } from "@chakra-ui/react";
import "./NoResult.css";

function NoResult({products, shoppingList, addToShoppingList}){
    const quantity = {value: 1};
    return(
    <div id="noResults">
        <Box mb={3} textAlign={"center"}>
            <h2>Beklager, fant ingen varer.</h2> 
            <p>Ønsker du å legge til varen i handlelisten?</p>
            
        </Box>
        <Box textAlign={"center"}>
        <AddToList id="add-manually" label="Legg til" product={products[0]} quantity={quantity} shoppingList={shoppingList} addToShoppingList={addToShoppingList}/>
        </Box>
    </div>
    )
}

export default NoResult;