import React, { useEffect } from "react";
import { Box, Heading, List, ListItem, IconButton, ButtonGroup,  NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button, } from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

function ShoppingListItem({id, store, quantity, shoppingList, addToShoppingList }){

    const { isOpen, onOpen, onClose } = useDisclosure();

    function setQuantity(quantity){
        const new_shopping_list = [...shoppingList];
        const storeIndex = new_shopping_list.findIndex((p) => p.store === store);
        const index = shoppingList[storeIndex].items.findIndex(item => item.id === id)
        new_shopping_list[storeIndex].items[index].quantity = quantity
        addToShoppingList(new_shopping_list);
    }



    return(
        <>
        <IconButton onClick={onOpen} className="shoppinglist-buttons-button" mx={1} aria-label='Legg til' icon={<EditIcon />} />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Endre antall</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <ButtonGroup  w="100%" className="shoppinglist-buttons" variant='outline' spacing='1'>
                                    <NumberInput w="100%" className={'quantity-' + id} defaultValue={quantity} onChange={(e) => { 
                                        setQuantity(e)
                                        }}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </ButtonGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button w="100%" onClick={onClose}>OK</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    </>
        
    )
}

export default ShoppingListItem;