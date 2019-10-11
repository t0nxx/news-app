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
const report_entity_1 = require("./report.entity");
const typeorm_2 = require("typeorm");
const QueryOrderFormat_1 = require("../shared/QueryOrderFormat");
const comment_entity_1 = require("../comment/comment.entity");
const user_entity_1 = require("../user/user.entity");
let ReportsService = class ReportsService {
    constructor(ReportsRepository, commentRepository, userRepository) {
        this.ReportsRepository = ReportsRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }
    getAllReports(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.ReportsRepository
                .createQueryBuilder('report')
                .innerJoin('report.comment', 'comment')
                .innerJoin('report.user', 'user')
                .addSelect(['comment.id', 'user.id']);
            const qAfterFormat = QueryOrderFormat_1.FormatQueryOrderAndPagination(paginate, q, ['body'], 'report');
            const [data, count] = yield qAfterFormat.getManyAndCount();
            return { data, count };
        });
    }
    getOneReports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.ReportsRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            return { data: findOne };
        });
    }
    createNewReports(userId, reportsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentRepository.findOne({ id: reportsDto.commentId });
            if (!comment) {
                throw new common_1.NotFoundException('no comment with given id');
            }
            const user = yield this.userRepository.findOne({ id: userId });
            if (!user) {
                throw new common_1.NotFoundException('invalid user id');
            }
            const newReport = new report_entity_1.Report();
            newReport.body = reportsDto.body;
            newReport.comment = comment;
            newReport.user = user;
            const saveReport = yield this.ReportsRepository.save(newReport);
            return { data: 'Done , Report has been sent' };
        });
    }
    deletReports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOne = yield this.ReportsRepository.findOne(id);
            if (!findOne) {
                throw new common_1.NotFoundException('invalid id');
            }
            yield this.ReportsRepository.delete(id);
            return { data: findOne };
        });
    }
};
ReportsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(report_entity_1.Report)),
    __param(1, typeorm_1.InjectRepository(comment_entity_1.Comment)),
    __param(2, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=report.service.js.map