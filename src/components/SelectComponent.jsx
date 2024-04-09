import { useState, useRef } from 'react';
import Select from 'react-select';
import styles from '../app.module.css';
import * as yup from 'yup';

const loginChangesScheme = yup
  .string()
  .matches(
    /^[\w_]*$/,
    'Неверный логин. Используйте символы - буквы, цифры и нижнее подчеркивание',
  )
  .max(20, 'Неверный логин. Максимальная длина 20 символов');

const loginBlurScheme = yup.string().min(3, 'Минимальная длина логина 3 символа');

const validateAndGetErrorMessage = (scheme, value) => {
  let errorMessage = null;

  try {
    scheme.validateSync(value, { abortEarly: false });
  } catch ({ errors }) {
    errorMessage = errors.reduce((message, error) => message + error + '\n', '').trim();
  }

  return errorMessage;
};

export const SelectComponent = () => {
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(null);
  const submitButtonRef = useRef(null);

  const onLoginChange = ({ target }) => {
    setLogin(target.value);

    // ручная проверка
    // if (!/^[\w_]*$/.test(target.value)) {
    //   error = 'Неверный логин. Используйте символы - буквы, цифры и нижнее подчеркивание';
    // } else if (target.value.length > 20) {
    //   error = 'Неверный логин. Максимальная длина 20 символов';
    // }
    const error = validateAndGetErrorMessage(loginChangesScheme, target.value);

    setLoginError(error);

    if (target.value.length === 20) {
      submitButtonRef.current.focus();
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(login);
  };

  const onLoginBlur = () => {
    //ручная валидачия
    // if (login.length < 3) {
    //   setLoginError('Минимальная длина логина 3 символа');
    // }
    const error = validateAndGetErrorMessage(loginBlurScheme, login);

    setLoginError(error);
  };

  const productOptions = [
    { value: 'laptop', label: 'Ноутбук' },
    { value: 'tv', label: 'Телевизор' },
    { value: 'smartphone', label: 'Смартфон' },
  ];

  const colorOptions = [
    { value: 'black', label: 'Черный' },
    { value: 'white', label: 'Белый' },
    { value: 'silver', label: 'Серебристый' },
  ];

  const [selectedProducts, setSelectedProducts] = useState('tv');
  const [selectedColors, setSelectedColors] = useState(['black', 'silver', 'silver']);

  const onSelectedProductChange = ({ target }) => {
    setSelectedProducts(target.value);
  };

  const onSelectedColorChange = ({ target }) => {
    const newSelectedColors = [...target.selectedOptions].map(
      (selectedOption) => selectedOption.value,
    );
    setSelectedColors(newSelectedColors);
  };

  return (
    <div>
      <select value={selectedProducts} onChange={onSelectedProductChange}>
        <option value="tv">Телевизор</option>
        <option value="smartphone">Смартфон</option>
        <option value="laptop">Ноутбук</option>
      </select>
      <select multiple={true} value={selectedColors} onChange={onSelectedColorChange}>
        <option value="black">Чёрный</option>
        <option value="white">Белый</option>
        <option value="silver">Серебристый</option>
      </select>
      <Select options={productOptions} defaultValue={productOptions[0]} />
      <Select
        options={colorOptions}
        defaultValue={[colorOptions[0], colorOptions[1]]}
        isMulti={true}
      />

      <form onSubmit={onSubmit}>
        {loginError && <div className={styles.errorLabel}>{loginError}</div>}
        <input
          name="login"
          type="text"
          value={login}
          placeholder="Логин"
          onChange={onLoginChange}
          onBlur={onLoginBlur}
        />
        <button ref={submitButtonRef} type="submit" disabled={loginError !== null}>
          Отправить
        </button>
      </form>
    </div>
  );
};
