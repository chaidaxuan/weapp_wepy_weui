export enum TUserRole {
    ROLE_UNEXISTS = 0,    // 未登录用户
    ROLE_ENDPOINT_USER = 100,  // 登录用户
    ROLE_PROJECT_ACCOUNT = 500,  // 信息录入专员
    ROLE_ADMIN = 1000, // 管理员
}
export enum TUserStatus {
    STATUS_INVALID = 0,  // 无效账户（未登录）
    STATUS_PLACEHOLDER = 10, // 占位账户
    STATUS_NORMAL = 20, // 正常账户
    STATUS_FROZEN = 30, // 已冻结的账户
}

export enum TProjectStatus {
    STATUS_INVALID = 0, // 无效项目
    STATUS_NORMAL = 20, // 正常项目
    STATUS_FROZEN = 30, // 已冻结的项目
}

export enum TProjectRole {
    ROLE_PROJECT_ACCOUNT = 1, // 信息录入专员
    ROLE_DESIGN = 2, // 设计
    ROLE_ENGINEERING = 3, // 工程
    ROLE_MATERIAL = 4, // 材料
    ROLE_MARKETING = 5, // 营销
    ROLE_FINANCE = 6, // 财务
    ROLE_DESIGN_MANAGER = 7, // 设计经理
    ROLE_ENGINEERING_MANAGER = 8, // 工程经理
    ROLE_MATERIAL_MANAGER = 9, // 材料经理
    ROLE_DESIGNING_INSTITUTE = 10, // 设计院
    ROLE_PARTY_A = 11, // 甲方
    ROLE_GENERAL_CONTRACTOR = 12, // 总包方
    ROLE_OWNER = 13, // 业主
    ROLE_FACTORY = 14, // 工厂人员
    ROLE_FACTORY_MANAGER = 15, // 工厂负责人
}

export enum TUserLogOperation {
    OP_FREEZE = -1, // 冻结
    OP_UNFREEZE = 1, // 解冻
}


export enum TVerifyStatus {
    UNDETERMINED = 0,
    VERIFIED = 1,
    REJECTED = 2,
}

// 整型（TS没有整型，自行实现了一个）
type TInteger = number & { __int__: void };
export function CInteger(n: number) {
    return Math.floor(n) as TTimestamp;
}


// timestamp 是个 unix 时间戳（整型）
export type TTimestamp = TInteger;

export enum TRollbackStage {
    BEFORE_DELIVERY = 1, // 发货前
    AFTER_DELIVERY = 2, // 发货后
    AFTER_ARRIVAL = 3, // 到货后
    STAGEGUARDFLAG = 4, // 边界
}

export enum TRollbackOperation {
    REPRODUCE = 1, // 重新生产
    MODIFYPRODUCE = 2, // 修改生产
    OPERATIONGUARDFLAG = 3, // 边界
}

export enum TRollbackResult {
    UNDETERMINED = 0, // 未确认
    AGREE = 1, // 同意
    REJECTED = 2, // 驳回
    RESULTGUARDFLAG = 3, // 边界
}

export enum TArrivalOrRollback {
    ARRIVAL = 1, // 到货
    ROLLBACK = 2, // 回退
}

export enum TProductionPerformanceStatus {
    UNTREATED = 0,        // 未处理
    CUTTING = 1,          // 开料
    CORROSION = 2,        // 腐蚀
    PUNCHING = 3,         // 冲孔
    BENDING = 4,          // 折弯
    ARC = 5,              // 滚弧
    WELDMENT = 6,         // 焊接
    POLISHING = 7,        // 打磨
    SPRAYING = 8,         // 喷涂
    PERFORMGUARDFLAG = 9, // 边界
}
export enum ScanOperation {
    DELIVERY = 10,                   // 发货
    RECEIPT = 11,                    // 到货货
    ROLLBACK_MODIFY_PRODUCTION = 12, // 回退-修改生产
    ROLLBACK_REPRODUCTION = 13,      // 回退-重新生产
}

export enum TReceivingDeliveryStatus {
    BEFORE_DELIVERY = 0,          // 未发货
    AFTER_DELIVERY = 1,           // 发货后未到货
    AFTER_ARRIVAL = 2,            // 到货后
    DELIVERYARRIVALGUARDFLAG = 3, // 边界
}