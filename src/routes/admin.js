import express from 'express';
import path from 'path';
import { getBrukere, getBruker } from '../DB.js';


const __dirname = path.resolve();
const router = express.Router();
const app = express();

app.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../private/adminstrasjon.html"));
});


router.get("/brukere", async (req, res) => {
    const Brukere = await getBrukere();
    res.json(Brukere);
})

router.get("/bruker/:brukernavn", async (req, res) => {
    const brukernavn = req.params.brukernavn;
    const bruker = await getBruker(brukernavn);
    res.status(201).send(bruker);
})


// Register a new user
router.post('/Nybruker', async (req, res) => {
    const { Brukernavn, Email, Passord, isAdmin } = req.body;
  
    bcrypt.hash(Passord, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send('Noe gikk galt');
      } else {
        const user = await CreateBruker(Brukernavn, Email, hash, isAdmin);
        delete user.password;
        delete user.isAdmin;
        res.send(user);
      }
    });
  });


export default router;
