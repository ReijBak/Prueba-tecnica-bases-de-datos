import { pool } from "../db.js";

export const getClients = async(req, res) => {
    
    try {
        const {rows} = await pool.query('SELECT * FROM clients');
        res.json(rows);
        console.log(rows);
    } catch (error) {
        console.error('There was an error getting clients:', error);
        res.status(500).json({message: 'Error gettin clients'});
    }
};

export const getClient = async (req, res) => {
    
    try {
        const id = req.params.id;
        const  clients = await pool.query(`SELECT * FROM clients WHERE id = ${id}`);
        res.json(clients.rows);
    } catch (error) {
        console.error('❌ There was an error getting client:', error);
        res.status(500).json({message: '❌ Error gettin client'});
    }
};

export const createClient = async (req, res) => {

    try {
        const data = req.body;
        const {rows} = await pool.query('INSERT INTO clients (id, full_name, address, contact, email) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
        [data.Nombre, data.Correo]);
        return res.json(rows[0]);
    } catch (error) {
        console.error('❌ There was an error creating client:', error);

        if (error.code === '23505') {
            return res.status(409).json({message: '⚠️ This client already exist'});
        }

        res.status(500).json({message: '❌ Error creating client'});
    }
};

export const deleteClient = async (req, res) => {
    
    try {
        const {id} = req.params;
        const {rows, rowCount} = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *',[id]
        );
        console.log(rows);
        
        if (rowCount === 0) return res.status(404).json({message: '⚠️ Client not found'});
        
        return res.json(rows);
    } catch (error) {
        console.error('❌ There was an error deleting client:', error);
        res.status(500).json({message: '❌ Error deleting client'});
    }
};

export const updateClient = async (req, res) => {
    
    try {
        const {id} = req.params;
        const data = req.body;

        const {rows} = await pool.query('UPDATE clients SET full_name = $1, address = $2, contact = $3, email = $4 WHERE id = $5 RETURNING *',
        [data.full_name, data.address, data.contact, data.email, id]);

        return res.json(rows[0]);
    } catch (error) {
        console.error('❌ There was an error updating client:', error);
        res.status(500).json({message: '❌ Error updating client'});
    }
}