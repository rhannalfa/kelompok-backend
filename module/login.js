const bcrypt = require('bcrypt');

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Mencari pengguna berdasarkan email
      const user = await knex('users').where('email', email).first();
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Verifikasi password yang dimasukkan oleh pengguna dengan yang ada di database
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      // Jika password cocok, kirimkan respon sukses
      res.json({ message: 'Login successful', user: user });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Error during login" });
    }
  });
  