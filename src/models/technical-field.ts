import { model, Schema } from 'mongoose';

export interface TechnicalField {
	name: string;
	order: number;
}

const TechnicalFieldSchema = new Schema<TechnicalField>({
	name: { type: String, unique: true, required: true },
	order: { type: Number, required: true }
});

export const TechnicalFieldModel = model<TechnicalField>('TechnicalField', TechnicalFieldSchema);