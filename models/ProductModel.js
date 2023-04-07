import { Schema, model } from "mongoose";

const ProductSchema = new Schema ({
    title: {type:String, required: true},
    price: {type:Number, required: true},
    image: {type:String, required: true},
    description: {type:String, requied:true, min:5},
    user: {type: Schema.Types.ObjectId, ref:"User"}
}, {timestamps:true});

const Product = model("Product", ProductSchema);
export default Product;