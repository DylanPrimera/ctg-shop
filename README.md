# Description



## Run on dev

1. Clone repository
2. Create a copy of ``.env.template`` and rename for ``.env``
3. Install dependencies ``npm or pnpm i``
4. Open Docker Desktop and run the docker compose file ``docker compose up -d``
5. Run migrations ``pnpm exec prisma migrate dev or npx prisma migrate dev``
6. Excecute seed to prepare fake data by ``npm run seed or pnpm seed``
7. Run the project ``npm run dev or pnpm dev``
