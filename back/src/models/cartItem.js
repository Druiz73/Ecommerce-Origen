import mongoose from 'mongoose';

const cartItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cart: [
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
            price: Number,
            total: Number
        }
    ],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date }
});


const cartModel = mongoose.model('CartItem', cartItemSchema);
export default cartModel;