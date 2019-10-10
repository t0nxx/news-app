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
const source_entity_1 = require("./source.entity");
const typeorm_2 = require("typeorm");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
let SourceService = class SourceService {
    constructor(SourceRepository) {
        this.SourceRepository = SourceRepository;
    }
    getAllSources(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.SourceRepository.createQueryBuilder();
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['name']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getOneSource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.SourceRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            return { data: findOne };
        });
    }
    createNewSource(sourceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSource = new source_entity_1.Source();
            Object.assign(newSource, sourceDto);
            const saveSource = yield this.SourceRepository.save(newSource);
            return { data: saveSource };
        });
    }
    updateSource(id, updateSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.SourceRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            if (Object.keys(updateSource).length <= 0) {
                throw new common_1.BadRequestException('no data provided');
            }
            findOne.name = updateSource.name;
            findOne.link = updateSource.link;
            if (updateSource.backgroundImage) {
                findOne.backgroundImage = updateSource.backgroundImage;
            }
            yield this.SourceRepository.save(findOne);
            const updated = yield this.SourceRepository.findOne(id);
            return { data: updated };
        });
    }
    deletSource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.SourceRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.SourceRepository.delete(id);
            return { data: findOne };
        });
    }
};
SourceService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(source_entity_1.Source)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SourceService);
exports.SourceService = SourceService;
//# sourceMappingURL=source.service.js.map