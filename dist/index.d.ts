import * as yup from "yup";
declare type yupType = typeof yup;
export declare type FieldValidationResolverConfig<Root, Args, Context, Info> = {
    root: Root;
    args: Args;
    ctx: Context;
    info: Info;
};
export declare type FieldValidationResolver<R = any, A = any, C = any, I = any> = (yup: yupType, config: FieldValidationResolverConfig<R, A, C, I>) => yup.AnyObjectSchema;
export declare const nexusArgsValidation: () => import("nexus/dist/plugin").NexusPlugin;
export {};
//# sourceMappingURL=index.d.ts.map