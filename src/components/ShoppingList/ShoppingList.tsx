import React from "react";
import "./ShoppingList.css";
import { Box, Heading, List, ListItem, IconButton, ButtonGroup } from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons'

function ShoppingList({shoppingList, addToShoppingList}) {


    function adjust_quantity(product, add:boolean) {
        const new_shopping_list = [...shoppingList];
        const index = new_shopping_list.findIndex((p) => p.id === product.id);
        if( add ){

            new_shopping_list[index].quantity++;
        } else {
            new_shopping_list[index].quantity--;
        }
        addToShoppingList(new_shopping_list);
    }

    function remove_product(product) {
        const new_shopping_list = [...shoppingList];
        const index = new_shopping_list.findIndex((p) => p.id === product.id);
        new_shopping_list.splice(index, 1);
        addToShoppingList(new_shopping_list);
    }

  return (
    <Box my={6}>
        <Heading as='h1' size='xl'>Handleliste</Heading>
        <List pt={5}>
            {shoppingList.map((product, index) => (
                <ListItem key={index}>
                    <div>{product.name} - {product.quantity} {product.type} </div>
                    <ButtonGroup className="shoppinglist-buttons" variant='outline' spacing='1'>
                    <IconButton className="shoppinglist-buttons-button" mx={1} aria-label='Legg til' icon={<AddIcon />}
                    onClick={() => {
                        adjust_quantity(product, true);
                    }} />
                    <IconButton className="shoppinglist-buttons-button" mx={1} aria-label='Reduser' icon={<MinusIcon />} onClick={() => { adjust_quantity(product, false); }} />
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