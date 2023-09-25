const express = require('express');
const redis = require('redis');
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 3000;

const client = redis.createClient();

app.use(express.json());

app.post('/schedule', (req, res) => {
  const { taskId, scheduleTime } = req.body;

  client.set(taskId, 'Scheduled', 'EX', Math.floor(new Date(scheduleTime).getTime() / 1000));
  
  res.status(200).json({ message: 'Task scheduled successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

cron.schedule('* * * * *', () => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  client.keys('*', (err, keys) => {
    if (err) throw err;
    
    keys.forEach((key) => {
      client.get(key, (err, timestamp) => {
        if (err) throw err;
        
        if (currentTimestamp >= timestamp) {
          console.log(`Task ${key} is due.`);

          client.del(key);
        }
      });
    });
  });
});
