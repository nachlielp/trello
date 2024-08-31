import { getCollection } from "../../data/mongoDb.js";
import { ObjectId } from "mongodb";

export const userService = {
  save,
  getByEmail,
  getById,
  getByUsername,
  getUsers,
};

async function getByEmail(email) {
  try {
    const users = await getCollection("users");

    const user = await users.findOne({ email });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getByUsername(username) {
  try {
    const users = await getCollection("users");
    const user = await users.findOne({ username });
    user.id = user._id;
    delete user._id;
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getUsers(userIds) {
  try {
    const users = await getCollection("users");
    const objectIds = userIds.map((id) => new ObjectId(id));
    const pipeline = [
      {
        $match: { _id: { $in: objectIds } }, // Match documents with the specified IDs
      },
      {
        $addFields: { id: "$_id" }, // Add a new field 'id' with the value of '_id'
      },
      {
        $project: { _id: 0 }, // Exclude the '_id' field from the results
      },
    ];
    const filteredUsers = await users.aggregate(pipeline).toArray();

    return filteredUsers;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getById(id) {
  try {
    const users = await getCollection("users");

    const user = await users.findOne({ _id: new ObjectId(id) });
    return user;
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
