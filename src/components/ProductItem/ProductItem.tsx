import React, {useEffect, useState} from "react";
import { Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
useDisclosure,
Button, Image, Radio, RadioGroup, SimpleGrid, Box } from "@chakra-ui/react";



function ProductItem({product, products, setProducts}) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [productsByEan, setProductsByEan] = useState([{store:{name:'', code:'', logo:''}, current_price: {price: '', unit_price: '', date: ''}}]);

    const [chosenPrice, setChosenPrice] = useState({store:{name:'', code:'', logo:''}, current_price: {price: '', unit_price: '', date: ''}});

    const [ storeCode, setStoreCode ] = useState(product.store.code);

    var excluded_stores = ['engrosnett']

    const filteredProductsByEan = productsByEan.filter( productByEan => productByEan.store != null ).sort((a,b) => parseFloat(a.current_price.price) - parseFloat(b.current_price.price));

    const openModal = () => { 
        getPriceByEan(product.ean);
        setChosenPrice({store:{name:product.store.name, code:product.store.code, logo:product.store.logo}, current_price: {price: product.current_price, unit_price: '', date: ''}});
        onOpen(); }

    function getPriceByEan(ean){
        fetch('https://kassal.app/api/v1/products/ean/' + ean, {
          method: 'GET',
          headers: new Headers({
              'Authorization' : 'Bearer ' + process.env.REACT_APP_KASSALAPP_API_KEY,
          }),
      } )
      .then((res) => res.json())
      .then((json) => {
          setProductsByEan(json.data.products);
          console.log(json.data.products);
       });
    }


       

       function getPrice(price:string): string{

        if( price == '' || price == undefined ) return '';
      
        const current_price = price.toString().split('.');
      
        var price_with_decimals = price + ',-'
      
        if( current_price[1] && current_price[1].length < 2 ){
            price_with_decimals = price + '0,-';
        }
      
        return price_with_decimals;
      }


      function updateProduct(product, chosenPrice){
        var index = products.findIndex( theProduct => theProduct.ean == product.ean );

        products[index].current_price = chosenPrice.current_price.price;
        products[index].store = chosenPrice.store;
      }
    
    return (
        <>
            <SimpleGrid columns={2} spacing={2} >
            <p className="price">{getPrice(product?.current_price)}</p>
            <Image src={product.store.logo} alt={product.store.name} height="50px" onClick={() => {
               openModal();
            }}/>
            <p onClick={() => { openModal(); }}>Se andre priser</p>
            </SimpleGrid>
                
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sjekk priser</ModalHeader>
                    <ModalBody>
                        { (filteredProductsByEan) &&
                        <>
                        <p><strong>{product.name}</strong></p>
                        <RadioGroup mt={3} onChange={setStoreCode} value={storeCode}> 
                        <SimpleGrid columns={3} spacing={2}>

                            {
                            filteredProductsByEan.map( (productByEan, index) => 
                                    <Box key={index} className="store" onClick={()=>{ setChosenPrice(productByEan); } } >
                                        <Radio name="store" value={productByEan.store.code}>
                                            <p>{productByEan.store?.name +':'}</p><strong>{getPrice(productByEan?.current_price?.price)}</strong>
                                        </Radio>
                                    </Box>
                            )  }

                            </SimpleGrid>
                        </RadioGroup>
                        </>
                            }
                    </ModalBody>
                    <ModalFooter>
                        <Button w="100%" onClick={()=>{
                            setProductsByEan([]);
                            console.log(chosenPrice.store.code);
                      
                            updateProduct(product, chosenPrice);
                            
                            onClose();
                        }}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )


}

export default ProductItem;