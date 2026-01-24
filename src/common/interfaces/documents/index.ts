import { BclStatus } from '../bcl';

export interface IFileType {
  FileTypeId: string;
  FileTypeName: string;
  Extension: string;
}

export interface FetchFileTypesSuccessResponse {
  Status: BclStatus[];
  FileTypeDetails: IFileType[];
}
