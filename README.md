Folder structure for backend:



/root
├── /backend
│   ├── /prisma
│   │   └── schema.prisma         # Database models & Enums
│   ├── /src
│   │   ├── /modules              # Domain-specific logic
│   │   │   ├── /auth
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.dto.ts   # Zod validation schemas
│   │   │   ├── /tasks
│   │   │   │   ├── tasks.controller.ts
│   │   │   │   ├── tasks.service.ts
│   │   │   │   ├── tasks.routes.ts
│   │   │   │   └── tasks.dto.ts
│   │   │   └── /health
│   │   │       └── health.routes.ts # Deep health check (DB + Redis)
│   │   ├── /shared               # Cross-cutting concerns
│   │   │   ├── /middlewares
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── role.middleware.ts
│   │   │   │   ├── validate.middleware.ts # Uses DTOs to validate
│   │   │   │   └── error.middleware.ts    # Global error handler
│   │   │   ├── /utils
│   │   │   │   ├── logger.ts     # Structured console logging
│   │   │   │   ├── AppError.ts   # Custom error class
│   │   │   │   └── catchAsync.ts # Wrapper to eliminate try-catch bloat
│   │   │   └── prisma.ts         # Prisma Client singleton
│   │   ├── /config
│   │   │   ├── env.ts            # Validated env variables
│   │   │   └── swagger.ts        # API Doc configuration
│   │   ├── app.ts                # Express setup & global middlewares
│   │   └── server.ts             # Entry point (port listener)
│   ├── .env
│   ├── tsconfig.json
│   └── package.json
└── /frontend                     # Next.js Module
    ├── /src
    │   ├── /app                  # Pages & Layouts
    │   ├── /components           # UI Components
    │   ├── /services             # Axios API calls




    Folder structure for frontend:frontend/
├── app/
│   ├── dashboard/
│   │   └── page.tsx      <-- (New Dashboard File)
│   ├── layout.tsx
│   └── page.tsx           <-- (Your Login/Register File)
├── src/
│   └── lib/
│       └── axios.ts       <-- (Your API Client)
├── .env.local             <-- (Contains NEXT_PUBLIC_API_URL)
├── package.json
└── next.config.ts




# Scalable Task Management API (Primetrade Assignment)

A production-grade REST API built with **Node.js, Express, and PostgreSQL**. This project focuses on modularity, security, and observable system health.

## 🚀 Core Features

- **Module-Based Architecture**: Strictly decoupled domains (Auth, Tasks, Users) for infinite scalability.
- **Deep Health Monitoring**: `/api/v1/health` endpoint verifies DB (Prisma) and Cache (Redis) status.
- **Secure Authentication**: JWT-based auth with Role-Based Access Control (RBAC).
- **Performance Optimization**: Redis caching for task retrieval to reduce DB load.
- **Security First**: Rate limiting, input sanitization via Zod DTOs, and password hashing.
- **Documentation**: Fully annotated Swagger UI for easy API testing.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Validation**: Zod (DTO Pattern)
- **Frontend**: Next.js (App Router), Axios, Tailwind CSS

    │   └── /middleware.ts        # Client-side route protection
    └── package.json
