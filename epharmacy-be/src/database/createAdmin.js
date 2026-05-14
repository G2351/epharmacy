const bcrypt = require("bcrypt");

const createAdmin = async () => {
  const { User } = require("../models/index");

  const existingAdmin = await User.findOne({
    where: { email: "admin@epharmacy.com" },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Admin@123456", 10);
    await User.create({
      name: "Admin",
      email: "admin@epharmacy.com",
      password: passwordHash,
      status: "active",
      role: "admin",
    });
    console.log("✅ Admin account created!");
    console.log("   Email: admin@epharmacy.com");
    console.log("   Password: Admin@123456");
  } else {
    console.log("ℹ️  Admin already exists!");
  }
};

module.exports = createAdmin;