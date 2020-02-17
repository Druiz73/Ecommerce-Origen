import mongoose from 'mongoose';

const saleSchema = mongoose.Schema({
    cantidad: {
        type: String,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pendiente",
        required: true 
    }
    
})
const Sale = mongoose.model('Sale', saleSchema);

export default Sale;