import { BaseModel, sequelize, DataTypes } from "../config/databse";
import Article from "./article";

class User extends BaseModel {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { 
    sequelize,
    modelName: "user",
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    scopes: {
      withPassword: {}
    }
  }
);

User.hasMany(Article)
Article.belongsTo(User)

export default User;
