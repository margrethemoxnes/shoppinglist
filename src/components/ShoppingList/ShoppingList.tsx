import React from "react";
import "./ShoppingList.css";
import { Box, Heading, List, ListItem, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons'

function ShoppingList({shoppingList}) {
  return (
    <Box my={6}>
        <Heading as='h1' size='xl'>Handleliste</Heading>
        <List pt={5}>
            {shoppingList.map((product, index) => (
                <ListItem key={index}>
                    {product.name} - {product.quantity} {product.type} 
                    <IconButton mx={1} aria-label='Legg til' icon={<AddIcon />} />
                    <IconButton mx={1} aria-label='Reduser' icon={<MinusIcon />} />
                    <IconButton mx={1} aria-label='Fjern fra liste' icon={<DeleteIcon />} />
                </ListItem>
            ))}
        </List>
    </Box>
    )
}

export default ShoppingList;