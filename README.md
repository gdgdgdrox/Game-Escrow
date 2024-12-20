![Game Escrow Service Logo](./images/logo.png)

## Description
The Game Escrow is a web application designed to facilitate secure and transparent transactions involving digital game assets, such as Maplestory equipment or account, or CS:GO cosmetic skins. Acting as a neutral intermediary, the platform ensures the buyer's payment is held securely until the agreed-upon asset is delivered by the seller. Once the buyer confirms receipt, the payment is released to the seller, providing confidence and protection for both parties.

A transaction can be completed in 5 steps:
1. Buyer or Seller Initiates Transaction
2. Counterparty Reviews and Accept Transaction
3. Buyer Transfers Money to Escrow
4. Seller Release Game Asset to Buyer
4. Escrow Release Payment to Seller

**Website:** [https://game-escrow.com](https://game-escrow.com)

---

## Architecture

![System Architecture](url "System Architecture Diagram")


## Technologies Used
### Frontend
- Angular
- HTML, CSS, TypeScript

### Backend
- Java (Spring Boot)
- Spring Framework Modules: MVC, Security, Data JPA, WebSocket

### Database
- AWS RDS (Relational Database Service)
- AWS DynamoDB (NoSQL Database)
- AWS S3 (Object Storage)

### Deployment
- AWS S3 (Frontend Hosting)
- AWS EC2 (Backend Hosting)
- AWS CloudFront (CDN)


## Features
1. **Escrow Management**: Securely holds payments until transaction conditions are met.
2. **User Authentication**: JWT-based authentication and authorization for secure user sessions.
3. **Real-time Updates**: Utilizes WebSocket for real-time transaction status updates.
4. **Database Support**: Robust storage using AWS RDS and DynamoDB.
5. **Scalability**: Deployed on a scalable AWS infrastructure for high availability.