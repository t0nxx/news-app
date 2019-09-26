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
const terms_entity_1 = require("./terms.entity");
const typeorm_2 = require("typeorm");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
let TermsService = class TermsService {
    constructor(termsRepository) {
        this.termsRepository = termsRepository;
    }
    getAlltermss(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.termsRepository.createQueryBuilder();
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['body']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data: data[0] };
        });
    }
    getOneterms(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.termsRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            return { data: findOne };
        });
    }
    createNewterms(termsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newterms = new terms_entity_1.Terms();
            Object.assign(newterms, termsDto);
            const saveterms = yield this.termsRepository.save(newterms);
            return { data: saveterms };
        });
    }
    updateterms(id, updateterms) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.termsRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            if (Object.keys(updateterms).length <= 0) {
                throw new common_1.BadRequestException('no data provided');
            }
            yield this.termsRepository.update({ id: findOne.id }, updateterms);
            const updated = yield this.termsRepository.findOne(id);
            return { data: updated };
        });
    }
    deletterms(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.termsRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.termsRepository.delete(id);
            return { data: findOne };
        });
    }
};
TermsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(terms_entity_1.Terms)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TermsService);
exports.TermsService = TermsService;
//# sourceMappingURL=terms.service.js.map