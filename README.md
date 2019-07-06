# xpagent-api
XP Agent API

## Package

### Package Query
- getOwnPackage (for seller)
    >
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