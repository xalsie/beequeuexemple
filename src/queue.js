
import Queue from 'bee-queue'
import generateRandomNumber from './random'

const threshold = 4.5
const queue = new Queue('my-awesome-queue', {
  activateDelayedJobs: true,
  concurrency: 1,
  redis: {
    host: 'redis',
    port: 6379,
    db: 0,
    options: {}
  }
})

queue.process(async (job, done) => {
  const k = generateRandomNumber()

  if (k > threshold) {
    console.log(`Timeout ${job.options.backoff.delay/1000} secondes for ${job.id}`)

    return done({
      logs: `1 Random value ${k} > threshold ${threshold}`,
      stack: `${new Date().toISOString()} - Timeout ${job.options.backoff.delay/1000} secondes for ${job.id} - retries: ${job.options.retries}`
    })
  }
  return done(null, k)
})

export default queue
