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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const _models_1 = require("./_models");
let SubCategory = class SubCategory extends sequelize_typescript_1.Model {
    static find(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return (this.findOne({
                where: {
                    [sequelize_1.Op.or]: [{ id: category }, { name: category }],
                },
            }) || null);
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
], SubCategory.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _models_1.User),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], SubCategory.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _models_1.User),
    __metadata("design:type", _models_1.User)
], SubCategory.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _models_1.MainCategory),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", Object)
], SubCategory.prototype, "mainCategoryId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _models_1.MainCategory),
    __metadata("design:type", Object)
], SubCategory.prototype, "mainCategory", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], SubCategory.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _models_1.Post),
    __metadata("design:type", Array)
], SubCategory.prototype, "posts", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], SubCategory.prototype, "sequence", void 0);
SubCategory = __decorate([
    sequelize_typescript_1.DefaultScope(() => ({
        attributes: ['id', 'name', 'sequence'],
    })),
    sequelize_typescript_1.Table({ tableName: 'sub_category', timestamps: false })
], SubCategory);
exports.SubCategory = SubCategory;
