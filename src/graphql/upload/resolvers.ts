import { DocumentsDocument } from 'src/common/interfaces';
import { idResolver } from '../general';

const url = (parent: DocumentsDocument) => {
  return `${process.env.UPLOAD_BASE_UR}/${parent.directory}/${parent.fileName}`;
};

export const uploadResolvers = {
  Upload: {
    id: idResolver,
    url,
  },
};
