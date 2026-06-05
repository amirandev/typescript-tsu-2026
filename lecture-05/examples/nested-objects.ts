

const streets: string[] = ['Kostava', 'Agnels', 'Pekini', 'Dolidze'];
const specificLocation: (string | number)[]= ['Tbilisi', 'Saburtalo', 'Pekini', 13, 'ISpace']; 

// interface VarketiliType{
//     username: string,
//     email: string
// }

type VarketiliType = [string, string, string, number, string];

const locale2:VarketiliType = [
  'Tbilisi', 'Varketili', 'Huling', 31, 'Buildin 7'
]; 


interface AddressType{
  address: string,
  zip_code: string,
  is_primary: boolean
}

interface PostCustomer{
  username: string,
  email: string,
  addresses: AddressType[] | [],
}

const GPost: PostCustomer = { // GPost.addresses[0].address
  username: "John Doe",
  email: "xcontact@example.com",
  addresses: [
    {
      address: "USA, Delawer, New Castle",
      zip_code: "0120",
      is_primary: true
    },
    {
      address: "USA, New York, Bronx",
      zip_code: "0128",
      is_primary: false
    }
  ]
};



const App = () => {
  console.log('ქუჩები: ', streets);
  console.log('კონკრეტული ლოკაცია: ', specificLocation);

  console.log('მთლიანი ობიექტი: ', GPost);

  console.log('მომხარებლის ამერიკის მისამართი: ', GPost.addresses[0].address)
  console.log('მომხარებლის ამერიკის ZIP CODE: ', GPost.addresses[0].zip_code)


  return <h1>Hello world</h1>
}

export default App