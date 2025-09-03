"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const QueryBuilder_contants_1 = require("./QueryBuilder.contants");
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    filter() {
        const filter = Object.assign({}, this === null || this === void 0 ? void 0 : this.query);
        QueryBuilder_contants_1.excludingFields.forEach((x) => delete filter[x]);
        this.modelQuery = this.modelQuery.find(filter);
        return this;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) || "";
        const searchQuery = {
            $or: searchableFields.map((x) => ({
                [x]: { $regex: searchTerm, $options: "i" },
            })),
        };
        this.modelQuery = this.modelQuery.find(searchQuery);
        return this;
    }
    sort() {
        var _a;
        const sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields)
            ? (_c = (_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.fields) === null || _c === void 0 ? void 0 : _c.split(",").join(" ")
            : " ";
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    builder() {
        return this.modelQuery;
    }
}
exports.QueryBuilder = QueryBuilder;
