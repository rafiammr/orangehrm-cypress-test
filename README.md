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

### 1. Login Feature

### Test scenario:

- TC-001 - Valid login
- TC-002 - Username salah
- TC-003 - Password salah
- TC-004 - Username & Password salah
- TC-005 - Tanpa input
- TC-006 - Tanpa username
- TC-007 - Tanpa password
- TC-008 - Username ada spasi
- TC-009 - Password ada spasi
- TC-010 - Username spasi awal/akhir
- TC-011 - Case sensitive password
- TC-012 - Password hidden
- TC-013 - Tombol login aktif

### 2. Forgot Password Feature

### Test Scenario:

- TC-014 - Halaman forgot password tampil
- TC-015 - Input username valid
- TC-016 - Input username tidak terdaftar
- TC-017 - Tanpa input username
- TC-018 - Klik tombol cancel

### 3. Dashboard Directory Feature

### Test Scenario:

- TC-019 - Menampilkan Halaman Directory
- TC-020 - Validasi placeholder pada search input
- TC-021 - Validasi tombol reset
- TC-022 - Search employee berhasil
- TC-023 - Employee tidak ditemukan
- TC-024 - Search by Job Title
- TC-025 - Search by Location
- TC-026 - Reset search
