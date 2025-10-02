import { Schema } from 'mongoose'
import { Theme } from 'src/common/enums'
import { PreferencesDocument } from 'src/common/interfaces'

export const preferencesSchema = new Schema<PreferencesDocument>({
    //userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    theme: { type: String, enum: Object.values(Theme), default: Theme.LIGHT },
    currency: { type: String, default: 'GHS' },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'GMT' },
    notificationsEnabled: { type: Boolean, default: false }
})