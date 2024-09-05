import shortenURL from "../database/models/shortenURLs.js";

export const deleteShortURL = async (req, res) => {
  const urlID = req.params[0];
  const lengthOfID = urlID.length;

  // Validation
  if (lengthOfID > 5 || lengthOfID < 5) {
    return res.status(400).send({ error: "Validation Error" });
  }

  // Checking if URL exists
  const findURL = await shortenURL.findOne({
    where: { shortCode: urlID },
  });
  if (findURL === null) {
    return res.status(404);
  }

  await shortenURL.destroy({
    where: { shortCode: urlID },
  });

  return res.status(204);
};
