## 1. Overview

The BCL IMS API is a standardized REST API that enables secure system-to-system integration for investment management operations including investor onboarding, KYC, portfolios, accounts, balances, transactions, statements, and reference data.

All investment data is accessed strictly through these APIs.

---

## 2. Authentication

### Generate Access Token

Endpoint  
POST /api/auth/generate

Purpose  
Generates an access token required for all subsequent API requests.

Request Fields  
VendorID (string, mandatory)  
SecretKey (string, mandatory)

Example Request
```json
{
  "VendorID": "xx",
  "SecretKey": "xx"
}
```

Success Response

```json
[
  {
    "AccessToken": "WalgxXMY6fl*****"
  }
]
```

Failure Response

```json
{
  "Message": "Login Failed"
}
```

Error Codes
400 – Login failed
403 – Invalid or missing token

---

## 3. Investor Identity and KYC

### Add Individual Identity (KYC)

Endpoint
POST /api/partner/addindividualidentity_bcl

Description
Uploads KYC details of a new investor.

Request Fields

Personal Information
FirstName (string, mandatory)
MiddleName (string, optional)
LastName (string, mandatory)
Gender (string, mandatory)
Title (string, optional)
DateOfBirth (date, mandatory)
ResidencyStatus (string, mandatory)
PassPortNumber (string, optional)
IDNumber (string, mandatory)
MaritalStatus (string, optional)

Additional Information
SourceOfFunds (string, mandatory)
SpouseName (string, optional)
Occupation (string, mandatory)
NextOfKin (string, mandatory)
PostalAddress (string, mandatory)
NationalityCountryCode (string, mandatory)
ResidencyCountryCode (string, mandatory)
CurrencyCode (string, mandatory)
PhysicalAddress (string, mandatory)
MobileNumber (string, mandatory)
PrimaryEmail (string, mandatory)
PinNumber (string, optional)

Relations Array
RelationshipID (string, mandatory)
Name (string, mandatory)
Email (string, mandatory)
PhoneNumber (string, mandatory)
IDNumber (string, mandatory)
DOB (date, mandatory)
BeneficiaryPercentage (string, mandatory)

Example Request

```json
{
  "FirstName": "John",
  "MiddleName": "",
  "LastName": "Doe",
  "Gender": "M",
  "Title": "MR",
  "DateOfBirth": "01 Jan 1970",
  "ResidencyStatus": "R",
  "PassPortNumber": "1234567",
  "IDNumber": "123456789",
  "MaritalStatus": "M",
  "SourceOfFunds": "1",
  "SpouseName": "Jane Doe",
  "Occupation": "IT",
  "NextOfKin": "JJ Doe",
  "PostalAddress": "123",
  "NationalityCountryCode": "KE",
  "ResidencyCountryCode": "KE",
  "CurrencyCode": "KES",
  "PhysicalAddress": "J Road 123, P Court No 10",
  "MobileNumber": "+233700000000",
  "PrimaryEmail": "sample@boradvisors.com",
  "PinNumber": "1234",
  "Relations": [
    {
      "RelationshipID": "1",
      "Name": "Jane Doe",
      "Email": "janedoe@boradvisors.com",
      "PhoneNumber": "+254000000000",
      "IDNumber": "000000001",
      "DOB": "01 Jan 1970",
      "BeneficiaryPercentage": "50"
    }
  ]
}
```

Success Response

```json
{
  "Status": [
    {
      "Status": "0",
      "Description": "Request successful"
    }
  ],
  "IdentityID": [
    {
      "IdentityID": "0000001099"
    }
  ]
}
```

Failure Response

```json
{
  "Message": "Request failed"
}
```

---

### Fetch / Verify Investor Identity

Endpoint
POST /api/partner/fetchidentity_bcl

Request Fields
IdentityID (string, mandatory)
PrimaryEmail (string, mandatory)
MobileNumber (string, mandatory)

Example Request

```json
{
  "IdentityID": "0000001099",
  "PrimaryEmail": "sample@boradvisors.com",
  "MobileNumber": "+233700000000"
}
```

Failure Response

```json
{
  "Message": "Request failed, no records retrieved"
}
```

---

## 4. Investment Products (Portfolios)

### Fetch Portfolios with Offer Prices

Endpoint
POST /api/partner/fetchciportfolios_bcl

Request Fields
PortfolioID (string, optional)

Example Request

```json
{
  "PortfolioID": ""
}
```

Success Response

```json
{
  "Status": [
    {
      "Status": "0",
      "Description": "Request successful"
    }
  ],
  "Portfolios": [
    {
      "PortfolioID": "BBF1100",
      "PortfolioName": "BORA BALANCED UNIT TRUST",
      "OfferPrice": 0.2096
    }
  ]
}
```

---

## 5. Investment Accounts

### Create Investment Account

Endpoint
POST /api/partner/addciaccount_bcl

Request Fields
IdentityID (string, mandatory)
PrimaryEmail (string, mandatory)
MobileNumber (string, mandatory)
PortfolioID (string, mandatory)
AccountName (string, mandatory)
CurrencyCode (string, mandatory)

Success Response

```json
{
  "CIAccountNumber": [
    {
      "AccountNumber": "BB00252"
    }
  ]
}
```

---

### Fetch Investment Account

Endpoint
POST /api/partner/fetchciaccount_bcl

Request Fields
IdentityID
PrimaryEmail
MobileNumber
AccountNumber

Optional Field
ReturnNav (boolean)

---

### Fetch All Accounts for Investor

Endpoint
POST /api/partner/fetchciaccounts_bcl

Optional Field
ReturnNav (boolean)

---

## 6. Transactions

### Deposit Cash

Endpoint
POST /api/partner/depositcicash_bcl

Request Fields
TransactionReference (mandatory)
extTranID (mandatory)
AccountNumber (mandatory)
TransactionDate (mandatory)
Amount (mandatory)
Narration (optional)

Success Response

```json
{
  "Status": [
    {
      "statusCode": "0",
      "statusMessage": "Request successful",
      "erpReffID": "010920260833085130000"
    }
  ]
}
```

---

### Withdrawal Request

Endpoint
POST /api/partner/addcicashwithdrawal_bcl

Request Fields
PrimaryEmail
MobileNumber
AccountNumber
TransactionDate
Amount
Comment (optional)

---

## 7. Statements

### Fetch Mini Statement

Endpoint
POST /api/partner/fetchministatement_bcl

---

### Fetch Statement by Date Range

Endpoint
POST /api/partner/fetchciaccountStatement_bcl

Request Fields
PrimaryEmail
MobileNumber
AccountNumber
FromDate
ToDate

---

## 8. Reference Data

### Fetch Relations

Endpoint
POST /api/partner/fetchdata

Request

```json
{
  "RequestID": "IdentityRelations"
}
```

---

### Fetch Banks

Endpoint
POST /api/partner/fetchbanks

---

### Fetch Countries

Endpoint
POST /api/partner/fetchcountries

---

### Fetch File Types

Endpoint
POST /api/partner/fetchfiletypes

---

## 9. Common Errors

403 Invalid token
Request failed
Access denied
Invalid IdentityID
Invalid AccountNumber

---

