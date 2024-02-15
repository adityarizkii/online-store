import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
  userData: {
    fullname: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: Function
) {
  const users = await retrieveDataByField("users", "email", userData.email);

  if (users.length > 0) {
    callback(false);
  } else {
    if (!userData.role) userData.role = "member";

    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();

    await addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

export async function signIn(email: string) {
  const users = await retrieveDataByField("users", "email", email);
  if (users) {
    return users[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callback: Function) {
  const users = await retrieveDataByField("users", "email", data.email);
  if (users.length > 0) {
    callback(users[0]);
  } else {
    data.role = "member";
    await addData("users", data, (result: boolean) => {
      if (result) callback(data);
    });
  }
}
