// build.sh
#!/usr/bin/env bash
set -o errexit
# exit on error
npm install
npm install @types/express @types/cors @types/jsonwebtoken @types/bcryptjs @types/node --save-dev

npm build

# Gerar o cliente Prisma
npx prisma generate

# Compilar TypeScript para JavaScript (se necessário)
# npm run build

echo "Construção finalizada com sucesso!"


