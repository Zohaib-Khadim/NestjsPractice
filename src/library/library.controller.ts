import { Controller, Injectable, Post } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
    constructor(private readonly libraryService:LibraryService) {}

    @Post()
    createLibrary() {
        return this.libraryService.create();
    }

    @Post('all')
    getAllLibraries() {
        return this.libraryService.getAllLibraries();
    }
}
