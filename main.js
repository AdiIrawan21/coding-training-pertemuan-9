const yargs = require("yargs"); // memanggil module npm yargs
const app = require("./app"); // memanggil module pada file app.js

yargs.command({
  command: "add", //untuk input data
  describe: "add new contact",
  builder: {
    nama: {
      describe: "name",
      demandOption: true,
      type: "string",
    },
    mobile: {
      describe: "phone Number",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "email address",
      demandOption: false,
      type: "string",
    },
  },

  handler(argv) {
    app.saveData(argv.nama, argv.mobile, argv.email);
  },
});

yargs.command({
  command: "list", // untuk menampilkan list data nama dan noTlp
  describe: "Menampilkan list data",
  handler(argv) {
    app.listData(argv.nama, argv.mobile);
  },
});

yargs.command({
  command: "detail", // menampilkan detail data berdasarkan input nama
  describe: "Detail Data Contact",
  builder: {
    nama: {
      describe: "name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    app.detailData(argv.nama);
  },
});

yargs.command({
  command: "delete", // untuk hapus data berdasarkan input nama
  describe: "Hapus data",
  builder: {
    nama: {
      describe: "name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    app.hapusData(argv.nama);
  },
});
yargs.parse();
