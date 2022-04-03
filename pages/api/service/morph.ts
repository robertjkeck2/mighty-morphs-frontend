import type { NextApiRequest, NextApiResponse } from "next";

const ENDPOINT = "https://api.mightymorphs.com/image/";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, token, url } = JSON.parse(req.body);

  try {
    return fetch(ENDPOINT + address, {
      method: "PATCH",
      body: JSON.stringify({
        address,
        token,
        url,
      }),
    })
      .then((r) => {
        if (r.status == 200) {
          return r.json();
        } else {
          return JSON.stringify({ address: "", url: "" });
        }
      })
      .then((json) => res.status(200).json(json));
  } catch (err) {
    res.status(400).json({ address: "", url: "" });
  }
};

export default handler;
