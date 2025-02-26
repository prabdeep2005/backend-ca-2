const express = require("express");
const app = express();

app.use(express.json()); 


let users_db = {
    "user@example.com": { password: "oldpassword" }
};


app.put("/update-user", (req, res) => {
    const { email, password } = req.body;

    if (users_db[email]) {
        users_db[email].password = password;
        return res.json({ message: "User updated successfully" });
    }
    return res.status(404).json({ error: "Email not found" });
});


app.delete("/delete-user/:email", (req, res) => {
    const email = req.params.email;

    if (users_db[email]) {
        delete users_db[email];
        return res.json({ message: "User deleted successfully" });
    }
    return res.status(404).json({ error: "Email not found" });
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
