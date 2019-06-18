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
        }
    }

    componentDidUpdate(prevProps){
      console.log(this.props.cart);

     
    }

    addQuantity = (item) => {
          item['quantity'] = item['quantity'] + 1;
           let price = this.state.cart.reduce((prev,next)=>prev+(next.price*next.quantity),0);
           this.setState({
               totalPayment: price
           })
    }

    removeQuantity = (item) => {
      
           if(item.quantity>1){
            item['quantity'] = item['quantity'] - 1;
            let price = this.state.cart.reduce((prev,next)=>prev+(next.price*next.quantity),0);
            this.setState({
                totalPayment: price
            })
           }
       
    }


    addToCart = (item) => {
        let checkset = new Set(this.state.cart);

        if(checkset.has(item)){
           
            this.setState({
                isDup: true
            })
           
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

 

    render(){
        return(
            <Container style="background: gray">
               
                {this.state.isDup && 
                    <div class="popup">
                    <div class="top topx">
                        You already have this item in the cart.
                    </div>
    
                    <div class="bottom" onClick={()=>this.setState({isDup: false})}>
                        OK
                    </div>
    
                    </div>
    

                }

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

                
          

               <Left>
               <div>
               <h1>Products</h1>
                <List>
               {
                this.state.shop.map((item,index)=>{
                  return(
                    <ListItem key={index}>
                      <div class="top">
                        <p class="prod_name">
                        {item.name} ({item.price} PHP)
                        </p>
                        <img class="prod_image" src={item.avatar} />

                      </div>

                      <div onClick={()=>this.addToCart(item)} class="bottom">
                          Add to Cart
                      </div>
                  </ListItem>
                    
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

                            <ListItem key={index}>
                      <div class="top">
                        <p class="prod_name">
                        {item.name} 
                        
                        </p>
                        <p class="prod_description">
                            {item.description} 
                        </p>
                        <img class="prod_image" src={item.avatar} />
                        <p>
                        Q: {item.quantity}
                        </p>
                        <button class="btn" onClick={()=>this.remove(item)}>
                            Remove
                        </button>

                        <div>
                        <button class="btnx db" onClick={()=>this.addQuantity(item)}>
                        +
                        </button>

                        <button class="btnx red" onClick={()=>this.removeQuantity(item)}>
                           -
                        </button>
                        </div>
                       
                      </div>

                      
                  </ListItem>


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