import {Schema, model} from "mongoose";
import bcrypt from 'bcrypt';


const SALT_FACTOR = 7;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    admin: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        type: String,
        required: true
    }
});


userSchema.pre("save", function (next) {
    const hashPassword = bcrypt.hashSync(
        this.password,
        bcrypt.genSaltSync(SALT_FACTOR),
        null);

        this.password = hashPassword

        next()
  
})

userSchema.methods.comparePassword =  function (password) {
    const valid = bcrypt.compareSync(password, this.password)
    return valid;
}

export const usersModel = model("users", userSchema);
