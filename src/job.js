import queue from './queue'

const retryCount = 20

const lineUp = async (payload) => {
  const job = await queue.createJob(payload)
    .backoff('exponential', 5_000)
    .retries(retryCount)
    .save()

  console.log(`${new Date().toISOString()} jobId: ${job.id} is placed in queue.`)

  job.on('succeeded', (result) => {
    console.log(`${new Date().toISOString()} jobId: ${job.id} received good result ${result}.`)
  })

  job.on('retrying', (err) => {
    console.log(`${new Date().toISOString()} jobId: ${job.id} failed as ${err.message} but is gonna retry! (Retry count: ${retryCount - job.options.retries}) - (${job.options.backoff.delay} ms)`)
    // job.options.backoff.delay = 5000
    job.backoff('fixed', 30_000)

    console.log(`${new Date().toISOString()} jobId: ${job.id} is gonna retry in 5 seconds. (${job.options.backoff.delay} ms)`)
  })

  return job
}

export default lineUp