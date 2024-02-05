import React, { Component, useEffect, useState } from "react";
import { Input, FormControl, FormLabel, InputRightElement, IconButton, InputGroup, } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function SearchBar({products, setProducts, setSpinner, spinner}) {

    const [search, setSearch] = React.useState("");

    const handleChange = (e: any) => {
        if(e.target.value.length >= 3) {
        setSearch(e.target.value);
        }
    }

    useEffect(() => {
        const delay = setTimeout(() => {  
            if( search != "") {
                setSpinner(true);
                fetch('https://kassal.app/api/v1/products?search=' + search, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization' : 'Bearer ' + process.env.REACT_APP_KASSALAPP_API_KEY,
                    }),
                } )
                .then((res) => res.json())
                .then((json) => {
                    
                    setSpinner(false);
                    setProducts(json?.data);
                        
                });
        }}, 1000)

        return () => clearTimeout(delay);

    }, [search]);


    return (
        <FormControl pt={5} pb={20}>
            <FormLabel>Søk etter matvare</FormLabel>
            <InputGroup>
            <Input id="searchBar" onChange={handleChange} placeholder='Søk etter matvare...' />
            <InputRightElement>
                { products.length != 0 ?
                <IconButton aria-label='Tøm' icon={<CloseIcon />} onClick={(e) => { 
                    setProducts([]); 
                   let searchBar = document.getElementById('searchBar') as HTMLInputElement;
                     searchBar.value = "";
                     searchBar.focus();
                    }} /> : ''}
            </InputRightElement>
            </InputGroup>
      </FormControl>
    )
    
}

export default SearchBar;