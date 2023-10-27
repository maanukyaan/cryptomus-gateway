import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// import Swal from "sweetalert2";
import toast from "react-hot-toast";

import styles from "./styles/Buy.module.css";

function Buy() {
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();

  const { categoryName, subcategoryName } = useParams();

  // Переменная состояния для отслеживания количества
  const [count, setCount] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    toast.success(
      "You will now be redirected to the payment page. Please, wait...",
      {
        position: "top-center",
        duration: 10000,
      }
    );

    const formData = {
      amount: String(count * state.price),
      count: count,
      category_name: categoryName,
      subcategory_name: subcategoryName,
      product_name: state.product_title,
    };

    // Добавьте объект formData к существующим данным
    data = { ...data, ...formData };

    // Определите URL вашего бэкенд-сервера
    let serverLink =
      "https://www.main-bvxea6i-ij5pctw5a4zt4.us-3.platformsh.site";
    // serverLink = "http://localhost:5000";

    // Отправьте POST-запрос на бэкенд
    fetch(`${serverLink}/api/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Заголовок для JSON-данных
      },
      body: JSON.stringify(data), // Преобразование данных в формат JSON
    })
      .then((response) => response.json())
      .then((data) => {
        window.open(data.paymentUrl, "_blank");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.Buy}>
      <form
        action="/buy"
        method="POST"
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={styles.category_title}>{state.category_title}</h2>
        <h3 className={styles.product_title}>{state.product_title}</h3>

        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                {...register("name", { required: "Required field" })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <span className={styles.error}>{message}</span>
                )}
              />
            </div>

            <div className={styles.input_group}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                {...register("email", {
                  required: "Required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Fill in your email in the correct format",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <span className={styles.error}>{message}</span>
                )}
              />
            </div>

            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Telegram"
                className={styles.input}
                {...register("telegram", { required: "Required field" })}
              />
              <ErrorMessage
                errors={errors}
                name="telegram"
                render={({ message }) => (
                  <span className={styles.error}>{message}</span>
                )}
              />
            </div>

            <div className={styles.counter_container}>
              <div
                className={
                  count === 1
                    ? `${styles.disabled} ${styles.minus}`
                    : styles.minus
                }
                onClick={() => {
                  // Уменьшаем количество, но не меньше 1
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              >
                -
              </div>
              <input
                className={styles.counter_input}
                type="text"
                name="counter"
                id="counterInput"
                disabled
                value={`${count} pcs`}
              />
              <div
                className={
                  count === state.stock
                    ? `${styles.disabled} ${styles.plus}`
                    : styles.plus
                }
                onClick={() => {
                  // Увеличиваем количество, но не больше, чем stock
                  if (count < state.stock) {
                    setCount(count + 1);
                  }
                }}
              >
                +
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <h2 className={styles.price}>
              TOTAL COST: <b>{count * state.price} USDT</b>
            </h2>
            <button type="submit" className={styles.button}>
              Continue
            </button>
          </div>
        </div>
      </form>

      <button onClick={() => navigate(-1)} className={styles.back}>
        Go back
      </button>
    </div>
  );
}

export default Buy;
