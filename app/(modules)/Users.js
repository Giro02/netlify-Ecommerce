import mongoose, {Schema} from "mongoose"


mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: {type: String, required:false},
    orders: {type: String},
    role:{type:String}
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User",userSchema)


export default User;

export async function checkEmailExists(email) {
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return existingUser;
    }
    return null
    
  }

  export async function checkOrdersExists(email){
    const user = await User.findOne({ email}).populate("orders");

    if(user){
        return user
    }
    return null
  } 
 