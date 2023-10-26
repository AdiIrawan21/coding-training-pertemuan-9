const fs = require("fs");
const validator = require("validator");

// Membuat folder "data" jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file "contacts.json" jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

//saveData
const saveData = (nama, mobile, email) => {
  const contact = { nama, mobile, email }; // Membuat objek "contact" dengan data yang sudah dikumpulkan sebelumnya.

  // validasi nama, jika nama yang diinputkan sudah ada maka akan tampil pesan kesalahan
  const kontak = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  if (kontak.some((contact) => contact.nama === nama)) {
    console.log("The name is already exist. Please input a different name!");
    return false;
  }

  // validasi email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email is invalid. Please input again!");
      return false;
    }
  }

  // validasi phone number
  if (mobile) {
    if (!validator.isMobilePhone(mobile, "id-ID")) {
      console.log("Phone number is invalid. Please input again!");
      return false;
    }
  }

  const file = fs.readFileSync(dataPath, "utf8"); // Membaca isi file "contacts.json" dan menyimpannya dalam variabel "file".

  const contacts = JSON.parse(file); // Mengurai kontak-kontak yang ada dalam file JSON.

  contacts.push(contact); // Menambahkan kontak baru ke dalam array "contacts".

  fs.writeFileSync(dataPath, JSON.stringify(contacts)); // Menyimpan data yang sudah diperbarui kembali ke file "contacts.json".

  console.log("Terima kasih sudah memasukkan data!"); // Menampilkan pesan terima kasih setelah data berhasil disimpan.
};

// mengambil data yang disimpan di file.json
const ambilData = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// menampilkan list data nama noTlp
const listData = () => {
  const contacts = ambilData();
  console.log("Data : ");
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. Name :  ${contact.nama}, Phone Number : ${contact.mobile}`);
  });
};

// menampilkan detail data
const detailData = (nama) => {
  const contacts = ambilData();
  const contact = contacts.find((contact) => contact.nama === nama);

  if (!contact) {
    console.log(`The name ${nama} is null/not registered!`); // pesan jika nama yang diinputkan tidak sesuai
    return false;
  }
  console.log(`Nama : ${contact.nama}`);
  console.log(`Phone Number : ${contact.mobile}`);
  console.log(`Email : ${contact.email}`);
};

// menghapus data berdasarkan nama
const hapusData = (nama) => {
  const contacts = ambilData();
  const find = contacts.findIndex((contact) => contact.nama === nama); // method findIndex untuk mencari data nama yang sesuai diinputkan user, kemudian dimasukkan ke variabel find
  if (find !== -1) {
    contacts.splice(find, 1);
    fs.writeFileSync(dataPath, JSON.stringify(contacts), "utf-8");
    console.log("Data success deleted!");
    return true;
  } else {
    console.log(`The name ${nama} is null/ not registered!`);
    return false;
  }
};
module.exports = { saveData, listData, detailData, hapusData };
