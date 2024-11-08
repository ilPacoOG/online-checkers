import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

// Defines the attributes for the User model
interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User class extending Sequelize's model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;

    // Method to hash and set the passwrod for the user
    public async setPassword(password: string) {
      const saltRounds = 10;
      this.password= await bcrypt.hash(password, saltRounds)
    }
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
        },
      },
      {
        tableName: 'users',
        sequelize,
        timestamps: false,
        // connects to PostgreSQL
        hooks: {
          // before creating a new user, hash and set the password
          beforeCreate: async (user: User) => {
            await user.setPassword(user.password)
          },
          // before updating a user, has and set the new password if it has changed
          beforeUpdate: async (user: User) => {
            if (user.changed('password')) {
              await user.setPassword(user.password);
            }
          },
        }
      }
    );
  // returns the initialized user model
    return User;
  }