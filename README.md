# OrangeHRM Cypress Automation

Automation testing project untuk aplikasi demo OrangeHRM Demo menggunakan Cypress dengan pendekatan Page Object Model (POM).

## Installation

```bash
npm install
```

## Run Cypress

Open Cypress UI:
```bash
npx cypress open
```

Run headless:
```bash
npx cypress run
```

## Project Structure

- `e2e/` → test cases
- `pages/` → Page Object Model
- `fixtures/` → test data
- `support/` → custom commands & setup

## Tested Features

- Login
- Forgot password
- Directory page