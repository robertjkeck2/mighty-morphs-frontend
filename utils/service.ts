export const mintOnService = async (
  address: string
): Promise<{ address: string }> => {
  const response = await fetch(`/api/service/mint`, {
    method: "POST",
    body: JSON.stringify({
      address,
    }),
  });

  const value: { address: string } = await response.json();

  return value;
};

export const morphOnService = async (
  address: string,
  token: string,
  url: string
): Promise<{ address: string; url: string }> => {
  const response = await fetch(`/api/service/morph`, {
    method: "POST",
    body: JSON.stringify({
      address,
      token,
      url,
    }),
  });

  const value: { address: string; url: string } = await response.json();

  return value;
};
