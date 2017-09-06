const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  userId: String,
  photoTitle: {
    type: String,
    required: [true, 'A Title is required'],
    validate: {
      validator: photoTitle => photoTitle.length > 4,
      message: 'Title must be longer than 4 characters.',
    },
  },
  photoDescription: String,
  photoPath: String,
  photoName: String,
  photoNameThumb: String,
  photoExtension: String,
  photoTags: [String],
  photoDeleted: Boolean,
  photoOriginalName: String,
},
  {
    timestamps: true,
  });

const PhotoSchema = mongoose.model('photo', photoSchema);

module.exports = PhotoSchema;
