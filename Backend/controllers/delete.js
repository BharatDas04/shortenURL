import shortenURL from "../database/models/shortenURLs.js";
import sequelize from "../database/config.js";

export const deleteShortURL = async (req, res) => {
  const urlID = req.query.url;
  const endCode = urlID.slice(-5);
  const transaction = await sequelize.transaction();
  // Checking if URL exists
  const findURL = await shortenURL.findOne({
    where: { shortCode: endCode },
    transaction,
  });

  if (!findURL) {
    await transaction.rollback();
    return res.status(404).send({ error: "URL doesn't exist." });
  }

  // Destroy the URL entry
  await shortenURL.destroy({
    where: { id: findURL.dataValues.id },
    transaction,
  });

  // Commit the transaction
  await transaction.commit();
  return res.status(204).send();
};
