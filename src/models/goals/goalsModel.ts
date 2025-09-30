import { Schema } from "mongoose";
import { GoalsDocument } from "src/common/interfaces";

const goalsSchema = new Schema<GoalsDocument>({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
});