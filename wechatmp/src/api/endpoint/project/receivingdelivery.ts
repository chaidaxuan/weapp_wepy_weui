import { ApiService, ISuccessE, IBlob } from '../../api';
import { TTimestamp } from '../../constants';

interface IEndPointGetReceivingDeliveryDetailReturn {
    Result: {
        ReceivingDeliveryDetails: {
            Pid: number;
            RecordID: number;
            Ordinal: number;
            DeliveryDate: TTimestamp;
            DeliveryQuantity: number;
            DeliveryVerifierUid: number;
            DeliveryVerifierName: string;
            DeliveryVerifierPhone: string;
            DeliveryVerifyDate: TTimestamp;
            Receiving: {
                ReceivingDate: TTimestamp;
                ReceivingQuantity: number;
                ReceivingVerifierUid: number;
                ReceivingVerifierName: string;
                ReceivingVerifierPhone: string;
                ReceivingVerifyDate: TTimestamp;
            }[];
        }[];
    };
    Addition: {};
}

interface IEndPointGetReceivingDeliveryContentReturn {
    Result: {
        ReceivingDeliveryContents: {
            Id: number;
            Pid: number;
            RecordID: number;
            ProductName: string;
            Amount: number;
            DeliveryAmount: number;
            ReceivingAmount: number;
            UnDeliveryAmount: number;
            UnReceivingAmount: number;
            Comment: string;
            CreatorUid: number;
            CreatorName: string;
            CreatorPhone: string;
            LastModified: TTimestamp;
        }[];
    };
    Addition: {};
}

type IEndPointModifyReceivingDeliveryContentReturn = ISuccessE;

export class ApiReceivingDelivery {
    constructor(private api: ApiService) { }

    // 查看收发货明细
    GetReceivingDeliveryDetail(Pid: number, RecordID: number): Promise<IEndPointGetReceivingDeliveryDetailReturn> {
        return this.api.JSON('/endpoint/project/receivingdelivery/getreceivingdeliverydetail', { Pid, RecordID });
    }

    // 查看收发货内容
    GetReceivingDeliveryContent(Pid: number): Promise<IEndPointGetReceivingDeliveryContentReturn> {
        return this.api.JSON('/endpoint/project/receivingdelivery/getreceivingdeliverycontent', { Pid });
    }

    // 修改收发货内容
    ModifyReceivingDeliveryContent(Pid: number, RecordID: number, Comment: string): Promise<IEndPointModifyReceivingDeliveryContentReturn> {
        return this.api.JSON('/endpoint/project/receivingdelivery/modifyreceivingdeliverycontent', { Pid, RecordID, Comment });
    }

    // 查看收发货内容历史
    GetReceivingDeliveryContentHistory(Pid: number, RecordID: number): Promise<IEndPointGetReceivingDeliveryContentReturn> {
        return this.api.JSON('/endpoint/project/receivingdelivery/getreceivingdeliverycontenthistory', { Pid, RecordID });
    }

}
