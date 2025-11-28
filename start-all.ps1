# Start Docker containers
Write-Host "Starting Docker containers..."
docker-compose up -d

# Wait for a moment to ensure ports are allocated (optional but helpful)
Start-Sleep -Seconds 5

# Start Customer Service
Write-Host "Starting Customer Service..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'customer-service/customer-service'; npm run start:dev"

# Start Product Order Service
Write-Host "Starting Product Order Service..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'product-order-service/product-order-service'; npm run start:dev"

# Start Frontend
Write-Host "Starting Frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'frontend/ecommerce-frontend'; npm run dev"

Write-Host "All services attempted to start. Please check the new windows for status."
