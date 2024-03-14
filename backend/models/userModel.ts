import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import { UserAttributes } from "../types";

interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number; 
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public date_of_birth!: Date;
    public gender!: string;
    public role!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true, 
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  }, {
    sequelize, 
    modelName: 'users',
    timestamps: false,
  });

  export default User;