# BCL IMS API

**Standardized API for Data and System Integration**

---

## Abstract

The **BCL IMS API** provides a complete set of secure endpoints for managing investors, KYC data, collective investment products, investment accounts, transactions, and reference data.

---

## Base URL

```
https://{{host}}
```

---

## Authentication

### Generate Access Token

**Endpoint**

```
POST /api/auth/generate
```

**Purpose**
Generates an access token required for all protected endpoints.

**Request Fields**

| Field     | Type   | Required |
| --------- | ------ | -------- |
| VendorID  | string | Yes      |
| SecretKey | string | Yes      |

**Example Request**

```json
{
  "VendorID": "xx",
  "SecretKey": "xx"
}
```

**Failure Response (400)**

```json
{
  "Message": "Login Failed"
}
```

**Success Response**

```json
[
  {
    "AccessToken": "WalgxXMY6fl*****"
  }
]
```

---

## KYC & IDENTITY MANAGEMENT

### Add Individual KYC

**Endpoint**

```
POST /api/partner/addindividualidentity_bcl
```

**Purpose**
Uploads KYC details of a new investor.

**Request Fields**

**Personal Details**

| Field                  | Type   | Required |
| ---------------------- | ------ | -------- |
| FirstName              | string | Yes      |
| MiddleName             | string | No       |
| LastName               | string | Yes      |
| Gender                 | string | Yes      |
| Title                  | string | No       |
| DateOfBirth            | date   | Yes      |
| ResidencyStatus        | string | Yes      |
| PassPortNumber         | string | No       |
| IDNumber               | string | Yes      |
| MaritalStatus          | string | No       |
| SourceOfFunds          | string | Yes      |
| SpouseName             | string | No       |
| Occupation             | string | Yes      |
| NextOfKin              | string | Yes      |
| PostalAddress          | string | Yes      |
| NationalityCountryCode | string | Yes      |
| ResidencyCountryCode   | string | Yes      |
| CurrencyCode           | string | Yes      |
| PhysicalAddress        | string | Yes      |
| MobileNumber           | string | Yes      |
| PrimaryEmail           | string | Yes      |
| PinNumber              | string | No       |

**Relations Array Fields**

| Field                 | Type   | Required |
| --------------------- | ------ | -------- |
| RelationshipID        | string | Yes      |
| Name                  | string | Yes      |
| Email                 | string | Yes      |
| PhoneNumber           | string | Yes      |
| IDNumber              | string | Yes      |
| DOB                   | date   | Yes      |
| BeneficiaryPercentage | string | Yes      |

