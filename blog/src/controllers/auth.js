import User from "../models/user";
import { BadRequestError } from "../utils/errors";
import bcrypt from "bcrypt";
class AuthController {
  transformUser(user) {
    user.set("password", undefined);
  }

  loginPage(req, res) {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("auth/login", {
      title: "Login",
    });
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("username and password is required!");
    }

    const user = await User.scope('withPassword').findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestError("Credential error");
    }

    this.transformUser(user);

    req.session.user = user;

    res.redirect("/");
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
    res.redirect("/login");
  }

  logout(req, res) {
    req.session.destroy((error) => {
      if (!error) {
        res.redirect("/");
      } else {
        throw new BadRequestError("logout error");
      }
    });
  }
}

export default new AuthController();
