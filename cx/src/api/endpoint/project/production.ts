
import { ApiService, ISuccessE, IBlob } from '../../api';
import { TTimestamp } from '../../constants';




interface IEndPointGetProductionContentReturn {
  Result: {
    ProductionContents: {
      Id: number;
      Pid: number;
      RecordID: number;
      ProductName: string;
      CraftAuditorUid: number;
      CraftAuditorName: string;
      ProcessingUnitCode: string;
      ProcessingUnitName: string
      ProcessingUnitManagerUid: number;
      ProcessingUnitMangerName: string;
      ProductionPerformance: string;
      ProductionCycle: string;
      Delivery1Date: TTimestamp;
      Delivery1Quantity: number;
      Delivery1VerifierUid: number;
      Delivery1VerifierName: string;
      Delivery1VerifyDate: number;
      Delivery2Date: TTimestamp;
      Delivery2Quantity: number;
      Delivery2VerifierUid: number;
      Delivery2VerifierName: string;
      Delivery2VerifyDate: number;
      Delivery3Date: TTimestamp;
      Delivery3Quantity: number;
      Delivery3VerifierUid: number;
      Delivery3VerifierName: string;
      Delivery3VerifyDate: number;
      Delivery4Date: TTimestamp;
      Delivery4Quantity: number;
      Delivery4VerifierUid: number;
      Delivery4VerifierName: string;
      Delivery4VerifyDate: number;
      Delivery5Date: TTimestamp;
      Delivery5Quantity: number;
      Delivery5VerifierUid: number;
      Delivery5VerifierName: string;
      Delivery5VerifyDate: number;
      UnDeliveryQuantity: number;
      Comment: string;
      CertificateID: number;
      CreatorUid: number;
      CreatorName: string;
      CreatorPhone: string;
      LastModified: number;
    }[];
  };
  Addition: {};
}

interface IEndPointGetProductionHistoryContentReturn {
  Result: {
    ProductionHistoryContents: {
      Id: number;
      Pid: number;
      RecordID: number;
      ProductName: string;
      CraftAuditorUid: number;
      CraftAuditorName: string;
      ProcessingUnitCode: string;
      ProcessingUnitName: string
      ProcessingUnitManagerUid: number;
      ProcessingUnitMangerName: string;
      ProductionPerformance: string;
      ProductionCycle: string;
      Delivery1Date: number;
      Delivery1Quantity: number;
      Delivery1VerifierUid: number;
      Delivery1VerifierName: string;
      Delivery2Date: number;
      Delivery2Quantity: number;
      Delivery2VerifierUid: number;
      Delivery2VerifierName: string;
      Delivery3Date: number;
      Delivery3Quantity: number;
      Delivery3VerifierUid: number;
      Delivery3VerifierName: string;
      Delivery4Date: number;
      Delivery4Quantity: number;
      Delivery4VerifierUid: number;
      Delivery4VerifierName: string;
      Delivery5Date: number;
      Delivery5Quantity: number;
      Delivery5VerifierUid: number;
      Delivery5VerifierName: string;
      UnDeliveryQuantity: number;
      Comment: string;
      CertificateID: number;
      CreatorUid: number;
      CreatorName: string;
      CreatorPhone: string;
      LastModified: number;
    }[];
  };
  Addition: {};
}

type IEndPointModifyProductionContentReturn = ISuccessE;

type IEndPointVerifyDeliveryReturn = ISuccessE;

type IEndPointSetCraftAuditorReturn = ISuccessE;

interface IEndPointGetFactoryManagerReturn {
  Result: {
    ProjectUsers: {
      Uid: number;
      Name: string;
      Phone: string;
    }[];
  };
  Addition: {};
}

type IEndPointUploadCertificateReturn = ISuccessE;

type IEndPointWithdrawCertificateReturn = ISuccessE;

interface IEndPointGetProductionPerformanceReturn {
  Result: {
    ProductionPerformances: {
      Id: number;
      ProductionPerformance: string;
      CreatorUid: number;
      CreatorName: string;
      CreatorPhone: string;
      LastModified: TTimestamp;
    }[];
  };
  Addition: {};
}

export class ApiProduction {
  constructor(private api: ApiService) { }

  GetProductionContent(Pid: number): Promise<IEndPointGetProductionContentReturn> {
    return this.api.JSON('/endpoint/project/production/getproductioncontent', { Pid });
  }

  ModifyProductionContent(
    Pid: number, RecordID: number, ProcessingUnitCode: string, ProcessingUnitName: string,
    ProcessingUnitMangerUid: number, ProductionCycle: string, Delivery1Date: TTimestamp,
    Delivery1Quantity: number, Delivery2Date: TTimestamp, Delivery2Quantity: number,
    Delivery3Date: TTimestamp, Delivery3Quantity: number, Delivery4Date: TTimestamp,
    Delivery4Quantity: number, Delivery5Date: TTimestamp, Delivery5Quantity: number,
    Comment: string):
    Promise<IEndPointModifyProductionContentReturn> {
    return this.api.JSON('/endpoint/project/production/modifyproductioncontent ', {
      Pid, RecordID, ProcessingUnitCode, ProcessingUnitName, ProcessingUnitMangerUid,
      ProductionCycle, Delivery1Date, Delivery1Quantity, Delivery2Date, Delivery2Quantity,
      Delivery3Date, Delivery3Quantity, Delivery4Date, Delivery4Quantity, Delivery5Date,
      Delivery5Quantity, Comment
    });
  }

  GetProductionContentHistory(Pid: number, RecordID: number): Promise<IEndPointGetProductionContentReturn> {
    return this.api.JSON('/endpoint/project/production/getproductioncontenthistory', { Pid, RecordID });
  }

  VerifyProductionDelivery(Pid: number, RecordID: number, VerifyColumn: number): Promise<IEndPointVerifyDeliveryReturn> {
    return this.api.JSON('/endpoint/project/production/verifydelivery', { Pid, RecordID, VerifyColumn });
  }

  SetCraftAuditor(Pid: number, RecordID: number): Promise<IEndPointSetCraftAuditorReturn> {
    return this.api.JSON('/endpoint/project/production/setcraftauditor', { Pid, RecordID });
  }

  GetFactoryManager(Pid: number): Promise<IEndPointGetFactoryManagerReturn> {
    return this.api.JSON('/endpoint/project/production/getfactorymanager', { Pid });
  }

  UploadCertificate(Pid: number, RecordID: number, FileID: number): Promise<IEndPointUploadCertificateReturn> {
    return this.api.JSON('/endpoint/project/production/uploadcertificate', { Pid, RecordID, FileID });
  }

  WithdrawCertificate(Pid: number, RecordID: number): Promise<IEndPointWithdrawCertificateReturn> {
    return this.api.JSON('/endpoint/project/production/withdrawcertificate', { Pid, RecordID });
  }

  DownloadCertificate(Pid: number, Id: number): Promise<IBlob> {
    return this.api.BLOB('/endpoint/project/production/downloadcertificate', { Pid, Id });
  }

  GetProductionPerformance(Pid: number, RecordID: number): Promise<IEndPointGetProductionPerformanceReturn> {
    return this.api.JSON('/endpoint/project/production/getproductionperformance', { Pid, RecordID });
  }

}

