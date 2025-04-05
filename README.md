# gym-site


## Configuration
### Requires and Downloads
- Node.js (18.0 +)
- Angular (16.2 +) -> Enter in cmd npm install -g @angular/cli
- Typescript (5.2 +) -> Enter in cmd npm install typescript --save-dev
- Download .NET 6.0
- in Visual Studio go to tools -> get Tools and Featurs -> Individual Components, mark .NET 6.0
- Downlaod mmsql (Recommended)
  
### Asp.Net Core Web API
- Go To `ConfiguredValues.cs`.
- Change the values to your local ports, `GetClient` will be Angulars Default port and `GetServer` will be the server default port, they are defaulty set to: `https://localhost:7122` (server) and `http://localhost:4200` (client).
- Change servername from LAPTOP-70DUI6LP to your local mssql server name, in `appsettings.json` (In gym siteAPI).


### Angular
- Open the Client using cmd and enter `npm install`.
- Go To `myEnvironment.ts`.
- Change the `ServerUrl` to your server default port, it is defaulty set to: `https://localhost:7122`.


```
### MSSQL
- Go to tools in VS studio > nuget package manager > package manager console > write: `Update-Database` (After Configuration)

```
#### Users:
Go to log in on top of the page -> Creat user -> first user you will sign up will be admin, so dont forget password
(user got no registration conditions for enter a user easily...)
```

#### Products:
Go to your admin user (first user you make) -> Product -> click on 'Add Starter Products'
it will import all the products (node, can only be done one`s)

```


## Running The Project
- Make sure you've configured everything.
- Open the Server(API) Project and run it (it will also show you the swagger).
- Open the Client (gym-site) using cmd and enter `ng serve`.
- Enter your Angular port url in the browser, it is usually `http://localhost:4200/`.

## Technologies I've Used for the Project
- ASP.Net core 6 Web Api.
- Angular 15.
- Bootstrap 5.
- Microsoft SQL Server.

## Code I've used for my project
- Angular Image Upload Button: `https://code-maze.com/upload-files-dot-net-core-angular/`.



# On Site
## Pages
- Home - A slideshow of motivational quotes and pictures.
- About / Contact - Information about the site and how to contact the creator.
- Log / Sign in - Users need to provide their information. Passwords will be encrypted using a secure key.
### Products
- User & Guest - Both users and guests can add products to their cart. Once a product is added, the product quantity in the store will decrease by one.
![image](https://github.com/user-attachments/assets/f2a60396-7d3b-47a4-915f-9cd7237ffd09)
- Admin -Admins can edit, delete, or add new products. When adding a new product, an image must also be provided. All changes will be updated in the database.
- ![image](https://github.com/user-attachments/assets/6c84d824-99f4-4334-9417-1d9729a2dd7a)

### Cart
- Guset - The guest's cart is stored in cookies. When the guest decides to make a purchase, they must log in. Once logged in, all the products from the cookies will be transferred to their database profile, and the cookies will be cleared.
- User - Logged-in users can proceed to checkout and complete the payment.
- ![image](https://github.com/user-attachments/assets/842d7e90-568d-4780-911b-aa6f4b184892)
### User Administration
-Admins can edit or delete user details.
![image](https://github.com/user-attachments/assets/8bc8b059-71ed-4ccc-b6ad-3e48cbde1cae)

# Nodes
-This is the first project I built to practice Angular on my own, learning everything by myself. I know there’s still a lot to improve, and I’m excited to keep learning and getting better.






