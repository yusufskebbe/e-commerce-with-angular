import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {

  cartItems:Product[] = [];

  totalPrice:number = 0

  constructor(private cartService: CartService){}

  ngOnInit()  {
    return this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items
     this.totalPrice = this.getTotalPrice()
    })
  }

  getTotalPrice():number{

    let total = 0

    for(let item of this.cartItems){
      total = total + item.price
    }
    return total
  }

  clearCart():void{
    this.cartService.clearCart().subscribe()
  }

  checkout():void{
    this.cartService.checkoutCart(this.cartItems).subscribe()
  }

}
