import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAdd = () => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAdd = () => {
    setIsCreating(true);

    const productsDbRef = ref(db, 'products');

    push(productsDbRef, {
      name: 'Новый пылесос',
      price: 5990,
    })
      .then((response) => {
        console.log('Элемент добавлен', response);
      })
      .finally(() => setIsCreating(false));
  };

  //   fetch('http://localhost:3005/products', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json;charset=utf-8' },
  //     body: JSON.stringify({
  //       name: 'Новый пылесос',
  //       price: 45,
  //     }),
  //   })
  //     .then((rawResponse) => rawResponse.json())
  //     .then((response) => {
  //       refreshProducts();
  //       console.log(response);
  //     })
  //     .finally(() => setIsCreating(false));
  // };

  return {
    isCreating,
    requestAdd,
  };
};
