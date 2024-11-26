"use client";
import { RegisterUser, UserLogin } from "@/actions/auth/auth.actions";
import { titleFont } from "@/config/fonts";
import { useToastStore } from "@/store";
import { sleep } from "@/utils";
import clsx from "clsx";
import { useForm } from "react-hook-form";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}


export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const showToast = useToastStore((state) => state.showToast);

  const handleRegister = async (data: FormInputs) => {
    const { name, email, password } = data;

    const response = await RegisterUser(name, email, password);
    if (!response.ok) {
      showToast(response.message,'error');
      return;
    }
    showToast(response.message,'success');
    await sleep(2);
    await UserLogin(email.toLowerCase(), password);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
        <h1 className={`${titleFont.className} text-4xl mb-5`}>Register</h1>

        <form className="flex flex-col" onSubmit={handleSubmit(handleRegister)}>
          <label htmlFor="name">Name</label>
          <input
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 outline-none",
              {
                "border-red-500": !!errors.name,
              }
            )}
            type="name"
            placeholder="Your name"
            {...register("name", { required: true })}
          />

          <label htmlFor="email">Email</label>
          <input
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 outline-none",
              {
                "border-red-500": !!errors.email,
              }
            )}
            type="email"
            placeholder="example@example.com"
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
          {errors.email?.type === "pattern" && (
            <span className="antialiased text-red-500">Invalid email</span>
          )}

          <label htmlFor="password">Password</label>
          <input
            className={clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 outline-none",
              {
                "border-red-500": !!errors.password,
              }
            )}
            type="password"
            placeholder="******"
            {...register("password", { required: true, minLength: 6 })}
          />
          <button className="btn-primary">Register</button>
        </form>
      </div>
    </>
  );
};
