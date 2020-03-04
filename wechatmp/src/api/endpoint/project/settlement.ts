
import { Injectable } from '@angular/core';
import { ApiService, ISuccessE, IBlob } from '../../api';
import { TTimestamp, TArrivalOrRollback } from '../../constants';

interface IEndPointGetSettlementContentReturn {
  Result: {
    SettlementContents: {
      Id: number;
      Pid: number;
      RecordID: number;
      ProductName: string;
      ReceiptID: number;
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

type IEndPointUploadReceiptReturn = ISuccessE;

type IEndPointWithdrawReceiptReturn = ISuccessE;

type IEndPointUploadCompletionPictureReturn = ISuccessE;

type IEndPointWithdrawCompletionPictureReturn = ISuccessE;

type IEndPointUploadPerformanceCreditReturn = ISuccessE;

type IEndPointWithdrawPerformanceCreditReturn = ISuccessE;

interface IEndPointGetSettlementArrivalListReturn {
  Result: {
    SettlementArrivalLists: {
      Flag: TArrivalOrRollback; // 到货或者回退
      Pid: number;
      RecordID: number;
      Ordinal: number;
      EngineeringName: string;
      PName: string;
      ClientName: string;
      ProcessingUnitName: string;
      ProductName: string;
      Quantity: number;//收发货明细中的收货数量 或者 回退中的到货后回退数量
      VerifierUid: number;//收发货明细中的收货确认人 或者 回退中的到货后回退提交人
      VerifierName: string;//收发货明细中的收货确认人 或者 回退中的到货后回退提交人
      VerifierPhone: string;//收发货明细中的收货确认人电话 或者 回退中的到货后回退提交人电话
      ReceivingDate: TTimestamp;//收发货明细中的收货日期 或者 回退中的到货后回退确认同意日期
    }[];
  };
  Addition: {};
}
interface IEndPointGetSettlementArrivalSearchReturn {
  Result: {
    SettlementArrivalLists: {
      Flag: TArrivalOrRollback; // 到货或者回退
      Pid: number;
      RecordID: number;
      Ordinal: number;
      EngineeringName: string;
      PName: string;
      ClientName: string;
      ProcessingUnitName: string;
      ProductName: string;
      Quantity: number;//收发货明细中的收货数量 或者 回退中的到货后回退数量
      VerifierUid: number;//收发货明细中的收货确认人 或者 回退中的到货后回退提交人
      VerifierName: string;//收发货明细中的收货确认人 或者 回退中的到货后回退提交人
      VerifierPhone: string;//收发货明细中的收货确认人电话 或者 回退中的到货后回退提交人电话
      VerifyDate: TTimestamp;//收发货明细中的收货日期 或者 回退中的到货后回退确认同意日期
    }[];
  };
  Addition: {};
}

export class ApiSettlement {
  constructor(private api: ApiService) { }

  GetSettlementContent(Pid: number): Promise<IEndPointGetSettlementContentReturn> {
    return this.api.JSON('/endpoint/project/settlement/getsettlementcontent', { Pid });
  }

  UploadReceipt(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadReceiptReturn> {
    return this.api.JSON('/endpoint/project/settlement/uploadreceipt', { Pid, RecordID, FileID });
  }

  WithdrawReceipt(Pid: number, RecordID: number): Promise<IEndPointWithdrawReceiptReturn> {
    return this.api.JSON('/endpoint/project/settlement/withdrawreceipt', { Pid, RecordID });
  }

  DownloadReceipt(Pid: number, Id: number): Promise<IBlob> {
    return this.api.BLOB('/endpoint/project/settlement/downloadreceipt', { Pid, Id });
  }

  UploadCompletionPicture(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadCompletionPictureReturn> {
    return this.api.JSON('/endpoint/project/settlement/uploadcompletionpicture', { Pid, RecordID, FileID });
  }

  WithdrawCompletionPicture(Pid: number, RecordID: number): Promise<IEndPointWithdrawCompletionPictureReturn> {
    return this.api.JSON('/endpoint/project/settlement/withdrawcompletionpicture', { Pid, RecordID });
  }

  DownloadCompletionPicture(Pid: number, Id: number): Promise<IBlob> {
    return this.api.BLOB('/endpoint/project/settlement/downloadcompletionpicture', { Pid, Id });
  }

  UploadPerformanceCredit(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadPerformanceCreditReturn> {
    return this.api.JSON('/endpoint/project/settlement/uploadperformancecredit', { Pid, RecordID, FileID });
  }

  WithdrawPerformanceCredit(Pid: number, RecordID: number): Promise<IEndPointWithdrawPerformanceCreditReturn> {
    return this.api.JSON('/endpoint/project/settlement/withdrawperformancecredit', { Pid, RecordID });
  }

  DownloadPerformanceCredit(Pid: number, Id: number): Promise<IBlob> {
    return this.api.BLOB('/endpoint/project/settlement/downloadperformancecredit', { Pid, Id });
  }

  GetSettlementContentHistory(Pid: number, RecordID: number): Promise<IEndPointGetSettlementContentReturn> {
    return this.api.JSON('/endpoint/project/settlement/getsettlementcontenthistory', { Pid, RecordID });
  }

  GetSettlementArrivalList(Pid: number, RecordID: number): Promise<IEndPointGetSettlementArrivalListReturn> {
    return this.api.JSON('/endpoint/project/settlement/getsettlementarrivallist', { Pid, RecordID });
  }


  GetSettlementArrivalSearch(Pid: number, StartTime: TTimestamp, EndTime: TTimestamp, ProcessingUnitName: string): Promise<IEndPointGetSettlementArrivalSearchReturn> {
    return this.api.JSON('/endpoint/project/settlement/getsettlementarrivalsearch', { Pid, StartTime, EndTime, ProcessingUnitName });
  }

}
