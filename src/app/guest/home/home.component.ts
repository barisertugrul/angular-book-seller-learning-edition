import { Purchase } from './../../models/purchase.model';
import { PurchaseService } from './../../services/purchase.service';
import { BookService } from './../../services/book.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/models/book.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList: Array<Book> = [];
  faBook = faBook;
  errorMessage: string = "";
  infoMessage: string = "";

  constructor(private authenticationService: AuthenticationService,
    private bookService: BookService,
    private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(
      data => {
        this.bookList = data;
      }
    )

  }

  purchase(item: Book){
    if(!this.authenticationService.currentUserValue?.id){
      this.errorMessage = "You should log in to buy a book.";
      return;
    }

    const purchase = new Purchase(this.authenticationService.currentUserValue.id,item.id, item.price)

    this.purchaseService.savePurchase(purchase).subscribe(
      data => {
        this.infoMessage = "Mission is completed";
      }, err => {
        this.errorMessage = "nexpected error occurred.";
        console.log(err);
      }
    );
  }

}
