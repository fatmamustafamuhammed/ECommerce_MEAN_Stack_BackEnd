import User from "./../db/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
Hashes password using bcrypt (10 rounds) ==> Creates new User object with name, email, and hashed password ==> Saves to database
*/
async function RegisterUser(model) {
  const hashPassword = await bcrypt.hash(model.password, 10);
  let user = new User({
    name: model.name,
    email: model.email,
    password: hashPassword,
  });
  await user.save();
}

/**
Finds user by email in database ==> Compares provided password with stored hash using bcrypt.compare()
If matched → generates JWT token containing user info (id, name, email, isAdmin) ==> Token expires in 1 hour
Returns: { token, user } if success, null if failed
*/
async function LoginUser(model) {
  const user = await User.findOne({ email: model.email }).exec();
  if (!user) {
    return null;
  }
  const isMatched = await bcrypt.compare(model.password, user.password);
  if (isMatched) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "secret",
      { expiresIn: "1h" },
    );
    return { token, user };
  } else {
    return null;
  }
}

export { RegisterUser, LoginUser };
