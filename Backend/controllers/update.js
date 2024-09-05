import shortenURL from "../database/models/shortenURLs.js";

function* uniqueCodeGenerator() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const generatedCodes = new Set();

  while (true) {
    let code = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    // Ensure the generated code is unique
    if (!generatedCodes.has(code)) {
      generatedCodes.add(code);
      yield code;
    }
  }
}

export const updateShortURL = async (req, res) => {
  const urlID = req.params[0];
  const lengthOfID = urlID.length;

  // Validation
  if (lengthOfID > 5 || lengthOfID < 5) {
    return res.status(400).send({ error: "Validation Error" });
  }

  // Searching for original url
  const originalURL = await shortenURL.findOne({
    where: { shortCode: urlID },
  });

  // return status 200 if URL doesn't exist
  if (originalURL === null) {
    return res.status(404).send({ error: "URL doesn't exist" });
  }

  // Generate unique code
  let code = uniqueCodeGenerator().next();

  // Updating the original URL's shortCode
  await shortenURL.update(
    { shortCode: code.value },
    {
      where: { url: originalURL.dataValues.url },
    }
  );

  const stored = await shortenURL.findOne({
    where: { url: originalURL.dataValues.url },
  });

  return res.status(201).send(stored.dataValues);
};
