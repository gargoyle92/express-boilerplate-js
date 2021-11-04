import bcrypt from 'bcryptjs';
import pify from 'pify';

// Promisifies bcrypt calls
export default pify(bcrypt);
