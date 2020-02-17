const router = require('express').Router();
let Reminder = require('../models/reminder.model');

router.route('/').get((req, res) => {
  Reminder.find()
    .then(reminders => res.json(reminders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newReminder = new Reminder({
    username,
    description,
    duration,
    date,
  });

  newReminder.save()
  .then(() => res.json('Reminder added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Reminder.findById(req.params.id)
    .then(reminder => res.json(reminder))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Remindeer.findByIdAndDelete(req.params.id)
    .then(() => res.json('Reminder deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Reminder.findById(req.params.id)
    .then(reminder => {
      reminder.username = req.body.username;
      reminder.description = req.body.description;
      reminder.duration = Number(req.body.duration);
      reminder.date = Date.parse(req.body.date);

      reminder.save()
        .then(() => res.json('Reminder updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;