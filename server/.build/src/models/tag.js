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
exports.Tag = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const _models_1 = require("./_models");
let Tag = class Tag extends sequelize_typescript_1.Model {
    static findOrCreateList(user, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(tags.map((name) => __awaiter(this, void 0, void 0, function* () {
                const findTag = yield this.findOne({
                    where: { name, userId: user.id },
                });
                if (findTag)
                    return findTag;
                const newTag = yield this.create({
                    user,
                    userId: user.id,
                    name,
                });
                return newTag;
            })));
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
], Tag.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => _models_1.User),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Tag.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => _models_1.User),
    __metadata("design:type", _models_1.User)
], Tag.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => _models_1.Post, () => _models_1.PostTag),
    __metadata("design:type", Array)
], Tag.prototype, "posts", void 0);
Tag = __decorate([
    sequelize_typescript_1.Table({ tableName: 'tag', timestamps: false })
], Tag);
exports.Tag = Tag;
