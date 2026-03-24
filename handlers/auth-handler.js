import User from "./../db/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function RegisterUser(model) {
  const hashPassword = await bcrypt.hash(model.password, 10);
  let user = new User({
    name: model.name,
    email: model.email,
    password: hashPassword,
  });
  await user.save();
}

async function LoginUser(model) {
  const user = await User.findOne({
    email: model.email,
  });
  if (!user) {
    return null;
  }
  console.log(user, model.password, user.password);
  const isMatched = await bcrypt.compare(model.password, user.password);
  if (isMatched) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "seceret",
      {
        expiresIn: "1h",
      },
    );
    return { token, user };
  } else {
    return null;
  }
}
export { RegisterUser, LoginUser };
