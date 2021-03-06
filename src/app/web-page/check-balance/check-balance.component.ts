import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-check-balance',
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.css']
})

export class CheckBalanceComponent implements OnInit {
  amount: any;
  logo ="assets/img/logo.png";
  cardNo : any;

  constructor(
      private apiService:BalanceService, 
      private accountService: AccountService, 
      private router:Router
  ) {}

  ngOnInit(): void {
    this.apiService.getBalance().subscribe(
      data => {
        this.amount = data
      },
      err => {
        // if(err.status === 401){
        //   this.router.navigateByUrl('/');
        // }
        alert("Not Found!");
      }
    );
    setTimeout(() => {
      sessionStorage.clear();
      this.router.navigateByUrl("/");
    }, 30000);
  }
  
  getBalance() {
    this.accountService.getCardByID(this.cardNo).subscribe(
      data => {
        this.amount=data;
      },
      err =>{
        alert("Wrong!")
      }
    )
  }

  public toLogout() {
    this.router.navigateByUrl("/");
  }

  public toReceipt() {
    this.router.navigateByUrl("/receipt");
  }


}
