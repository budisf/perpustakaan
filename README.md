# Clone dan install package

pertama clone repository,
kemudian di terminal buka path dimana project perpustakaan di simpan

lalu ketik 

```bash
npm install 
```


untuk menginstall semua package yang dibutuhukan

# Migration and start

1. Pastikan anda sudah mendownload postgresql di local computer anda berikut link tutorial install postgresql  https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql/

3. Buat sebuah database dengan nama perpustakaan
4. Kembali ke terminal anda, untuk melakukan migration table anda cukup ketikkan perintah 

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
https://api.postman.com/collections/7342285-9a68bb07-c239-4a85-9550-062a42cbf5e2?access_key=PMAT-01GSWEYMHMSNKZ613F2S6ZF41G

## API Documentation
https://documenter.getpostman.com/view/7342285/VUqrQJ7B

<<<<<<< Updated upstream
=======

## Build Docker 

Build Image
```bash
docker build . -t <username-mu>/perpustakaan
```
untuk melihat image berjalan atau tidak silahkan ketik
```bash
docker images
```

Jalankan imagenya 
```bash
docker run -p 8888:8083 -d <username-mu>/perpustakaan
```
```bash
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Example app listening at http://localhost:8083
Connection has been established successfully.
```

>>>>>>> Stashed changes
