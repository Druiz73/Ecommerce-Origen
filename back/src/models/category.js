
import mongoose from 'mongoose';

const categoriesSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});


const categoriesModel= mongoose.model('Category', categoriesSchema);
export default categoriesModel;
