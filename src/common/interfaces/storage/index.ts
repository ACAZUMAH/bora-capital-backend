import { ObjectCannedACL } from "@aws-sdk/client-s3";
import { StreamingBlobPayloadInputTypes } from "@smithy/types";

export interface UploadStreamToStorageParams {
    filename: string;
    directory?: string;
    stream: StreamingBlobPayloadInputTypes;
    mimeType: string;
    acl?: ObjectCannedACL;
}