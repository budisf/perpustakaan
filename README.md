# Clone dan install package

pertama clone repository,
kemudian di terminal buka path dimana project perpustakaan di simpan

lalu ketik 

```bash
npm install 
```


untuk menginstall semua package yang dibutuhukan

# Migration and start

1. Pastikan anda sudah mendownload postgresql di local computer anda 
2. Buat sebuah database dengan nama perpustakaan
3. Kembali ke terminal anda, untuk melakukan migration table anda cukup ketikkan perintah 

```bash
npm install -g db-migrate-pg
```

apabila anda menggunakan macOS dan terjadi permission denied, silahkan coba gunakan script berikut 

```bash
sudo npm install -g db-migrate-pg  --unsafe-perm=true --allow-root
```

kemudian jalankan perintah berikut untuk lakukan migrasi 


```bash
db-migrate up initialize
```

apabila terjadi error karena access denied atau command not defind, anda bisa menjalankan perintah 

```bash
npm run migrate-up 
```

4. setelah table berhasil dimigrate, anda bisa import data books.csv ke table book
5. kemudian jalankan perintah berikut untuk menjalankan server

```bash
npm start
```

6. sampai sini API perpustakaan sudah berhasil dijalankan


## Collections 
https://www.getpostman.com/collections/a2e7a9fdeeb64ed580e1

## API Documentation
https://documenter.getpostman.com/view/7342285/VUqrQJ7B
