// REQUIRE PACKAGES
// ===============================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// CREATE SCHEMA
// ===============================
let ItemSchema = new Schema({
    title: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedDate: {
        type: Date
    },
    listId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

let Item = mongoose.model("Item", ItemSchema);


// EXPORT
// ===============================
module.exports = Item;