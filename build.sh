// build.sh
#!/usr/bin/env bash
set -o errexit
# exit on error

yarn build

# Gerar o cliente Prisma
npx prisma generate

# Compilar TypeScript para JavaScript (se necessário)
# npm run build

echo "Construção finalizada com sucesso!"


