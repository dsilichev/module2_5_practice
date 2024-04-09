import { useEffect } from 'react';
import { useState } from 'react';
import styles from './app.module.css';
import DATA from './data.json';

export const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ json: () => DATA });
      }, 1000);
    })
      .then((loadedData) => loadedData.json())
      .then((loadedProducts) => {
        setProducts(loadedProducts);
      })
      .finally(() => setIsLoading(false));

    // fetch('https://mocki.io/v1/ef63ec9a-c715-43b7-b4cc-b379614e95a8')
    //   .then((loadedData) => loadedData.json())
    //   .then((loadedProducts) => setProducts(loadedProducts));
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
