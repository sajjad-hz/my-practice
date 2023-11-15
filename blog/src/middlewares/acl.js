import { ROLE_HIERARCHY } from "../config/roles";
import { UnauthorizeError, ForbiddenError } from "../utils/errors";

export default function acl(roleName) {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthorizeError();
    }

    const { role } = req.user;

    if (ROLE_HIERARCHY[role]?.includes(roleName)) {
      return next();
    }

    throw new ForbiddenError();
  };
}
