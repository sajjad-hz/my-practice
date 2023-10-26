import { BaseModel, sequelize, DataTypes } from "../config/databse";

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
    modelName: "users",
  }
);

export default User;
