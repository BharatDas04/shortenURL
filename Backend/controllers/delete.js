import shortenURL from "../database/models/shortenURLs.js";

export const deleteShortURL = async (req, res) => {
  const urlID = req.params.code;
  const lengthOfID = urlID.length;

  // Validation
  if (lengthOfID > 5 || lengthOfID < 5) {
    return res.status(400).send({ error: "Validation Error" });
  }

  // Checking if URL exists
  const findURL = await shortenURL.findAll({
    where: { shortCode: urlID },
  });

  if (findURL === null) {
    return res.status(404);
  }

  const del = await shortenURL.destroy({
    where: { shortCode: urlID },
  });

  return res.status(204).send({ del: del });
};
