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
- Home (slideshow of quotes and picture of motivation)
- About / Contact (About the site)
- Log / Sign in - Need to fill user data. Note, the password will be encripded with a key   
### Products
- User and Guset - Can add to the cart product that they will wish to buy, one's they will add product the sum of the product will subtract one
![image](https://github.com/user-attachments/assets/f2a60396-7d3b-47a4-915f-9cd7237ffd09)
- Admin - Admin can edit, delete or add a new product. If you wish to add product you need to provide IMG as well. all the changes will be send to the DB
- ![image](https://github.com/user-attachments/assets/6c84d824-99f4-4334-9417-1d9729a2dd7a)

### Cart
- Guset - the Guest car will be save as cookies, one's they will want to but they will be needed to log-in ones log in complete all the prudect will be update in there DB and the cookies will be deleted.
- User - Will be about to prosed to pay.
- ![image](https://github.com/user-attachments/assets/842d7e90-568d-4780-911b-aa6f4b184892)
### User Administration
-Admin will be aboul to edit user detiles and Delete them
![image](https://github.com/user-attachments/assets/8bc8b059-71ed-4ccc-b6ad-3e48cbde1cae)






