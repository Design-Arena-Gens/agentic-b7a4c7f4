# SweetBite – Online Cake Ordering System

SweetBite is a full-stack cake shop experience built with a Spring Boot backend, React (Next.js) frontend, and a relational database layer optimized for MySQL deployments. Customers can explore cakes, customize orders, manage carts, and place purchases. Administrators can oversee the catalog, user base, and order pipeline.

## Project Structure

```
.
├── backend/          # Spring Boot REST API
└── frontend/         # Next.js (App Router) web client
```

## Backend (Spring Boot)

### Features

- Cake catalog CRUD with customization metadata
- User registration/login with hashed credentials and simple token service
- Order lifecycle management with status workflows
- Global exception handling and DTO-based validation
- Seed data loader for sample cakes and default admin account

### Tech Stack

- Java 17, Spring Boot 3
- Spring Data JPA, Hibernate
- MySQL-ready configuration (H2 dev profile bundled)

### Configuration

Default profile uses in-memory H2 so the app starts without external services. For MySQL deployments provide `SPRING_PROFILES_ACTIVE=mysql` and supply credentials (or override `DATABASE_*` env vars).

`backend/src/main/resources/application-mysql.properties`:
```
spring.datasource.url=jdbc:mysql://localhost:3306/sweetbite
spring.datasource.username=sweetbite
spring.datasource.password=secret
```

### Commands

```bash
cd backend
./mvnw spring-boot:run            # dev server (H2)
./mvnw -Dspring-boot.run.profiles=mysql spring-boot:run  # MySQL profile
./mvnw test
```

## Frontend (Next.js)

### Features

- Marketing homepage, catalog grid, cart workflow, account portal, admin dashboard
- Cart state managed via context with checkout to backend API
- Admin view for cakes, users, and order status updates
- Tailwind-powered styling with responsive layouts

### Configuration

Set the backend base URL with `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:8080`). Ensure CORS is enabled on the backend for deployed domains.

### Commands

```bash
cd frontend
npm install
npm run dev              # local dev (http://localhost:3000)
npm run lint
npm run build
npm run start            # production preview
```

## Deployment

1. Run backend in MySQL mode on your preferred host.
2. Deploy the Next.js frontend (optimized for Vercel). Provide `NEXT_PUBLIC_API_BASE_URL` pointing at the backend.

## Sample Admin Credentials

Seeded admin: `admin@sweetbite.com / admin123`

## License

MIT
