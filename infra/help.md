# Iniciar o docker
docker compose -f infra/compose.yaml up -d

# Parar o docker
docker compose -f infra/compose.yaml down

# Mostrar logs do docker
docker compose -f infra/compose.yaml logs -f

# Iniciar o banco de dados
docker exec -it tabnews-db psql -U postgres

