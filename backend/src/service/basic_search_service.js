"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicSearch = basicSearch;
var database_1 = require("../config/database");
var sequelize_1 = require("sequelize");
var _a = require('../utils/response'), ApiError = _a.ApiError, errorCodes = _a.errorCodes;
function basicSearch(text, studentId) {
    return __awaiter(this, void 0, void 0, function () {
        var searchText, query, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    searchText = "%".concat(text, "%");
                    console.log(text + " .. " + studentId);
                    query = "\n    SELECT \n        sg.name,\n        sg.description,\n        sg.is_public,\n        sg.course,\n        COUNT(gm.student_id) AS member_count,\n        jr.status\n    FROM \n        studybuds.student_group sg\n    LEFT JOIN \n        studybuds.group_members gm ON sg.id = gm.group_id\n    LEFT JOIN \n        studybuds.join_request jr ON sg.id = jr.group_id AND jr.student_id = :studentId\n    WHERE \n        sg.name ILIKE :searchText\n        OR sg.description ILIKE :searchText\n        OR sg.course ILIKE :searchText\n    GROUP BY \n        sg.id, \n        sg.name, \n        sg.description, \n        sg.is_public,\n        sg.course,\n        jr.status\n    ORDER BY \n        member_count DESC;\n";
                    return [4 /*yield*/, database_1.default.query(query, {
                            replacements: { searchText: searchText, studentId: studentId },
                            type: sequelize_1.QueryTypes.SELECT,
                        })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, results];
                case 2:
                    error_1 = _a.sent();
                    console.error("Failed to execute basic search. Error: ".concat(error_1.message));
                    throw new ApiError({
                        code: errorCodes.internalServerErrorCode,
                        message: 'Failed to execute basic search.',
                    });
                case 3: return [2 /*return*/];
            }
        });
    });
}
