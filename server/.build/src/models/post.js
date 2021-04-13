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
exports.Post = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const _models_1 = require("./_models");
let Post = class Post extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _models_1.User),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Post.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _models_1.User),
    __metadata("design:type", _models_1.User)
], Post.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _models_1.Series),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Post.prototype, "seriesId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _models_1.Series),
    __metadata("design:type", _models_1.Series)
], Post.prototype, "series", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _models_1.SubCategory),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Post.prototype, "categoryId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _models_1.SubCategory),
    __metadata("design:type", _models_1.SubCategory)
], Post.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], Post.prototype, "subtitle", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _models_1.Tag, () => _models_1.PostTag),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Post.prototype, "sequence", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    __metadata("design:type", Date)
], Post.prototype, "deletedAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
Post = __decorate([
    sequelize_typescript_1.Table({ tableName: 'post' })
], Post);
exports.Post = Post;
