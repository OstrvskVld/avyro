import Form from "../../components/Form/Form.tsx";
import type {SignUpRequest} from "../../domains/users/types.ts";
import TextInput from "../../components/TextInput/TextInput.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router-dom";
import {useSignUp} from "../../domains/users/useSignUp/useSignUp.ts";

export default function SignUpPage() {
  const {mutate, isPending} = useSignUp();

  const onSubmit = (data: SignUpRequest) => {
    mutate({
      ...data,
      isActive: true,
      profile: null,
    });
  };

  return (
    <div className="wrapper">
      <Form<SignUpRequest>
        onSubmit={onSubmit}
        title="Реєстрація в Avyro"
        subtitle="Створи акаунт, щоб почати"
      >
        {() => (
          <>
            <TextInput
              name="email"
              label="Електронна пошта"
              type="email"
              placeholder="doctor@avyro.com"
              rules={{
                required: "Введіть email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Некоректний email",
                },
              }}
            />

            <TextInput
              name="password"
              label="Пароль"
              type="password"
              placeholder="********"
              rules={{
                required: "Введіть пароль",
                minLength: {
                  value: 6,
                  message: "Мінімум 6 символів",
                },
              }}
            />

            <TextInput
              name="role"
              label="Роль"
              type="text"
              placeholder="DOCTOR"
              rules={{
                required: "Вкажіть роль",
              }}
            />

            <div className="form-footer">
              <Button
                variant="primary"
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                Зареєструватись
              </Button>

              <div className={"sign-up-flow"}>
                <p>Вже маєш акаунт?</p>
                <Link to={"/sign-in"}>Увійти</Link>
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
