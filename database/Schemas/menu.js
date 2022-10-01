import { Schema, model, models,mongoose } from "mongoose";

const menuSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
        type: Buffer,
        required: true,
        contenttype : String,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      link: {
        type: String,
        required: true,
        trim: true,
      },
      rel: {
        type: String,
        required: true,
        trim: true,
      },
      active: {
        type: Number,
        default:true,
        
      },
   
   
  },
  {
    timestamps: {
      createdAt: "menuCreationDate",
      updatedAt: "updated",
    },
    id: false,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
  },
  {
    collection: "menu",
  }
);

const Menu = models.menu || model("menu", menuSchema);

export default Menu;
