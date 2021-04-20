import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'joud',
    email: 'joud@gmail.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  
  {
    name: 'slim',
    email: 'slim@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    isAdmin: true,
  },
]

export default users
