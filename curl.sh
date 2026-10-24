#!/usr/bin/env bash
# Testa as rotas de /users. Uso: ./curl.sh  (ou BASE_URL=http://ip-da-aws:3000 ./curl.sh)

BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "== POST /users (criar)"
RESPONSE=$(curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"Murilo","email":"murilo@email.com","phone":"11999999999"}')
echo "$RESPONSE"

ID=$(echo "$RESPONSE" | sed -n 's/.*"id":"\([^"]*\)".*/\1/p')

echo -e "\n== GET /users (listar)"
curl -s "$BASE_URL/users"

echo -e "\n\n== DELETE /users/$ID (deletar)"
curl -s -o /dev/null -w "status: %{http_code}\n" -X DELETE "$BASE_URL/users/$ID"

echo -e "\n== GET /users (depois de deletar)"
curl -s "$BASE_URL/users"
echo
