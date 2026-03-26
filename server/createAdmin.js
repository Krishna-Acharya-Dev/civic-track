const mongoose = require('mongoose');
const User = require('./models/UserModel');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const email = 'admin@admin.com';
    const password = 'admin123';
    
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`✅ Admin user ${email} already exists!`);
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const dummyPhone = Number('99' + Date.now().toString().slice(-8));

    const adminUser = new User({
      firstname: 'System',
      lastname: 'Admin',
      email: email,
      phone: dummyPhone, 
      password: hashedPassword,
      dob: new Date('1990-01-01'),
      isAdmin: true
    });
    
    await adminUser.save();
    
    console.log(` Success! Dedicated Admin created successfully.`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('You can now log in via the frontend to access the Dashboard.');
    
    process.exit(0);
  } catch (err) {
    console.error('Database Connection Error:', err);
    process.exit(1);
  }
};

makeAdmin();
