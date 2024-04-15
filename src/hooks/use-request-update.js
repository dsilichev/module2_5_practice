import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdate = (refreshProducts) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdate = () => {
    setIsUpdating(true);

    const smartphoneDbRef = ref(db, 'products/002');

    set(smartphoneDbRef, {
      name: 'Смартфон',
      price: 16700,
    })
    .then((response) => {
      // refreshProducts();
      console.log('Смартфон обновлен', response);
    })
    .finally(() => setIsUpdating(false));
};

  //   fetch('http://localhost:3005/products/002', {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json;charset=utf-8' },
  //     body: JSON.stringify({
  //       name: 'Новый смартфон',
  //       price: 30,
  //     }),
  //   })
  //     .then((rawResponse) => rawResponse.json())
  //     .then((response) => {
  //       refreshProducts();
  //       console.log(response);
  //     })
  //     .finally(() => setIsUpdating(false));
  // };
  return {
    isUpdating,
    requestUpdate,
  }
};
