import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function Home() {
  const { data } = useSession();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    console.log(data);
    if (data && data.user) {
      setUser(data.user);
    }
  }, [data]);

  return (
    <div className="">
      <h2>{user?.fullname}</h2>
      <h1>Home Page</h1>
      <button onClick={() => signIn()}>Login</button>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export default Home;
