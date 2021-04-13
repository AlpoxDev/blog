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
var MainCategory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCategory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const _models_1 = require("./_models");
let MainCategory = MainCategory_1 = class MainCategory extends sequelize_typescript_1.Model {
    static getUserCategorys(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MainCategory_1.findAll({ where: { userId } });
        });
    }
    getSubCategorys() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subCategorys = yield _models_1.SubCategory.findAll({ where: { id: this.id } });
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
], MainCategory.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _models_1.User),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", Object)
], MainCategory.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _models_1.User),
    __metadata("design:type", Object)
], MainCategory.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], MainCategory.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Default(0),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MainCategory.prototype, "sequence", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => _models_1.SubCategory),
    __metadata("design:type", Array)
], MainCategory.prototype, "subCategorys", void 0);
MainCategory = MainCategory_1 = __decorate([
    sequelize_typescript_1.Table({ tableName: 'main_category', timestamps: false })
], MainCategory);
exports.MainCategory = MainCategory;
