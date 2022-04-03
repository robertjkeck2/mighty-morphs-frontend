import type { NextApiRequest, NextApiResponse } from "next";

const ENDPOINT = "https://api.mightymorphs.com/mint/finalize";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, id } = JSON.parse(req.body);

  try {
    return fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        address,
        id,
      }),
    })
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          return JSON.stringify({ address: "", id: "" });
        }
      })
      .then((json) => res.status(200).json(json));
  } catch (err) {
    res.status(400).json({ address: "", id: "" });
  }
};

export default handler;
