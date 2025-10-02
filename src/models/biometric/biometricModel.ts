import { Schema } from 'mongoose'
import { BiometricDocument } from 'src/common/interfaces'

export const biometricSchema = new Schema<BiometricDocument>({
    enabled: { type: Boolean },
    expiresAt: { type: Date }
}, { _id: false })
