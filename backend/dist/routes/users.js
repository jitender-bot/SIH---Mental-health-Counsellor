"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const user_1 = require("../models/user");
const router = express_1.default.Router();
// Get current profile
router.get("/me", auth_1.requireAuth, (req, res) => {
    const user = req.user;
    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        college: user.college,
        phone: user.phone,
        gender: user.gender,
        role: user.role
    });
});
// Admin: list users
router.get("/", auth_1.requireAuth, auth_1.requireAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.find().select("-password");
    res.json(users);
}));
exports.default = router;
