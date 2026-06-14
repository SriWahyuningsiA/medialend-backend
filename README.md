
# MediaLend Backend

REST API untuk aplikasi peminjaman alat multimedia kampus.

## Tim Pengembang
- Sri Wahyuningsih A
- Elsa Febriyanti
- Indah Ayu Anastasya

## Teknologi
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- Helmet.js
- Express Rate Limit
- Express Validator

## Fitur API
- Login Mahasiswa
- Login Admin
- CRUD Alat
- CRUD Mahasiswa
- Pengajuan Peminjaman
- Monitoring Peminjaman

## Testing
- Unit Testing
- Regression Testing
- Security Testing
- Performance Testing (k6)

## Tools Testing
- Jest
- Supertest
- Github Actions

## Cara Menjalankan

### Install Dependency

```bash
npm install
```

### Menjalankan Server

```bash
npm start
```

### Menjalankan Pengujian

```bash
npm test
```

### Menjalankan Code Coverage

```bash
npm test -- --coverage
```

## Hasil Pengujian

| Keterangan         | Hasil |
| ------------------ | ----- |
| Test Suites        | 5     |
| Test Cases         | 32    |
| Test Berhasil      | 32    |
| Statement Coverage | 81%   |
| Line Coverage      | 81%   |

## Regression Testing

Regression testing dilakukan untuk memastikan bahwa perubahan kode tidak merusak fitur yang telah berjalan sebelumnya.

### Skenario Regression Testing

1. Menjalankan seluruh test dan memastikan semua test PASS.
2. Menyisipkan bug pada fungsi `create` di `alatController.js`.
3. Menjalankan kembali seluruh test hingga terjadi FAIL.
4. Mengembalikan kode ke kondisi semula.
5. Menjalankan kembali seluruh test hingga seluruh test PASS.

Hasil pengujian menunjukkan bahwa test suite berhasil mendeteksi perubahan kode yang menyebabkan kerusakan fungsi aplikasi.

## Continuous Integration

Project menggunakan GitHub Actions untuk menjalankan pengujian otomatis setiap kali terdapat perubahan kode pada repository.

### Workflow yang dijalankan

* Install dependency
* Menjalankan seluruh test secara otomatis
* Memastikan tidak terjadi regression sebelum kode digabungkan ke branch utama

## Mata Kuliah

Pengujian dan Penjaminan Kualitas Perangkat Lunak (SQA)


