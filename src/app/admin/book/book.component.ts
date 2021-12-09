import { AuthenticationService } from 'src/app/services/authentication.service';
import { Book } from './../../models/book.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

declare var $:any;
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  @Input() book: Book = new Book();
  errorMessage: string = ""

  @Output() save = new EventEmitter<any>();

  constructor(private bookService: BookService,
    private authService: AuthenticationService) { }

  saveBook(){
    this.bookService.saveBook(this.book).subscribe(
      data => {
        this.save.emit(data);
        $('#bookModal').modal('hide');
      }, err => {
        this.errorMessage = "Unexpected error occurred";
        console.log(err);
      });
  }

  showBookModal(){
    $('#bookModal').modal('show');
  }
}
