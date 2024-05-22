import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

taskSchema.virtual('id').get(function () {
    return this._id.toHexString();
  });
  
  taskSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    }
  });
  
  export const Task = mongoose.model('Task', taskSchema);