import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    slug: { type: String, unique: true },
    precio: { type: Number, required: true },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    descripcion: { type: String },
    productPic: [
        {
            img: String
        }
    ],
    reviews: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String,
            createdAt: Date
        }
    ],
    talles: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String,
            
        }
    ],
    keyword: {type: String},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true  },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    updatedAt: Date,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

const productModel =mongoose.model('Product', productSchema);
export default productModel;