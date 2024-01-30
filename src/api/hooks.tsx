import React from 'react';




async function getStores() {
    const data = await fetch("https://kassal.app/api/v1/physical-stores --header 'Authorization: " + process.env.KASSALAPP_API_KEY + " '");
    return await data.json();
}


export default getStores;