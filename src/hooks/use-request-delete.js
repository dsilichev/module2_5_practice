import { useState } from 'react';

export const useRequestDelete = (refreshProducts) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const requestDelete = () => {
    setIsDeleting(true);
    fetch('http://localhost:3005/products/003', {
      method: 'DELETE',
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        refreshProducts();
        console.log('Фен удален', response);
      })
      .finally(() => setIsDeleting(false));
  };

  return {
    isDeleting,
    requestDelete,
  };
};
