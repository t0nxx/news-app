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
const typeorm_2 = require("typeorm");
const uploader_entity_1 = require("./uploader.entity");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
let UploaderService = class UploaderService {
    constructor(uploaderRepository) {
        this.uploaderRepository = uploaderRepository;
    }
    getAllUploads(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.uploaderRepository.createQueryBuilder('uploader');
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['url']);
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getOneUpload(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.uploaderRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            return { data: findOne };
        });
    }
    createNewUpload(upload) {
        return __awaiter(this, void 0, void 0, function* () {
            const save = yield this.uploaderRepository.save(upload);
            return { data: save };
        });
    }
    deletUpload(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.uploaderRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.uploaderRepository.delete(id);
            return { data: findOne };
        });
    }
};
UploaderService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(uploader_entity_1.Uploader)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UploaderService);
exports.UploaderService = UploaderService;
//# sourceMappingURL=uploader.service.js.map