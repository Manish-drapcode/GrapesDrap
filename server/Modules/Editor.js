const mongoose = require('mongoose');

const EditorScheema = mongoose.Schema({
    GrapeId:{
        type:[String]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
});


const Editor = mongoose.model('Editor',EditorScheema);
export default Editor;