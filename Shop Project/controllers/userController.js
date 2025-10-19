const authModel = require("../models/authModel");

const getAllUsers = (req, res) => {
    authModel.getAllUsers()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch users" });
        });
}

const getUserById = (req, res) => {
    const id = req.params['id'];
    authModel.getUserById(id)
        .then(user => {
            if (user.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user[0]);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch user" });
        });
}

const updateUserStatus = (req, res) => {
    const id = req.params['id'];
    const { isActive } = req.body;
    
    // Validation
    if (typeof isActive !== 'boolean') {
        return res.status(400).json({ error: "isActive must be a boolean value" });
    }

    authModel.updateUserStatus(id, isActive)
        .then(() => {
            res.status(200).json({ message: "User status updated successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to update user status" });
        });
}

const changePassword = (req, res) => {
    const id = req.params['id'];
    const { newPassword } = req.body;
    
    // Validation
    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: "New password must be at least 6 characters long" });
    }

    authModel.changePassword(id, newPassword)
        .then(() => {
            res.status(200).json({ message: "Password changed successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to change password" });
        });
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserStatus,
    changePassword
};
