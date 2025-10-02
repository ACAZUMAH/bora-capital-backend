export const kycRecordsTypeDefs = `#graphql 
    type KycRecords {
        reviewerId: ID
        documentId: ID
        documentType: String
        rejectionReason: String
        submittedAt: DateTime
        reviewedAt: DateTime
    }

    input UpdateKycRecordsInput {
        reviewerId: ID
        documentId: ID
        documentType: String
        rejectionReason: String
        reviewedAt: DateTime
    }

`;
