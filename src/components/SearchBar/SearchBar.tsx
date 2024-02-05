import React, { Component, useEffect, useState } from "react";
import { Input, FormControl, FormLabel, } from '@chakra-ui/react'

function SearchBar({products, setProducts, setSpinner, spinner}) {

    const [search, setSearch] = React.useState("");

    const handleChange = (e: any) => {
    
        setSearch(e.target.value);
    
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
      
        }

        }, 1000)

        return () => clearTimeout(delay);

            
    }, [search]);

    return (
        <FormControl p='5'>
            <FormLabel>Søk etter matvare</FormLabel>
            <Input onChange={handleChange} placeholder='Søk etter matvare...' />
      </FormControl>
    )
    
}

export default SearchBar;