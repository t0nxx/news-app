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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aboutUs_entity_1 = require("./aboutUs.entity");
const typeorm_2 = require("typeorm");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
let AboutUsService = class AboutUsService {
    constructor(AboutUsRepository) {
        this.AboutUsRepository = AboutUsRepository;
    }
    getAllAboutUss(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.AboutUsRepository.createQueryBuilder();
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['body']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data: data[0] };
        });
    }
    getOneAboutUs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.AboutUsRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            return { data: findOne };
        });
    }
    createNewAboutUs(AboutUsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAboutUs = new aboutUs_entity_1.AboutUs();
            Object.assign(newAboutUs, AboutUsDto);
            const saveAboutUs = yield this.AboutUsRepository.save(newAboutUs);
            return { data: saveAboutUs };
        });
    }
    updateAboutUs(id, updateAboutUs) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.AboutUsRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            if (Object.keys(updateAboutUs).length <= 0) {
                throw new common_1.BadRequestException('no data provided');
            }
            yield this.AboutUsRepository.update({ id: findOne.id }, updateAboutUs);
            const updated = yield this.AboutUsRepository.findOne(id);
            return { data: updated };
        });
    }
    deletAboutUs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.AboutUsRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.AboutUsRepository.delete(id);
            return { data: findOne };
        });
    }
};
AboutUsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(aboutUs_entity_1.AboutUs)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AboutUsService);
exports.AboutUsService = AboutUsService;
//# sourceMappingURL=aboutUs.service.js.map