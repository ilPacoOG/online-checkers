import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
// creates interfact of the user Login
interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
}

export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          // Prevents duplicate email addresses in DB
          unique: true,
          // Checks for email format (foo@bar.com)
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
        //   prevents null values
          allowNull: false,
        //   must be between 8 and 25 characters long
          validate: {
            len: [8,25]
          }
        }
      },
      {
        tableName: 'users',
        sequelize,
        timestamps: false,
      }
    );
  
    return User;
  }