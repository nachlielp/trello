import { getCollection } from "../../data/mongoDb.js";
import { ObjectId } from "mongodb";

export const userService = {
  save,
  getByEmail,
  getById,
};

async function getByEmail(email) {
  try {
    const users = await getCollection("users");

    const user = users.findOne({ email });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getById(id) {
  try {
    const users = await getCollection("users");

    const user = await users
      .aggregate([
        { $match: { _id: ObjectId.createFromHexString(id) } },
        {
          $lookup: {
            localField: "_id",
            from: "bugs",
            foreignField: "ownerId",
            as: "foundBugs",
          },
        },
      ])
      .toArray();
    return user[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function save(userToSave) {
  try {
    const users = await getCollection("users");
    if (userToSave.id) {
      const { id, ...updateFields } = userToSave;
      const result = await users.updateOne(
        {
          _id: ObjectId.createFromHexString(id),
        },
        { $set: updateFields }
      );
      if (result.matchedCount === 0) {
        throw `Couldn't update user with id ${_id}`;
      }
    } else {
      users.insertOne(userToSave);
    }
    return userToSave;
  } catch (err) {
    console.error("userService[save] : ", err);
    throw err;
  }
}
