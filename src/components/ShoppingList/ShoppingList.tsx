import React from "react";
import "./ShoppingList.css";
import { Box, Heading, List, ListItem, IconButton, ButtonGroup, useDisclosure, Stack } from "@chakra-ui/react";
import { EditIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import ShoppingListItem from "./../ShoppingListItem/ShoppingListItem.tsx";
import { Grid, GridItem } from '@chakra-ui/react'

function ShoppingList({shoppingList, addToShoppingList }) {

    function remove_product(product) {
        const new_shopping_list = [...shoppingList];
        const index = new_shopping_list.findIndex((p) => p.id === product.id);
        new_shopping_list.splice(index, 1);
        addToShoppingList(new_shopping_list);
    }

  return (
    <Box my={150}>
        <Heading as='h1' size='xl'>Handleliste</Heading>
        <List pt={5}>
            {shoppingList.map((product, index) => (
                <ListItem className="relative" key={index}>
                    <div className="w-70 list-item"><p><strong>{product.quantity} {product.type}</strong>: {product.name}</p></div>
                 
                    <ButtonGroup size={"lg"} className="shoppinglist-buttons absolute-right" variant='outline'>
                        
                        <ShoppingListItem id={product.id} quantity={product.quantity} shoppingList={shoppingList} addToShoppingList={addToShoppingList} />
                        <IconButton className="shoppinglist-buttons-button" mx={1} aria-label='Fjern fra liste' icon={<DeleteIcon />}
                        onClick={() => {
                            remove_product(product);
                        }} />
                            
                    </ButtonGroup>
                  
                    
                </ListItem>
            ))}
        </List>
    </Box>
    )
}

export default ShoppingList;