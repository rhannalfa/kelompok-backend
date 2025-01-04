const bcrypt = require('bcrypt');
const saltRounds = 10; 


app.get('/users', async (req, res) => {
    const results = await knex('users').select();
    res.json(results);
  });
  
  // Menambahkan Pengguna Baru
  app.post("/users", async (req, res) => {
    const data = req.body;
  
    try {
      // Hash password sebelum disimpan ke database
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  
      // Menyimpan pengguna ke database dengan password yang sudah di-hash
      const results = await knex('users').insert({
        name: data.name,
        email: data.email,
        password: hashedPassword,  // Simpan password yang sudah di-hash
        phone_number: data.phone_number,
        role_id: data.role_id
      });
  
      res.json(results);
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  });
  
  // Menghapus Pengguna
  app.delete("/users/:id", async (req, res) => {
    const primaryKey = req.params.id;
    
    const results = await knex("users").where("id", primaryKey).del();
    res.json(results);
  });
  
  // Memperbarui Pengguna
  app.put("/users/:id", async (req, res) => {
    const primaryKey = req.params.id;
    const data = req.body;
  
    try {
      let updateData = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        role_id: data.role_id
      };
  
      // Jika password diubah, maka kita perlu melakukan hashing password baru
      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        updateData.password = hashedPassword; // Ganti dengan password yang sudah di-hash
      }
  
      // Memperbarui pengguna di database dengan data yang sudah diubah
      const results = await knex("users").where("id", primaryKey).update(updateData);
  
      res.json(results);
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  });