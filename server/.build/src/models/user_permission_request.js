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
exports.UserPermissionRequest = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const _models_1 = require("./_models");
let UserPermissionRequest = class UserPermissionRequest extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], UserPermissionRequest.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _models_1.User),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], UserPermissionRequest.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _models_1.User),
    __metadata("design:type", _models_1.User)
], UserPermissionRequest.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(_models_1.UserPermission)),
        defaultValue: _models_1.UserPermission.read,
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserPermissionRequest.prototype, "permission", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], UserPermissionRequest.prototype, "createdAt", void 0);
UserPermissionRequest = __decorate([
    sequelize_typescript_1.Table({ tableName: 'user_permission_request', timestamps: false })
], UserPermissionRequest);
exports.UserPermissionRequest = UserPermissionRequest;
