import React from "react";
import { Image } from "@chakra-ui/react";

function StorePrice({price, logo, alt, ean, getPriceByEan, setEan, setShowStoreModal}) {
    return (
        <>
            <p className="price">{price}</p>
            <Image src={logo} alt={alt} onClick={() => {
                getPriceByEan(ean);
                setEan(ean);
                setShowStoreModal(true);
            }}/>
        </>
    )
}

export default StorePrice;