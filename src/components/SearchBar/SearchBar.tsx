import React, { Component, useEffect, useState } from "react";
import { Input, FormControl, FormLabel, } from '@chakra-ui/react'

function SearchBar({products, setProducts}) {

    //const [products, setProducts] = React.useState([]);

    const [search, setSearch] = React.useState("");

    const handleChange = (e: any) => {
        if( e.target.value.length > 6 ) {
            setSearch(e.target.value);
        }
    
    }

    useEffect(() => {
        if( search != "") {
            fetch('https://kassal.app/api/v1/products?search=' + search, {
                method: 'GET',
                headers: new Headers({
                    'Authorization' : 'Bearer ' + process.env.REACT_APP_KASSALAPP_API_KEY,
                }),
            } )
            .then((res) => res.json())
            .then((json) => {
                
                setProducts(json?.data);
                    
            });
        }
    }, [search]);

    return (
        <FormControl p='5'>
            <FormLabel>Søk etter matvare</FormLabel>
            <Input onChange={handleChange} placeholder='Søk etter matvare...' />
      </FormControl>
    )
    
}

export default SearchBar;