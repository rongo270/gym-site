# gym-site


## Configuration
### Asp.Net Core Web API
- Go To `ConfiguredValues.cs`.
- Change the values to your local ports, `GetClient` will be Angulars Default port and `GetServer` will be the server default port, they are defaulty set to: `https://localhost:7122` (server) and `http://localhost:4200` (client).
- Change servername from LAPTOP-70DUI6LP to your local mssql server name, in `appsettings.json`.


### Angular
- Open the Client using cmd and enter `npm install`.
- Go To `myEnvironment.ts`.
- Change the `ServerUrl` to your server default port, it is defaulty set to: `https://localhost:7122`.
- If you dont have angular download node.js -> npm install -g @angular/cli  !!!!!


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


