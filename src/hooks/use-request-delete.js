import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDelete = () => {
    setIsDeleting(true);

    const hairDryerDb = ref(db, 'products/003');

    remove(hairDryerDb)
      .then((response) => {
        console.log('Фен удален', response);
      })
      .finally(() => setIsDeleting(false));
  };

  //   fetch('http://localhost:3005/products/003', {
  //     method: 'DELETE',
  //   })
  //     .then((rawResponse) => rawResponse.json())
  //     .then((response) => {
  //       refreshProducts();
  //       console.log('Фен удален', response);
  //     })
  //     .finally(() => setIsDeleting(false));
  // };

  return {
    isDeleting,
    requestDelete,
  };
};
