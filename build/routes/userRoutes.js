"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const db_1 = __importDefault(require("../config/db"));
const router = (0, express_1.Router)();
// Obtener todos los usuarios
router.get('/', (req, res) => {
    db_1.default.query('SELECT * FROM users', (err, results) => {
        if (err)
            return res.status(500).json(err);
        res.json(results);
    });
});
//Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db_1.default.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err)
            return res.status(500).json(err);
        res.json(results);
    });
});
// Actualizar un usuario
router.put('/:id', (req, res) => {
    const { id, name, email } = req.body;
    db_1.default.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
        if (err)
            return res.status(500).json(err);
        res.status(200).json({ id: id, name, email });
    });
});
// Agregar un nuevo usuario
router.post('/', (req, res) => {
    const { id, name, email } = req.body;
    db_1.default.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err)
            return res.status(500).json(err);
        res.status(201).json({ id: id, name, email });
    });
});
// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db_1.default.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err)
            return res.status(500).json(err);
        res.status(200).json({ id });
    });
});
// Eliminar todos los usuarios
router.delete('/*', (req, res) => {
    db_1.default.query('DELETE FROM users', (err, results) => {
        if (err)
            return res.status(500).json(err);
        res.status(200).json(results);
    });
});
exports.default = router;
