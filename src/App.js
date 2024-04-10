import { useEffect } from 'react';
import { useState } from 'react';
import styles from './app.module.css';
import DATA from './data.json';

export const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
  }, []);

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
    </div>
  );
};
