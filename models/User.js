const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { beforeCreate, beforeUpdate } = require('../../just-tech-news/models/User');

//creating the blog app user

class User extends Model {
    //setup method to check credentials using bcrypt
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define user table columns and config

User.init(
    {
        //define ID column and make primary key
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //define column for username
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //create e-mail column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        //create column for password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            // set up before create hooks liefecycle
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //set up before update hooks lifecyle
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
            }
        },
        //passing in the sequelize connection
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored, true,
        modelName: 'user'
    }
);

module.exports = User;