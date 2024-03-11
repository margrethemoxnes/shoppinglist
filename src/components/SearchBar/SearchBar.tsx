import React, { Component, useEffect, useState } from "react";
import { Input, FormControl, FormLabel, InputRightElement, IconButton, InputGroup, Button, } from '@chakra-ui/react'
import { CloseIcon, AddIcon } from '@chakra-ui/icons'
import './SearchBar.css'

function SearchBar({products, setProducts, spinner, setSpinner, search, setSearch, productListBottom, setProductListBottom}) {

    const [ searchResults, setSearchResults ] = useState([{id: 0}]);
    const [ page, setPage ] = useState(1);

    function resetSearch(){

        setSearch("");
        setProducts( products = [{ noResults: false}]);
        setPage(1);
    }

    const handleChange = (e: any) => {
        if(e.target.value.length >= 3) {
            setSearch(e.target.value);
        } else {
            resetSearch();
        }
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            if( search != "") {
                triggerAPI(search);
        }}, 1000)
        return () => clearTimeout(delay);
    }, [search]);

    useEffect(() => {
        if( search != "") { 
            triggerAPI(search);
        }
    }, [productListBottom]);


    function triggerAPI(search){
        
        if( !spinner ) { // Only trigger API if not already loading

            setSpinner(true);

            if( productListBottom == true) {
                setPage(page + 1);
            }
          
            fetch('https://kassal.app/api/v1/products?search=' + search + '&page=' + page, {
                method: 'GET',
                headers: new Headers({
                    'Authorization' : 'Bearer ' + process.env.REACT_APP_KASSALAPP_API_KEY,
                }),
            } )
            .then((res) => res.json())
            .then((json) => {

                if( json?.data.length != 0) {
                    
                    if( page == 1) {
                        setSearchResults(json?.data);
                        setProducts(json?.data);
                    } else {

                        if( searchResults[0]?.id != json?.data[0]?.id){
                            setSearchResults(json?.data);
                            setProducts(products => [...products, ...json?.data]);
                        }  
                    }
                } else {
                    const stringId = search.replace(/\s/g, '').toLowerCase();
                    setProducts( products = [{ id: stringId, name: search, noResults: true, image: "", price: 0, weight_unit: "stk", weight: "1"}]);
                }
            }).then(() => {
                setSpinner(false);
                setProductListBottom(false);
            }).catch((error) => { console.log(error); });

        }

    }


    return (
        <div id="search">
            <FormControl>
                <FormLabel>Søk etter dagligvare</FormLabel>
                <InputGroup>
                <Input id="searchBar" onChange={handleChange} placeholder='Søk etter dagligvare...' />
                <InputRightElement>
                    { products.length != 0 ?
                    <IconButton aria-label='Tøm' icon={<CloseIcon />} onClick={(e) => {
                        let searchBar = document.getElementById('searchBar') as HTMLInputElement;
                        searchBar.value = "";
                        searchBar.focus(); 
                        resetSearch();
                        }} /> : ''}
                </InputRightElement>
                </InputGroup>
        
            </FormControl>
        </div>
          
)
    
}

export default SearchBar;