**Complete Example Request**

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
    },
    {
      "RelationshipID": "2",
      "Name": "Doe Jr",
      "Email": "jdoejr@boradvisors.com",
      "PhoneNumber": "+254000000000",
      "IDNumber": "000000001",
      "DOB": "01 Jan 1970",
      "BeneficiaryPercentage": "50"
    }
  ]
}
```

**Failure Response (400)**

```json
{
  "Message": "Request failed"
}
```

**Success Response**

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

---

### Fetch / Verify KYC

**Endpoint**

```
POST /api/partner/fetchidentity_bcl
```

**Purpose**
Verifies an investor and retrieves full KYC details.

**Example Request**

```json
{
  "IdentityID": "0000001099",
  "PrimaryEmail": "sample@boradvisors.com",
  "MobileNumber": "+233700000000"
}
```

**Failure Response (400)**

```json
{
  "Message": "Request failed, no records retrieved"
}
```

**Success Response**

```json
{
  "Status": [
    {
      "Status": "0",
      "Description": "Request successful"
    }
  ],
  "IdentityDetails": [
    {
      "IdentityType": "I",
      "FirstName": "JOHN",
      "MiddleName": "",
      "LastName": "DOE",
      "Gender": "M",
      "Title": "MR",
      "DateOfBirth": "1970-01-01T00:00:00",
      "ResidencyStatus": "1",
      "PassPortNumber": "1234567",
      "VATNumber": null,
      "IDNumber": "123456789",
      "WorkPermit": null,
      "MaritalStatus": "M",
      "SpouseName": "Jane Doe",
      "Occupation": "IT",
      "NextOfKin": "JJ Doe",
      "PostalAddress": "123",
      "NationalityCountryCode": "KE",
      "ResidencyCountryCode": "KE",
      "CurrencyID": "KES",
      "PhysicalAddress": "J ROAD 123, P COURT NO 10",
      "MobileNumber": "+233700000000",
      "PrimaryEmail": "sample@boradvisors.com",
      "SecondaryEmail": null,
      "PinNumber": "1234",
      "Comments": null,
      "imgPhotoString": null,
      "imgSignatureString": null,
      "imgBankProofString": null,
      "imgIDString": null,
      "imgPINString": null
    }
  ]
}
```

---

## PRODUCTS (PORTFOLIOS)

### Fetch Products with Offer Prices

**Endpoint**

```
POST /api/partner/fetchciportfolios_bcl
```

**Example Request**

```json
{
  "PortfolioID": ""
}
```

**Failure Response (403)**

```json
{
  "Response": 403,
  "Message": "Invalid token"
}
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Request successful" }
  ],
  "Portfolios": [
    {
      "PortfolioID": "BBF1100",
      "PortfolioName": "BORA BALANCED UNIT TRUST",
      "OfferPrice": 0.2096
    },
    {
      "PortfolioID": "BFI1100",
      "PortfolioName": "BORA FIXED INCOME UNIT TRUST",
      "OfferPrice": 0.2011
    },
    {
      "PortfolioID": "BGF1100",
      "PortfolioName": "BORA GLOBAL BALANCED TRUST",
      "OfferPrice": 0.9998
    }
  ]
}
```

---

## INVESTMENT ACCOUNTS

### Create Investment Account

**Endpoint**

```
POST /api/partner/addciaccount_bcl
```

**Example Request**

```json
{
  "IdentityID": "0000001099",
  "PrimaryEmail": "sample@boradvisors.com",
  "MobileNumber": "+233700000000",
  "PortfolioID": "BBF1100",
  "AccountName": "John Doe",
  "CurrencyCode": "GHS"
}
```

**Failure Response (403)**

```json
{
  "Response": 403,
  "Message": "Invalid token"
}
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Request successful" }
  ],
  "CIAccountNumber": [
    { "AccountNumber": "BB00252" }
  ]
}
```

---

### Fetch Investment Account

**Endpoint**

```
POST /api/partner/fetchciaccount_bcl
```

**Example Request**

```json
{
  "IdentityID": "0000001099",
  "PrimaryEmail": "sample@boradvisors.com",
  "MobileNumber": "+233700000000",
  "AccountNumber": "BB00252"
}
```

**Failure Response**

```json
{
  "Message": "Request failed, access to account denied."
}
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Request successful" }
  ],
  "Account": [
    {
      "PortfolioID": "BBF1100",
      "PortfolioName": "BORA BALANCED UNIT TRUST",
      "AccountNumber": "BB00252",
      "AccountName": "JOHN DOE"
    }
  ]
}
```

---

### Fetch Investment Account With Balance

**Additional Field**

```json
"ReturnNav": true
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Request successful" }
  ],
  "Account": [
    {
      "PortfolioID": "BBF1100",
      "PortfolioName": "BORA BALANCED UNIT TRUST",
      "AccountNumber": "BB00252",
      "AccountName": "JOHN DOE",
      "Amount": 0.0,
      "Nav": 0.0
    }
  ]
}
```

---

## TRANSACTIONS

### Deposit Cash

**Endpoint**

```
POST /api/partner/depositcicash_bcl
```

**Example Request**

```json
{
  "TransactionReference": "FTX00000",
  "extTranID": "001",
  "AccountNumber": "BB00252",
  "TransactionDate": "07 Jan 2026",
  "Amount": "1200",
  "Narration": "Sample Deposit"
}
```

**Failure Response**

```json
{
  "Status": [
    {
      "statusCode": "1",
      "statusMessage": "Invalid **: Deposit Upload Failed"
    }
  ]
}
```

**Success Response**

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

**Endpoint**

```
POST /api/partner/addcicashwithdrawal_bcl
```

**Example Request**

```json
{
  "PrimaryEmail": "sample@boradvisors.com",
  "MobileNumber": "+233700000000",
  "AccountNumber": "BB00252",
  "TransactionDate": "09 Jan 2026",
  "Amount": "900",
  "Comment": "Sample Withdrawal"
}
```

**Failure Response**

```json
{
  "Message": "Invalid Account Number"
}
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Request Successful" }
  ]
}
```

---

## STATEMENTS

### Fetch Mini Statement

**Endpoint**

```
POST /api/partner/fetchministatement_bcl
```

**Failure Response**

```json
{
  "Message": "Request failed, access to account denied"
}
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Request successful" }
  ],
  "CIMiniStatementDetails": [
    {
      "TranID": 614560,
      "TransactionType": "Deposit",
      "TransactionDate": "2026-01-07T00:00:00",
      "Instrument": "CASH",
      "CurrencyName": "GHANA CEDI",
      "Amount": 1200.0,
      "Price": 0.2011,
      "Units": 5967.1805,
      "Remarks": "Auto Approval"
    }
  ]
}
```

---

## REFERENCE DATA

### Fetch Relations

**Endpoint**

```
POST /api/partner/fetchdata
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Success" }
  ],
  "Data": [
    { "RelationID": "DA", "Relation": "Daughter" },
    { "RelationID": "G", "Relation": "Guardian" },
    { "RelationID": "N", "Relation": "Next Of Kin" },
    { "RelationID": "S", "Relation": "Spouse" },
    { "RelationID": "T", "Relation": "Trustee" }
  ]
}
```

---

### Fetch Banks

**Endpoint**

```
POST /api/partner/fetchbanks
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Success" }
  ],
  "BankDetails": [
    { "BankID": 1, "BankName": "BANK OF GHANA" },
    { "BankID": 2, "BankName": "STANDARD CHARTERED BANK (GH) LTD." },
    { "BankID": 3, "BankName": "BARCLAYS BANK (GH) LTD" }
  ]
}
```

---

### Fetch Countries

**Endpoint**

```
POST /api/partner/fetchcountries
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Success" }
  ],
  "Countries": [
    { "CountryID": 1, "CountryCode": "BY", "CountryName": "Belarus" },
    { "CountryID": 2, "CountryCode": "NA", "CountryName": "Namibia" },
    { "CountryID": 3, "CountryCode": "ZW", "CountryName": "Zimbabwe" }
  ]
}
```

---

### Fetch File Types

**Endpoint**

```
POST /api/partner/fetchfiletypes
```

**Success Response**

```json
{
  "Status": [
    { "Status": "0", "Description": "Success" }
  ],
  "FileTypesDetails": [
    { "FileCode": "BA", "FileName": "Proof of bank account" },
    { "FileCode": "ID", "FileName": "Identification document" },
    { "FileCode": "P", "FileName": "Photograph" }
  ]
}
```

---

## FINAL NOTES

* This README mirrors the PDF documentation exactly.
* All example inputs, success responses, and failure responses are explicitly included.
* This document is safe to hand directly to an AI agent or developer without supplemental context.

