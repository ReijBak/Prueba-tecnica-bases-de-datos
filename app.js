import fs from 'fs';
import csv from 'csv-parser';
import { pool } from './src/db.js';

pool.connect()
  .then(() => console.log('Conectado a PostgreSQL'))

async function uploadClientsFromCSV() {
  try {

    const clients = [];
    fs.createReadStream('clients.csv')
      .pipe(csv())
      .on('data', (data) => {
        console.log('Objeto leído:', data);
        console.log('data.id =>', data.Número_de_Identificación);
        console.log('typeof data.id =>', typeof data.Número_de_Identificación);
        console.log('typeof data.nombre =>', typeof data.Nombre);
        console.log('typeof data.direccion =>', typeof data.Dirección);
        clients.push(data);
      })
      .on('end', async () => {
        for (const client of clients) {

          
          const query = `
            INSERT INTO clients (id, full_name, address, contact, email)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO NOTHING;
          `;
          const VALUES = [
            client.Número_de_Identificación,
            client.Nombre,
            client.Dirección,
            client.Teléfono,
            client.Correo_Electrónico
          ];
          await pool.query(query, VALUES);
        }

        console.log('✅ Clients upload was succesful.');
        
      });

  } catch (err) {
    console.error('❌ There was an error uploading clients:', err);
  }
}

async function uploadTransactionsFromCSV() {
  try {

    const transactions = [];
    fs.createReadStream('transactions.csv')
      .pipe(csv())
      .on('data', (data) => {
        transactions.push(data);
      })
      .on('end', async () => {
        for (const transaction of transactions) {
          const query = `
            INSERT INTO transactions (id, date_and_time, amount, status, used_platform, type, client_id, bill_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (id) DO NOTHING;
          `;
          const VALUES = [
            transaction.ID,
            transaction.Fecha_y_Hora,
            parseInt(transaction.Monto),
            transaction.Estado,
            transaction.Plataforma_Utilizada,
            transaction.Tipo_de_trasacción,
            transaction.ID_Cliente,
            transaction.ID_Factura
          ];
          await pool.query(query, VALUES);
        }

        console.log('✅ Transactions upload was succesful.');
      });

  } catch (err) {
    console.error('❌ There was an error uploading transactions:', err);
  }
}

async function uploadBillsFromCSV() {
  try {

    const bills = [];
    fs.createReadStream('bills.csv')
      .pipe(csv())
      .on('data', (data) => {
        bills.push(data);
      })
      .on('end', async () => {
        for (const bill of bills) {
          const query = `
            INSERT INTO bills (id, period, amount, paid_amount)
            VALUES ($1, $2, $3, $4,)
            ON CONFLICT (id) DO NOTHING;
          `;
          const VALUES = [
            bill.Número,
            bill.Periodo,
            parseInt(bill.Monto),
            parseInt(bill.Monto_pagado)
          ];
          await pool.query(query, VALUES);
        }

        console.log('✅ Bills upload was succesful.');
      });

  } catch (err) {
    console.error('❌ There was an error uploading bills:', err);
  }
}

await uploadClientsFromCSV()
await uploadTransactionsFromCSV()
await uploadBillsFromCSV()



