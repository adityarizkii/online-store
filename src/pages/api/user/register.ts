import { signUp } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { email, password } = req.body;
  // signUp(email, password).then((user) => {
  //   res.status(200).json(user);
  // });
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status) {
        res.status(200).json({ status: true, message: "success" });
      } else {
        res.status(400).json({ status: false, message: "failed" });
      }
    });
  } else {
    res.status(405).json({ status: false, message: "method not allowed" });
  }
}

export default handler;
