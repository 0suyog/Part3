const mongoose = require('mongoose')

const Schema = mongoose.Schema

const personSchema = new Schema(
    {
        name: {
            type: String,
            minLength: 5,
            required: true,
            unique: true,
        },
        number: {
            type: String,
            minLength: 8,
            required: [true, 'Phone number is required'],
            unique: true,
            validate: {
                validator: (number) => {
                    return /^\d{2,3}-\d{6,11}$/.test(number)
                },
                message: (props) => `${props.value} isnt a phone number`,
            },
        },
    },
    {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.__v
                ret.id = ret._id
                delete ret._id
                return ret
            },
        },
    }
)

// personSchema.set("toJSON", {
//     transform: (doc, ret) => {
//         ret.id = ret._id.toString();
//         delete ret._id;
//         delete ret.__v;
//         console.log("doc", doc);
//         return ret;
//     },
// });

module.exports = mongoose.model('Person', personSchema)
