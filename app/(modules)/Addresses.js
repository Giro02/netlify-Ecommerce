import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const addressSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  zipCode: { type: String, required: true },
  address: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String },
  neighborhood: { type: String, required: true },
  cpfCnpj: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Addresses = mongoose.models.Addresses || mongoose.model("Addresses", addressSchema);

export default Addresses;


export async function findAddresses(userId) {

  const existingAddress = await Addresses.find({ userId:userId});
  if(existingAddress){
      return existingAddress;
  }
  return null
  
}