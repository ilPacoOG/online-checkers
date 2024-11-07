import sequelize from '../../config/connection';
import { UserFactory } from './user.js';

const User = UserFactory(sequelize);

export { sequelize, User };