// src/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import db from '../config/db';

const router = Router();

// Obtener todos los usuarios
router.get('/', (req: Request, res: Response) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

//Obtener un usuario por ID
router.get('/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Actualizar un usuario
router.put('/:id', (req: Request, res: Response) => {
    const {id, name, email } = req.body;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ id: id, name, email });
    });
});

// Agregar un nuevo usuario
router.post('/', (req: Request, res: Response) => {
    const {id, name, email } = req.body;
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: id, name, email });
    });
});

// Eliminar un usuario
router.delete('/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ id });
    });
});

// Eliminar todos los usuarios
router.delete('/*', (req: Request, res: Response) => {
    db.query('DELETE FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

export default router;
