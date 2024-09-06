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

function isValidURL(urlString) {
  var regex =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex.test(urlString);
}

export const updateShortURL = async (req, res) => {
  const urlID = req.body.url;

  // Validation
  if (!isValidURL(urlID)) {
    return res.status(400).send({ error: "invalid URL" });
  }

  // Searching for original url
  const originalURL = await shortenURL.findAll({
    where: { url: urlID },
  });

  // return status 404 if URL doesn't exist
  if (originalURL.length === 0) {
    return res.status(404).send({ error: "URL doesn't exist" });
  }

  // Generate unique code
  let code = uniqueCodeGenerator().next();

  // Updating the original URL's shortCode
  await shortenURL.update(
    { shortCode: code.value },
    {
      where: { url: urlID },
    }
  );

  const stored = await shortenURL.findOne({
    where: { url: urlID },
  });

  return res.status(201).send(stored.dataValues);
};
