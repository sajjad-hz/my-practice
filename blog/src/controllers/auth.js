import User from "../models/user";
import { BadRequestError } from "../utils/errors";
import bcrypt from "bcrypt";

class AuthController {
  transformUser(user) {
    user.set("password", undefined);
  }

  loginPage(req, res) {
    res.render("auth/login", {
      title: "Login",
    });
  }

  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    const comparePass = await bcrypt.compare(password, user.password)
    
    if (!user || !comparePass) {
      throw new BadRequestError("Credential Error");
    }

    this.transformUser(user)
    res.json(user);
  }

  registerPage(req, res) {
    res.render("auth/register", {
      title: "Register",
    });
  }

  async register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new BadRequestError("username or email pass or missing ");
    }

    let user;
    try {
      const hashedPassword = bcrypt.hashSync(password, 12);
      user = await User.create({ username, email, password: hashedPassword });
    } catch (error) {
      throw new BadRequestError(
        `${Object.keys(error.fields)[0].toUpperCase()} is duplicated`
      );
    }

    this.transformUser(user);
    res.json(user);
  }
}

export default new AuthController();
