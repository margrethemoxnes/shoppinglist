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

    function remove_product(product, storeIndex, productIndex) {
        const new_shopping_list = [...shoppingList];
        new_shopping_list[storeIndex].items.splice(productIndex, 1);
        if(new_shopping_list[storeIndex].items.length == 0){
            new_shopping_list.splice(storeIndex, 1);
        }
        addToShoppingList(new_shopping_list);
    }

    function getShoppingListTotal(){
        let total = 0;
        shoppingList.map((store) => {
            store.items.map((item) => {
                total += item.price * item.quantity;
            })
        })
        return total.toFixed(2);
    }

  return (
    <Box my={150}>
        <Heading as='h1' size='xl' pb={7}>Handleliste</Heading>
        {shoppingList.map((product, index) => (
            <>
            <Heading key={index} as='h2' size='l'>{product.store}</Heading>
            
                <List>
                    {product.items.map((p, p_index) => (
                        <ListItem className="relative" key={p_index}>
                            <div className="w-60 list-item"><p><strong>{p.quantity} {p.type}</strong>: {p.name}</p><p>kr {p.price}</p></div>
                        
                            <ButtonGroup size={"lg"} className="shoppinglist-buttons absolute-right" variant='outline'>
                                
                                <ShoppingListItem id={p.id} quantity={p.quantity} shoppingList={shoppingList} addToShoppingList={addToShoppingList} store={product.store} />
                                <IconButton className="shoppinglist-buttons-button" mx={1} aria-label='Fjern fra liste' icon={<DeleteIcon />}
                                onClick={() => {
                                    remove_product(p, index, p_index);
                                }} />
                                    
                            </ButtonGroup>
                        
                            
                        </ListItem>
                    ))}
                        
                </List>
            </>
        ))}
        <Heading as='h3' size='m'>Total sum: kr {getShoppingListTotal()}</Heading>
    </Box>
    )
}

export default ShoppingList;