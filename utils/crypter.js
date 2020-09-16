const bcrypt = require('bcryptjs')


const hashPass = async pass => {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(pass, salt)
  console.log(password)
}


hashPass('password')
