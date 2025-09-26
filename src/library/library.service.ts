import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './schema/library.schema';
import { Model } from 'mongoose';
import { Book } from './schema/book.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}
  async create(): Promise<Library> {
    const book1 = await new this.bookModel({
      title: 'Marvel Comics',
      author: 'Stan Lee',
    }).save();
    const book2 = await new this.bookModel({
      title: 'DC Comics',
      author: 'Bob Kane',
    }).save();
    const newLibrary = new this.libraryModel({
      name: 'City Library',
      books: [book1._id, book2._id],
    });
    return newLibrary.save();
  }

  async getAllLibraries(): Promise<Library[]> {
    return this.libraryModel.find().populate('books').exec();
  }
}
