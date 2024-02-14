import { signIn } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await signIn("adit@toko.com");
  res.status(200).json(data);
}

export default handler;
