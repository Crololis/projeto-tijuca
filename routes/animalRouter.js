import express from "express";
import {
    getAnimal,
    getAnimalbyId,
    saveAnimal
} from "../controllers/animalController.js"

const router =  express.Router()

router.get('/animais', getAnimal);
router.get('/animais/:id', getAnimalbyId);
router.post('/animais', saveAnimal);

export default router