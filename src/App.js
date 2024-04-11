import { useState } from 'react';
import styles from './app.module.css';
import {
  useRequestAdd,
  useRequestUpdate,
  useRequestDelete,
  useRequestGetProducts,
} from './hooks';

export const App = () => {
  const [refreshProductsFlag, setrefreshProductsFlag] = useState(false);
  const refreshProducts = () => setrefreshProductsFlag(!refreshProductsFlag);

  const {isLoading, products} = useRequestGetProducts(refreshProductsFlag);
  const {isCreating, requestAdd} = useRequestAdd(refreshProducts);
  const {isUpdating, requestUpdate} = useRequestUpdate(refreshProducts);
  const {isDeleting, requestDelete} = useRequestDelete(refreshProducts);
  // useEffect(() => {
  //   setIsLoading(true);
  //   // Server Mock
  //   // new Promise((resolve) => {
  //   //   setTimeout(() => {
  //   //     resolve({ json: () => DATA });
  //   //   }, 1000);
  //   // })
  //   //   .then((loadedData) => loadedData.json())
  //   //   .then((loadedProducts) => {
  //   //     setProducts(loadedProducts);
  //   //   })
  //   //   .finally(() => setIsLoading(false));

  //   fetch('http://localhost:3005/products')
  //     .then((loadedData) => loadedData.json())
  //     .then((loadedProducts) => setProducts(loadedProducts))
  //     .finally(() => setIsLoading(false));
  // }, [refreshProductsFlag]);

  // const requestAddVacuumCleaner = () => {
  //   setIsCreating(true);
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

  // const requestUpdate = () => {
  //   setIsUpdating(true);
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

  // const requestDelete = () => {
  //   setIsDeleting(true);
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

  return (
    <div className={styles.App}>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        products.map(({ id, name, price }) => (
          <div key={id}>
            {name} - {price} руб.
          </div>
        ))
      )}
      <button disabled={isCreating} onClick={requestAdd}>
        Добавить пылесос
      </button>
      <button disabled={isUpdating} onClick={requestUpdate}>
        Обновить смартфон
      </button>
      <button disabled={isDeleting} onClick={requestDelete}>
        Удалить
      </button>
    </div>
  );
};
