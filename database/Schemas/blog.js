import { array } from 'joi';
import { Schema, model, models, mongoose } from 'mongoose';

const blogSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    blogCategoryTitle: {
        type: String,
        required: true,
        trim: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    blogDate: {
        type: Date,
        required: true,
    },
    blogTitle: {
        type: String,
        required: true,
        trim: true,
    },
    blogTitlePara: {
        type: String,
        required: true,
        trim: true,
    },
    blogSubTitle: {
        type: String,
        required: true,
        trim: true,
    },
    blogSubTitlePara: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentFirst: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentFirstPara: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentSecond: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentSecondPara: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentThird: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentThirdPara: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentFourth: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentFourthPara: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentFifth: {
        type: String,
        required: true,
        trim: true,
    },
    blogContentFifthPara: {
        type: String,
        required: true,
        trim: true,
    },
    blogCategory: {
        type: String,
        required: true,
        trim: true,
    },
    blogAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    blogStatus:{
        type:Boolean,
        default:true,
   },
},
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
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
        collection: "blog",
    });

const Blog = models.blog || model('blog', blogSchema);

export default Blog;