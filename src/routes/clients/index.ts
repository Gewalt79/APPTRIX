import express from 'express';
import multer from 'multer';
import UserController from '../../controllers/user.controller';
import CheckAuth from '../../middlewares/checkToken';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (request, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get(
  '/list',
  (request, response, next) => {
    CheckAuth.check(request, response, next, 'READ');
  },
  async (request, response) => {
    await UserController.getAll(request, response);
  }
);

router.post('/create', upload.single('avatar'), async (request, response) => {
  await UserController.addUser(request, response);
});

router.post(
  '/:id/match',
  (request, response, next) => {
    CheckAuth.check(request, response, next, 'MATCH');
  },
  async (request, response) => {
    await UserController.matchUser(request, response);
  }
);

export default router;
