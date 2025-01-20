
import Queue from 'bee-queue'
import generateRandomNumber from './random'

const threshold = 4.5
const queue = new Queue('my-awesome-queue', {
  activateDelayedJobs: true,
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
    console.log(`Timeout 5 secondes for ${job.id}`)

    job.options.stacktraces.push(`${new Date().toISOString()} - Timeout 5 secondes for ${job.id} - retries: ${job.options.retries}`)

    return done({
      message: `1 Random value ${k} > threshold ${threshold}`,
      stack: `2 Timeout 5 secondes for ${job.id}`
    })
  }
  return done(null, k)
})

export default queue
