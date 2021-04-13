"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserMethod = exports.UserPermission = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const common_1 = require("../common");
const post_1 = require("./post");
var UserPermission;
(function (UserPermission) {
    UserPermission["read"] = "READ";
    UserPermission["edit"] = "EDIT";
    UserPermission["admin"] = "ADMIN";
})(UserPermission = exports.UserPermission || (exports.UserPermission = {}));
var UserMethod;
(function (UserMethod) {
    UserMethod["default"] = "DEFAULT";
    UserMethod["kakao"] = "KAKAO";
    UserMethod["github"] = "GITHUB";
})(UserMethod = exports.UserMethod || (exports.UserMethod = {}));
let User = class User extends sequelize_typescript_1.Model {
    get accessToken() {
        return common_1.signToken({
            id: this.id,
            nickname: this.nickname,
            profile: this.nickname,
            permission: this.permission,
        });
    }
    getRefreshToken(accessToken) {
        return common_1.signToken({
            id: this.id,
            accessToken,
        });
    }
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "profile", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(255),
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(UserPermission)),
        defaultValue: UserPermission.read,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "permission", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(UserMethod)),
        defaultValue: UserMethod.default,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "method", void 0);
__decorate([
    sequelize_typescript_1.Default(true),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], User.prototype, "isMarketing", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => post_1.Post),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
User = __decorate([
    sequelize_typescript_1.DefaultScope(() => ({
        attributes: ['id', 'profile', 'nickname'],
    })),
    sequelize_typescript_1.Table({ tableName: 'user' })
], User);
exports.User = User;
