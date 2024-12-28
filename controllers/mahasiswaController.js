const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM mahasiswaa', (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswaa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

router.get('/:nim', (req, res) => {
    const mahasiswaId = req.params.nim;
    db.query('SELECT * FROM mahasiswaa WHERE nim = ?', [mahasiswaId], (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswaa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Mahasiswaa not found' });
        } else {
            res.json(results[0]);
        }
    });
});

router.put('/:nim', (req, res) => {
    const mahasiswaId = req.params.nim;
    const { nama, gender, prodi, alamat } = req.body;
    db.query(
        'UPDATE mahasiswaa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?',
        [nama, gender, prodi, alamat, mahasiswaId],
        (error) => {
            if (error) {
                console.error('Error updating mahasiswaa:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Mahasiswaa updated successfully' });
            }
        }
    );
});

router.post('/', (req, res) => {
    const { nim, nama, gender, prodi, alamat } = req.body;
    db.query(
        'INSERT INTO mahasiswaa (nim, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)',
        [nim, nama, gender, prodi, alamat],
        (error) => {
            if (error) {
                console.error('Error adding mahasiswaa:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Mahasiswaa added successfully' });
            }
        }
    );
});

router.delete('/:nim', (req, res) => {
    const mahasiswaId = req.params.nim;
    db.query('DELETE FROM mahasiswaa WHERE nim = ?', [mahasiswaId], (error) => {
        if (error) {
            console.error('Error deleting mahasiswaa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ message: 'Mahasiswaa deleted successfully' });
        }
    });
});

module.exports = router;