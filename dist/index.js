"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nexusArgsValidation = void 0;
const apollo_server_1 = require("apollo-server");
const nexus_1 = require("nexus");
const core_1 = require("nexus/dist/core");
const yup = __importStar(require("yup"));
const FieldValidationResolverImport = core_1.printedGenTypingImport({
    module: "nexus-args-validation",
    bindings: ["FieldValidationResolver"],
});
const fieldDefTypes = core_1.printedGenTyping({
    optional: true,
    name: "validation",
    description: `Validation Arguments with yup`,
    type: "FieldValidationResolver",
    imports: [FieldValidationResolverImport],
});
const nexusArgsValidation = () => nexus_1.plugin({
    name: "Nexus Arguments Validation Plugin",
    description: "Validate Arguments in Nexus using yup",
    fieldDefTypes: fieldDefTypes,
    onCreateFieldResolver(config) {
        var _a, _b;
        const validation = (_b = (_a = config.fieldConfig.extensions) === null || _a === void 0 ? void 0 : _a.nexus) === null || _b === void 0 ? void 0 : _b.config.validation;
        if (validation == null) {
            return;
        }
        if (typeof validation !== "function") {
            console.error(new Error(`The validation property provided to ${config.fieldConfig.name} with type ${config.fieldConfig.type} should be a function, saw ${typeof validation}`));
            return;
        }
        return function (root, args, ctx, info, next) {
            const schema = validation(yup, {
                root,
                args,
                ctx,
                info,
            });
            try {
                schema.validateSync(args);
                return next(root, args, ctx, info);
            }
            catch (error) {
                throw new apollo_server_1.UserInputError(error, error.errors);
            }
        };
    },
});
exports.nexusArgsValidation = nexusArgsValidation;
//# sourceMappingURL=index.js.map