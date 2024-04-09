import { useForm } from 'react-hook-form';
import styles from '../app.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldScheme = yup.object()
.shape({
  login: yup.string()
  .matches(/^[\w_]*$/, 'Неверный логин. Используйте символы - буквы, цифры и нижнее подчеркивание')
  .max(20, 'Должно быть меньше 20 символов')
  .min(3, 'Должно быть больше 3 символов'),
});

export const UseFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
    },
    resolver: yupResolver(fieldScheme), // валидация с помощью yup
  });

  // валидация с помощью react-hook-form
  const loginProps = {
    minLength: { value: 3, message: 'Должно быть больше 3 символов' },
    maxLength: { value: 3, message: 'Должно быть меньше 20 символов' },
    pattern: {
      value: /^[\w_]*$/,
      message:
        'Неверный логин. Используйте символы - буквы, цифры и нижнее подчеркивание',
    },
  };

  const loginError = errors.login?.message;

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <div className={styles.errorLabel}>{loginError}</div>}
        <input name="login" type="text" {...register('login', /*loginProps*/)}></input>
        <button type="submit" disabled={!!loginError}>
          Отправить
        </button>
      </form>
    </div>
  );
};
