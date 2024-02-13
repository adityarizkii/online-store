import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const RegiterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const Form = e.target as HTMLFormElement;
    const formData = new FormData(Form);
    const formDataObject = Object.fromEntries(formData.entries());
    // console.log(formDataObject);
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    });

    if (res.status === 200) {
      push("/login");
    } else {
      console.log("error");
      setIsLoading(false);
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
          <label>Fullname</label>
          <input type="text" name="fullname" className="bg-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label>Phone</label>
          <input type="text" name="phone" className="bg-gray-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input type="password" name="password" className="bg-gray-300" />
        </div>
        <button type="submit" className="text-white bg-black">
          {isLoading ? "Loading" : "Register"}
        </button>
        <p>
          Already have an account?
          <Link href={"/login"} className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegiterPage;
