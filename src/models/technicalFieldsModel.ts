import { model, Schema } from 'mongoose';

export interface ITechnicalField {
	id: string;
	name: string;
	order: number;
}

const TechnicalFieldSchema = new Schema<ITechnicalField>({
	name: { type: String, required: true },
	order: { type: Number, required: true }
});

TechnicalFieldSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

TechnicalFieldSchema.set('toJSON', {
    virtuals: true
});

export const TechnicalFieldModel = model<ITechnicalField>('TechnicalField', TechnicalFieldSchema);