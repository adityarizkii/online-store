import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { push } = useRouter();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const Form = e.target as HTMLFormElement;
    const formData = new FormData(Form);
    const formDataObject = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    try {
      const res = await signIn("credentials", {
        email: formDataObject.email,
        password: formDataObject.password,
        redirect: false,
      });

      setIsLoading(false);
      if (res?.error) {
        setError("Email or password is incorrect");
      } else {
        push("/");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };
  return (
    <div className="flex justify-center">
      <form
        className="flex shadow-[0_0_3px_0_#000000] rounded flex-col gap-2 mt-4 p-4"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-1">
          <label className="">Email</label>
          <input type="email" name="email" className="bg-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input type="password" name="password" className="bg-gray-300" />
        </div>
        <p className="text-red-500">{error}</p>
        <button type="submit" className="text-white bg-black">
          {isLoading ? "Loading" : "Login"}
        </button>
        <p>
          Dont have an account?
          <Link href={"/auth/register"} className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/", redirect: false })}
      >
        Login with google
      </button>
    </div>
  );
};

export default LoginPage;
