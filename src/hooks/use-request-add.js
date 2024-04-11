import { useState } from 'react';

export const useRequestAdd = (refreshProducts) => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAdd = () => {
    setIsCreating(true);
    fetch('http://localhost:3005/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        name: 'Новый пылесос',
        price: 45,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        refreshProducts();
        console.log(response);
      })
      .finally(() => setIsCreating(false));
  };

  return {
    isCreating,
    requestAdd,
  };
};
