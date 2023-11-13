import User from "../../models/user";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../utils/errors";
import jwt from "jsonwebtoken";

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("username and password is required!");
    }

    const user = await User.scope("withPassword").findOne({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestError("Credential error");
    }

    const token = jwt.sign(
      { id: user.id, username: username },
      process.env.SECRET,
      { expiresIn: "2m" }
    );

    res.json({token, ...user.toJSON(),password : undefined});
  }
}

export default new AuthController();
