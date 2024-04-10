import { useEffect } from 'react';
import { useState } from 'react';
import styles from './app.module.css';
import DATA from './data.json';

export const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshProductsFlag, setrefreshProductsFlag] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const refreshProducts = () => setrefreshProductsFlag(!refreshProductsFlag);

  useEffect(() => {
    setIsLoading(true);
    // Server Mock
    // new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({ json: () => DATA });
    //   }, 1000);
    // })
    //   .then((loadedData) => loadedData.json())
    //   .then((loadedProducts) => {
    //     setProducts(loadedProducts);
    //   })
    //   .finally(() => setIsLoading(false));

    fetch('http://localhost:3005/products')
      .then((loadedData) => loadedData.json())
      .then((loadedProducts) => setProducts(loadedProducts))
      .finally(() => setIsLoading(false));
  }, [refreshProductsFlag]);

  const requestAddVacuumCleaner = () => {
    setIsCreating(true);
    fetch('http://localhost:3005/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8'},
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
  }

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
      <button disabled={isCreating} onClick={requestAddVacuumCleaner}>Добавить пылесос</button>
    </div>
  );
};
