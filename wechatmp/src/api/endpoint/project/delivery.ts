
import { ApiService, ISuccessE, IBlob } from '../../api';
import { TTimestamp } from '../../constants';

interface IEndPointGetDeliveryContentReturn {
    Result: {
        DeliveryContents: {
            Id: number;
            Pid: number;
            RecordID: number;
            ProductName: string;
            Arrival1Date: TTimestamp;
            Arrival1Quantity: number;
            Arrival1VerifierUid: number;
            Arrival1VerifierName: string;
            Arrival1VerifyDate: TTimestamp;
            Arrival2Date: TTimestamp;
            Arrival2Quantity: number;
            Arrival2VerifierUid: number;
            Arrival2VerifierName: string;
            Arrival2VerifyDate: TTimestamp;
            Arrival3Date: TTimestamp;
            Arrival3Quantity: number;
            Arrival3VerifierUid: number;
            Arrival3VerifierName: string;
            Arrival3VerifyDate: TTimestamp;
            Arrival4Date: TTimestamp;
            Arrival4Quantity: number;
            Arrival4VerifierUid: number;
            Arrival4VerifierName: string;
            Arrival4VerifyDate: TTimestamp;
            Arrival5Date: TTimestamp;
            Arrival5Quantity: number;
            Arrival5VerifierUid: number;
            Arrival5VerifierName: string;
            Arrival5VerifyDate: TTimestamp;
            UnArrivalQuantity: number;
            Comment: string;
            ReceiptID: number;
            StatementID: number;
            CompletionPictureID: number;
            PerformanceCreditID: number;
            CreatorUid: number;
            CreatorName: string;
            CreatorPhone: string;
            LastModified: TTimestamp;
        }[];
    };
    Addition: {};
}

type IEndPointModifyDeliveryContentReturn = ISuccessE;

type IEndPointVerifyDeliveryArrivalReturn = ISuccessE;

type IEndPointUploadReceiptReturn = ISuccessE;

type IEndPointWithdrawReceiptReturn = ISuccessE;

type IEndPointUploadStatementReturn = ISuccessE;

type IEndPointWithdrawStatementReturn = ISuccessE;

type IEndPointUploadCompletionPictureReturn = ISuccessE;

type IEndPointWithdrawCompletionPictureReturn = ISuccessE;

type IEndPointUploadPerformanceCreditReturn = ISuccessE;

type IEndPointWithdrawPerformanceCreditReturn = ISuccessE;

export class ApiDelivery {
    constructor(private api: ApiService) { }

    GetDeliveryContent(Pid: number): Promise<IEndPointGetDeliveryContentReturn> {
        return this.api.JSON('/endpoint/project/delivery/getdeliverycontent', { Pid });
    }

    ModifyDeliveryContent(Pid: number, RecordID: number, Arrival1Date: TTimestamp, Arrival1Quantity: number,
        Arrival2Date: TTimestamp, Arrival2Quantity: number, Arrival3Date: TTimestamp, Arrival3Quantity: number,
        Arrival4Date: TTimestamp, Arrival4Quantity: number, Arrival5Date: TTimestamp, Arrival5Quantity: number,
        Comment: string):
        Promise<IEndPointModifyDeliveryContentReturn> {
        return this.api.JSON('/endpoint/project/delivery/modifydeliverycontent', {
            Pid, RecordID, Arrival1Date, Arrival1Quantity, Arrival2Date, Arrival2Quantity, Arrival3Date, Arrival3Quantity,
            Arrival4Date, Arrival4Quantity, Arrival5Date, Arrival5Quantity, Comment
        });
    }

    VerifyDeliveryArrival(Pid: number, RecordID: number, VerifyColumn: number): Promise<IEndPointVerifyDeliveryArrivalReturn> {
        return this.api.JSON('/endpoint/project/delivery/verifyarrival', { Pid, RecordID, VerifyColumn });
    }

    UploadReceipt(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadReceiptReturn> {
        return this.api.JSON('/endpoint/project/delivery/uploadreceipt', { Pid, RecordID, FileID });
    }

    WithdrawReceipt(Pid: number, RecordID: number): Promise<IEndPointWithdrawReceiptReturn> {
        return this.api.JSON('/endpoint/project/delivery/withdrawreceipt', { Pid, RecordID });
    }

    DownloadReceipt(Pid: number, Id: number): Promise<IBlob> {
        return this.api.BLOB('/endpoint/project/delivery/downloadreceipt', { Pid, Id });
    }

    UploadStatement(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadStatementReturn> {
        return this.api.JSON('/endpoint/project/delivery/uploadstatement', { Pid, RecordID, FileID });
    }

    WithdrawStatement(Pid: number, RecordID: number): Promise<IEndPointWithdrawStatementReturn> {
        return this.api.JSON('/endpoint/project/delivery/withdrawstatement', { Pid, RecordID });
    }

    DownloadStatement(Pid: number, Id: number): Promise<IBlob> {
        return this.api.BLOB('/endpoint/project/delivery/downloadstatement', { Pid, Id });
    }

    UploadCompletionPicture(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadCompletionPictureReturn> {
        return this.api.JSON('/endpoint/project/delivery/uploadcompletionpicture', { Pid, RecordID, FileID });
    }

    WithdrawCompletionPicture(Pid: number, RecordID: number): Promise<IEndPointWithdrawCompletionPictureReturn> {
        return this.api.JSON('/endpoint/project/delivery/withdrawcompletionpicture', { Pid, RecordID });
    }

    DownloadCompletionPicture(Pid: number, Id: number): Promise<IBlob> {
        return this.api.BLOB('/endpoint/project/delivery/downloadcompletionpicture', { Pid, Id });
    }

    UploadPerformanceCredit(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadPerformanceCreditReturn> {
        return this.api.JSON('/endpoint/project/delivery/uploadperformancecredit', { Pid, RecordID, FileID });
    }

    WithdrawPerformanceCredit(Pid: number, RecordID: number): Promise<IEndPointWithdrawPerformanceCreditReturn> {
        return this.api.JSON('/endpoint/project/delivery/withdrawperformancecredit', { Pid, RecordID });
    }

    DownloadPerformanceCredit(Pid: number, Id: number): Promise<IBlob> {
        return this.api.BLOB('/endpoint/project/delivery/downloadperformancecredit', { Pid, Id });
    }

    GetDeliveryContentHistory(Pid: number, RecordID: number): Promise<IEndPointGetDeliveryContentReturn> {
        return this.api.JSON('/endpoint/project/delivery/getdeliverycontenthistory', { Pid, RecordID });
    }

}
