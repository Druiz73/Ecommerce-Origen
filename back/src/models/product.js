import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    precioMayor: {
        type: Number,
        required: true
    },
    precioMenor: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    talles: [{
         type: String,
         required: true
    }],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    imageUrl: [{
       
        base64: String
    }]
   
   

   
    // keyword: {type: String},
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true  },
    // createdAt: { type: Date, default: Date.now },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    // updatedAt: Date,
    // updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

const productModel = mongoose.model('Product', productSchema);
export default productModel;