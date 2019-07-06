# xpagent-api
XP Agent API

## Package

### Package Query
- createPackage
    
        `mutation (
        $packageName: String!,
        $packagePrice: Int!,
        $packageDescription: String!,
        $packageImages: [Upload!]!,
        $packageDuration: Int!,
        $packageCustomer: Int!
        ) {
            createPackage(
                tourPackage: {
                    packageName : $packageName, 
                    packagePrice: $packagePrice, 
                    packageDescription: $packageDescription, 
                    packageImages: $packageImages, 
                    packageDuration: $packageDuration, 
                    packageCustomer: $packageCustomer}){
                        packageName
                }}`

- updatePackage
  
        `mutation (
        $_id: ID!,
        $packageName: String,
        $packagePrice: Int,
        $packageDescription: String,
        $packageImages: [Upload],
        $packageDuration: Int,
        $packageCustomer: Int
        ){
            updatePackage(tourPackage: {
                _id: $_id,
                packageName: $packageName, 
                packagePrice: $packagePrice, 
                packageDescription: $packageDescription, 
                packageImages: $packageImages, 
                packageDuration: $packageDuration, 
                packageCustomer: $packageCustomer}) {
                    _id
        }
}`

- deletePackage

        `mutation ($_id : ID!){
            deletePackage(tourPackage: {_id: $_id}){
                _id
            }
        }`

- deleteMultiPackages
    
        `mutation ($_id : [deletePackageInput!]!){
            deleteMultiPackages(tourPackages: $_id){
                n,
                ok,
                deletedCount
            }
        }`

- deletePackageImage
        
        `mutation ($_id : ID!, $imageKey : String!){
            deletePackageImage(_id: $_id, imageKey: $imageKey) {
                _id
            }
        }`