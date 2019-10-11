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
const swagger_1 = require("@nestjs/swagger");
const report_service_1 = require("./report.service");
const pagination_filter_1 = require("../shared/pagination.filter");
const report_dto_1 = require("./report.dto");
const user_decorator_1 = require("../user/user.decorator");
let ReportsController = class ReportsController {
    constructor(reportservice) {
        this.reportservice = reportservice;
    }
    getAllreports(paginate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reportservice.getAllReports(paginate);
        });
    }
    getOnereports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reportservice.getOneReports(id);
        });
    }
    createNewUser(report, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reportservice.createNewReports(id, report);
        });
    }
    deletereports(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reportservice.deletReports(id);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_filter_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getAllreports", null);
__decorate([
    common_1.Get('/getOne/:id'),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getOnereports", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    common_1.Post('/new'),
    __param(0, common_1.Body()), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportDto, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "createNewUser", null);
__decorate([
    swagger_1.ApiImplicitHeader({ name: 'authorization', required: true }),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    common_1.Delete('/delete/:id'),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "deletereports", null);
ReportsController = __decorate([
    swagger_1.ApiUseTags('reports'),
    common_1.Controller('reports'),
    __metadata("design:paramtypes", [report_service_1.ReportsService])
], ReportsController);
exports.ReportsController = ReportsController;
//# sourceMappingURL=report.controller.js.map