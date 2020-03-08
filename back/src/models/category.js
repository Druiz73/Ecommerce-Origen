
import mongoose from 'mongoose';

const categoriesSchema = mongoose.Schema({
    
    nombre: { type: String, required: true },
    image:[ {
        base64: String
    }],
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});


const categoriesModel= mongoose.model('Category', categoriesSchema);
export default categoriesModel;
