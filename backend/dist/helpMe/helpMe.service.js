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
const helpMe_entity_1 = require("./helpMe.entity");
const typeorm_2 = require("typeorm");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
let HelpMeService = class HelpMeService {
    constructor(helpMeRepository) {
        this.helpMeRepository = helpMeRepository;
    }
    getAllhelpMes(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.helpMeRepository.createQueryBuilder();
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['name']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getOnehelpMe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.helpMeRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            return { data: findOne };
        });
    }
    createNewhelpMe(helpMeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newhelpMe = new helpMe_entity_1.HelpMe();
            Object.assign(newhelpMe, helpMeDto);
            const savehelpMe = yield this.helpMeRepository.save(newhelpMe);
            return { data: savehelpMe };
        });
    }
    updatehelpMe(id, updatehelpMe) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.helpMeRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            if (Object.keys(updatehelpMe).length <= 0) {
                throw new common_1.BadRequestException('no data provided');
            }
            yield this.helpMeRepository.update({ id: findOne.id }, updatehelpMe);
            const updated = yield this.helpMeRepository.findOne(id);
            return { data: updated };
        });
    }
    delethelpMe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.helpMeRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.helpMeRepository.delete(id);
            return { data: findOne };
        });
    }
};
HelpMeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(helpMe_entity_1.HelpMe)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HelpMeService);
exports.HelpMeService = HelpMeService;
//# sourceMappingURL=helpMe.service.js.map