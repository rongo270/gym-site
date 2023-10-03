# gym-site

## Note
- 2 types of forms, first one work `onsubmit` button, and the other works `onchange` for variety.

## Configuration
### Asp.Net Core Web API
- Go To `ConfiguredValues.cs`.
- Change the values to your local ports, `GetClient` will be Angulars Default port and `GetServer` will be the server default port, they are defaulty set to: `https://localhost:7099` (server) and `http://localhost:4200` (client).
- Change servername from LAPTOP-70DUI6LP to your local mssql server name, in `appsettings.json`.
- Go to tools in VS studio > nuget package manager > package manager console > write: `Update-Database`

### Angular
- Open the Client using cmd and enter `npm install`.
- Go To `myEnvironment.ts`.
- Change the `ServerUrl` to your server default port, it is defaulty set to: `https://localhost:7099`.


### MSSQL
- Execute the next query scripts in your new created database:

#### Cars:
```
Go to your admin user (first user you make) -> Product add click on 'Add Starter Products'
it will import all the products (node, can only be done one`s)

```
#### Users:
```
Go to log in on top of the page -> Creat user -> first user you will sign up will be admin, so dont forget password
(user got no registration conditions for enter a user easily...)

```
## Running The Project
- Make sure you've configured everything.
- Open the Server Project and run it (it will also show you the swagger).
- Open the Client using cmd and enter `ng serve`.
- Enter your Angular port url in the browser, it is usually `http://localhost:4200/`.

## Technologies I've Used for the Project
- ASP.Net core 6 Web Api.
- Angular 15.
- Bootstrap 5.
- Microsoft SQL Server.

## Code I've used for my project
- Angular Image Upload Button: `https://code-maze.com/upload-files-dot-net-core-angular/`.


