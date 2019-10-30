import { ApiService } from './api';

interface IFileUploadReturn {
    Result: {
        FileID: number;
    };
    Addition: {};
}

export class ApiFile {
    constructor(private api: ApiService) { }

    // file: event.target.files[0]
    Upload(file: File): Promise<IFileUploadReturn> {
        return this.api.UPLOAD('/file/upload', file);
    }
}
