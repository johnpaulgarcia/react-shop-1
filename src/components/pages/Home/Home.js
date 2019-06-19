import React, {  Component } from 'react';
import Container from '../../template/Container';
import Right from '../Right';
import Left from '../Left';
import ListItem from '../../template/ListItem';
import List from '../../template/List';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {

            shop: [
                {name: 'Bag',avatar:'https://product-images.www8-hp.com/digmedialib/prodimg/lowres/c03245561.png',description: 'Some dopey bag.',price: 2000.99,quantity: 1},
                {name: 'Shoes',avatar: 'https://4.imimg.com/data4/UU/UU/GLADMIN-/images-sparx-shoes-large-sm-248-20r-blue-orange-500x500.png',description: 'Blehy shoes.',price: 1500.99,quantity: 1},
                {name: 'Slippers',avatar: 'http://pngriver.com/wp-content/uploads/2018/04/Download-Beach-Sandal-PNG-File.png',description: 'Not slippery slippers.',price: 1098.00,quantity: 1},
                              ],
            cart: [],
            isPay: false,
            isDup: false,
            totalPayment: 0,
            activeItem: '',
            toggle: null
        }
    }

    addToCart = (item) => {
        let checkset = new Set(this.state.cart);

        if(checkset.has(item)){
           
           item['quantity'] = item['quantity'] + 1;
           
        }

        else {
        item['quantity'] = 1;
        let newCart = this.state.cart;
        newCart.push(item);
        this.setState({
            cart: newCart
        })
        }
        let price = this.state.cart.reduce((prev,next)=>prev+(next.price*next.quantity),0);
        this.setState({
            totalPayment: price
        })

        
    }




    remove = (item) => {
        let oldCart = this.state.cart;
        let newCart = oldCart.filter(key=>key!==item);
        let price = newCart.reduce((prev,next)=>prev+(next.price*next.quantity),0);
        this.setState({
            totalPayment: price,
            cart: newCart,
        })
        
        
        
    }
 
   toggle = () => {
        let es = this.state.toggle;

        if(es===null){
            this.setState({
                toggle: 'a',
            })
        }
        else {
            this.setState({
                toggle: null,
            })
        }
    }

 

    render(){
        return(
            <Container style="background: gray">
               
                

                {this.state.isPay && 
                    <div class="popup">
                    <div class="top topx">
                       Total Payment : {this.state.totalPayment} 
                       <p>
                            Payment Successful!                       
                       </p>
                    </div>
    
                    <div class="bottom" onClick={()=>this.setState({isPay: false})}>
                        OK
                    </div>
    
                    </div>
    

                }

                
          

               <Left >
               <div>
               <button onClick={()=>this.toggle()}>
                   TOGGLE VIEW
               </button>
               <h1>Products</h1>
                <List toggle={this.state.toggle}>
               {
                this.state.shop.map((item,index)=>{
                  return(
                    <ListItem item={item} addToCartFn={this.addToCart} key={index} />
                    
                  );
                })
               }
               </List>
               </div>
               </Left>
               
               <Right>
               <div>
               <h1>Cart <span class="tp">#Total Payment : {this.state.totalPayment}</span></h1>
               <List>
                  {
                      this.state.cart.map((item,index)=>{
                          return(
                            <div>
                            <ListItem item={item} removeCartFn={this.remove} key={index} />
                           </div>
                          );
                      })
                  }
                  </List>
                  </div>
                  <div class="paynow" onClick={()=>this.setState({isPay:true})}>
                    Pay Now
                  </div>
               </Right>
            </Container>
        );
    }
}


export default Home;
