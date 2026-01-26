import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },        

    slug: {
        type: String,
        required: true,
        unique: true
    }, 

    summary: {
        type: String,
        default: ""
    },         

    type: [{ type: String, enum: ["article", "video"] }], 

    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner"
    },

    topics: [{
        type: String
    }],                     

    body: {
        type: String,
        default: ""
    },            

    mediaUrl: {
        type: String,
        default: ""
    },        

    sourceUrl: {
        type: String,
        default: ""
    },       

    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft"
    },

    publishedAt: {
        type: Date
    },

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }, 

    isPremium: {
        type: Boolean,
        default: false
    },

    views: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

export default mongoose.model("Content", ContentSchema);