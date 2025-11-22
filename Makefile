.PHONY: help install run test clean lint coverage dev docker-build docker-run

# Variables
PYTHON := python3
VENV := venv
BIN := $(VENV)/bin
PORT := 8000

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

help: ## Show this help message
	@echo "$(BLUE)Pokemon API Backend - Available Commands$(NC)"
	@echo "=========================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

install: ## Install dependencies and setup environment
	@echo "$(BLUE)Setting up development environment...$(NC)"
	@chmod +x setup.sh
	@./setup.sh

run: ## Run the development server
	@echo "$(BLUE)Starting development server...$(NC)"
	@. $(BIN)/activate && $(PYTHON) run.py

dev: ## Run the development server with auto-reload
	@echo "$(BLUE)Starting development server with auto-reload...$(NC)"
	@. $(BIN)/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port $(PORT)

test: ## Run tests
	@echo "$(BLUE)Running tests...$(NC)"
	@. $(BIN)/activate && pytest -v

test-watch: ## Run tests in watch mode
	@echo "$(BLUE)Running tests in watch mode...$(NC)"
	@. $(BIN)/activate && pytest-watch

coverage: ## Run tests with coverage report
	@echo "$(BLUE)Running tests with coverage...$(NC)"
	@. $(BIN)/activate && pytest --cov=app --cov-report=html --cov-report=term-missing
	@echo "$(GREEN)Coverage report generated at htmlcov/index.html$(NC)"

lint: ## Run linter (flake8)
	@echo "$(BLUE)Running linter...$(NC)"
	@. $(BIN)/activate && flake8 app/ tests/ || true

format: ## Format code with black
	@echo "$(BLUE)Formatting code...$(NC)"
	@. $(BIN)/activate && black app/ tests/ || echo "$(YELLOW)Install black with: pip install black$(NC)"

clean: ## Clean up cache and temporary files
	@echo "$(BLUE)Cleaning up...$(NC)"
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete
	@find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	@find . -type d -name "htmlcov" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name ".coverage" -delete
	@echo "$(GREEN)Cleanup completed!$(NC)"

clean-all: clean ## Clean everything including venv
	@echo "$(BLUE)Removing virtual environment...$(NC)"
	@rm -rf $(VENV)
	@echo "$(GREEN)All cleaned!$(NC)"

docker-build: ## Build Docker image
	@echo "$(BLUE)Building Docker image...$(NC)"
	@docker build -t pokemon-api:latest .
	@echo "$(GREEN)Docker image built successfully!$(NC)"

docker-run: ## Run Docker container
	@echo "$(BLUE)Running Docker container...$(NC)"
	@docker run -p $(PORT):$(PORT) --env-file .env pokemon-api:latest

docker-stop: ## Stop Docker container
	@echo "$(BLUE)Stopping Docker container...$(NC)"
	@docker stop $$(docker ps -q --filter ancestor=pokemon-api:latest) || true

shell: ## Open Python shell with app context
	@echo "$(BLUE)Opening Python shell...$(NC)"
	@. $(BIN)/activate && $(PYTHON)

deps-update: ## Update dependencies
	@echo "$(BLUE)Updating dependencies...$(NC)"
	@. $(BIN)/activate && pip install --upgrade -r requirements.txt

deps-list: ## List installed dependencies
	@. $(BIN)/activate && pip list

check: test lint ## Run tests and linter

.DEFAULT_GOAL := help

