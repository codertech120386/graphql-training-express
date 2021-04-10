const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) return next(err);

    this.password = hash;
    return next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) return reject(err);

      return resolve(same);
    });
  });
};

module.exports = mongoose.model("user", userSchema);
