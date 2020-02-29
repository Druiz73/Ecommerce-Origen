import mongoose from 'mongoose';

const saleSchema = mongoose.Schema({
    products: [{
        cantidad: {
            type: String,
            required: true
        },
        _id: String,
        unit_price: Number
    }],
    status: {
        type: String,
        default: "Pendiente",
        required: true 
    }
    
})
const Sale = mongoose.model('Sale', saleSchema);

export default Sale;