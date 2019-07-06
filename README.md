# xpagent-api

Complete tour marketplace API connected to mongodb database

## How to Use
- > `npm install`
- > `npm start`
- Open web browser on http://localhost:5000/graphql

### Query Example
    `{
        packages(){
            _id,
            packageName
        }
    }`

### Mutation Example
    `{
        mutation($packageName: String!){
            createPackage(packageName: $packageName){
                _id,
                packageName
            }
        }
    }`

<b> For File Upload request from client see: https://github.com/jaydenseric/graphql-multipart-request-spec 

or test via altair : https://altair.sirmuel.design/
</b>