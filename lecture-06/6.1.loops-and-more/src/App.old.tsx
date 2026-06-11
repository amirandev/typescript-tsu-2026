
interface ProductType {
  name: string,
  brand: string,
  price: {
    regular: number,
    sale: number,
    percentage: string,
    ganvadeba: {
      procenti: string,
      price: number,
      provider: string[] | []
    }
  },
  prod_year: number
}



function App() {



  // const prices = [200, 300, 400, 600, 700];

  // for (let price of prices) { // of & in
  //   console.log(`გამოვიტანოთბ ფასი:  `, price);
  // }


  const product: ProductType = {
    name: "Lenovo G500",
    brand: "lenoivo",
    price: {
      regular: 650,
      sale: 599.99,
      percentage: "40%",
      ganvadeba: {
        procenti: "25%",
        price: 800,
        provider: ['TBC', 'BOG', 'CREDO']
      }
    },
    prod_year: 2026
  }

  return <div>
    <h1> {product.name}  </h1>
    <p> <strong>ბრენდი:</strong>  {product.brand} </p>
    <p> <strong>გამოშვების წელი:</strong> {product.prod_year} </p>

    <div>
      <h2>ფასი:</h2>
      <p>Sale {product.price.sale} (  {product.price.percentage} პროცენტი ფასდაკლება )</p>
      <div>
        <h3>განვადება</h3>
        <p>განვადება ხელმისაწვდომია შემდეგ ბანკში:</p>
        <ol>
          {product.price.ganvadeba.provider.map((bankName) => <li>{bankName}</li>)}
        </ol>
        <p>
          <strong>ფასინ განვადების შემთვევაში: </strong>
          <span>{product.price.ganvadeba.procenti}</span>
        </p>

        <hr />

        <h2>Array style</h2>
        <ol>
          {product['price']['ganvadeba']['provider'].map((bankName) => <li>{ bankName }</li>)  }
        </ol>
        <p>
          <strong>ფასინ განვადების შემთვევაში: </strong>
          <span>{product['price']['ganvadeba']['procenti']}</span>
        </p>
      </div>
    </div>

  </div>
}

export default App;