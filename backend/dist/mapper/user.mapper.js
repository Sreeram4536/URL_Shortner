"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toUserDTO(user) {
        return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
        };
    }
}
exports.UserMapper = UserMapper;
