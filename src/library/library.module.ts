import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Library, LibrarySchema } from './schema/library.schema';
import { Book, BookSchema } from './schema/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:Library.name, schema:LibrarySchema},{name:Book.name, schema:BookSchema}])],
  controllers: [LibraryController],
  providers: [LibraryService]
})
export class LibraryModule {}
